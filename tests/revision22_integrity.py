"""Packaging and syntax checks complement the browser interaction suites."""
import importlib.util,subprocess,json
from pathlib import Path
spec=importlib.util.spec_from_file_location('build','tools/build_site.py');module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
_,entrypoint,_=module.versioned_entrypoint(Path('index.html').read_text())
for path in entrypoint.files:
 if path.endswith('.js'):subprocess.run(['node','--check',path],check=True,capture_output=True)
module.versioned_entrypoint('<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito&display=swap">')
for html in ['<script src="https://fonts.googleapis.com/css2"></script>','<link rel="stylesheet" href="https://other.example/style.css">']:
 try:module.versioned_entrypoint(html)
 except ValueError:continue
 raise AssertionError('Unapproved external reference accepted')
print('PASS changed JavaScript syntax and narrowly allowed Google Fonts CSS packaging')
