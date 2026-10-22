"""Package browser files and give every script/style a content-derived cache key."""
from argparse import ArgumentParser
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit,unquote
import hashlib,json,os,shutil

ROOT=Path(__file__).resolve().parents[1]
class Entrypoint(HTMLParser):
    def __init__(self):
        super().__init__();self.files=set();self.references={};self.version=''
    def handle_starttag(self,tag,attrs):
        attrs=dict(attrs)
        if tag=='meta' and attrs.get('name')=='application-version':self.version=attrs.get('content','')
        value=attrs.get('src') if tag=='script' else attrs.get('href') if tag=='link' and attrs.get('rel')=='stylesheet' else None
        if value:
            url=urlsplit(value);path=unquote(url.path)
            if url.scheme or url.netloc or path.startswith('/') or not path:
                raise ValueError(f'Entrypoint must use relative local files: {value}')
            self.files.add(path);self.references[value]=path

def versioned_entrypoint(source):
    """Обновляем URL файлов без удаления аккаунтов, прогресса и кэша браузера целиком."""
    parser=Entrypoint();parser.feed(source);versions={}
    for reference,relative in parser.references.items():
        path=ROOT/relative
        if not path.resolve().is_relative_to(ROOT) or not path.is_file():
            raise ValueError(f'Invalid or missing site file: {relative}')
        digest=hashlib.sha256(path.read_bytes()).hexdigest()[:16]
        versioned=f'{relative}?v={digest}';versions[relative]=digest
        source=source.replace('"'+reference+'"','"'+versioned+'"')
    return source,parser,versions

def build(output):
    output=Path(output).resolve()
    if output.exists() and any(output.iterdir()):
        raise ValueError('Use an empty output directory to avoid publishing unrelated or stale files.')
    if output==ROOT or output in ROOT.parents:
        raise ValueError('Output must not be the project root or its parent.')
    entrypoint,parser,versions=versioned_entrypoint((ROOT/'index.html').read_text())
    files={'index.html','404.html',*parser.files}
    files.update(str(p.relative_to(ROOT)) for p in (ROOT/'assets').rglob('*') if p.is_file())
    for relative in sorted(files):
        path=ROOT/relative
        if not path.resolve().is_relative_to(ROOT) or not path.is_file():
            raise ValueError(f'Invalid or missing site file: {relative}')
    output.mkdir(parents=True,exist_ok=True)
    for relative in sorted(files):
        dest=output/relative;dest.parent.mkdir(parents=True,exist_ok=True)
        if relative=='index.html':dest.write_text(entrypoint)
        else:shutil.copyfile(ROOT/relative,dest)
    (output/'.nojekyll').write_text('')
    manifest={'version':parser.version,'revision':os.environ.get('GITHUB_SHA','local'),'bundle':hashlib.sha256(entrypoint.encode()).hexdigest()[:16],'assets':versions}
    (output/'version.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
    return sorted([*files,'.nojekyll','version.json'])

if __name__=='__main__':
    parser=ArgumentParser();parser.add_argument('--output',default=str(ROOT/'_site'));args=parser.parse_args()
    files=build(args.output)
    print(f'Static site: {len(files)} files in {Path(args.output).resolve()}')
