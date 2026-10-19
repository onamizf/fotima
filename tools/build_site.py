"""Package only browser-facing files for static hosting; stdlib only."""
from argparse import ArgumentParser
from html.parser import HTMLParser
from pathlib import Path
import shutil

ROOT=Path(__file__).resolve().parents[1]
class Entrypoint(HTMLParser):
    def __init__(self):
        super().__init__();self.files=set()
    def handle_starttag(self,tag,attrs):
        attrs=dict(attrs)
        value=attrs.get('src') if tag=='script' else attrs.get('href') if tag=='link' and attrs.get('rel')=='stylesheet' else None
        if value:self.files.add(value)

def build(output):
    output=Path(output).resolve()
    if output.exists() and any(output.iterdir()):
        raise ValueError('Use an empty output directory to avoid publishing unrelated or stale files.')
    if output==ROOT or output in ROOT.parents:
        raise ValueError('Output must not be the project root or its parent.')
    parser=Entrypoint();parser.feed((ROOT/'index.html').read_text())
    files={'index.html',*parser.files}
    files.update(str(p.relative_to(ROOT)) for p in (ROOT/'assets').rglob('*') if p.is_file())
    for relative in sorted(files):
        path=ROOT/relative
        if path.resolve().is_relative_to(ROOT) is False or not path.is_file():
            raise ValueError(f'Invalid or missing site file: {relative}')
    output.mkdir(parents=True,exist_ok=True)
    for relative in sorted(files):
        dest=output/relative;dest.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(ROOT/relative,dest)
    (output/'.nojekyll').write_text('')
    return sorted([*files,'.nojekyll'])

if __name__=='__main__':
    parser=ArgumentParser();parser.add_argument('--output',default=str(ROOT/'_site'));args=parser.parse_args()
    files=build(args.output)
    print(f'Static site: {len(files)} files in {Path(args.output).resolve()}')
