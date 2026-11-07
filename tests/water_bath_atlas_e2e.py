"""Compatibility entrypoint: both apparatus now share the JSON assembly regression."""
import runpy
from pathlib import Path
runpy.run_path(str(Path(__file__).with_name('json_assembly_e2e.py')),run_name='__main__')
