"""Fast asset/schema checks; browser frame comparisons are in water_bath_atlas_e2e.py."""
from pathlib import Path
import json,re
from PIL import Image
copy=json.loads(Path('data/water-bath-i18n.js').read_text().split('const WaterBathCopy=')[1].rsplit(';',1)[0])
for id,n in [('water-bath',9),('evaporation',5)]:
 d=json.loads(Path('data/'+id+'.json').read_text());assert d['id']==id and len(d['parts'])==n
 assert Image.open(d['full']).size==(d['fullSize']['w'],d['fullSize']['h'])
 assert not re.search('[А-Яа-яЁё]',json.dumps(d,ensure_ascii=False)),id
 assert sorted(p['order'] for p in d['parts'])==list(range(1,n+1))
 for p in d['parts']+d['substances']:
  for path in [p['image'],p['card'],p['image'].replace('.webp','.png')]:assert Path(path).is_file(),path
  for key in [p['name'],p['purpose'],p['safety'],*p['characteristics']]:
   for language in ['ru','en','uz-Latn','uz-Cyrl']:assert copy[key][language],(key,language)
  if 'assembled' in p:
   a=p['assembled'];assert a['w']>0 and a['h']>0 and 0<=a['x']<=100 and 0<=a['y']<=100
   assert a['x']+a['w']<=100.01 and a['y']+a['h']<=100.01
 if id=='evaporation':
  assert d['labelTask']['answers']=={'a':'beaker','b':'tripod','c':'evaporating-dish','d':'gas-burner'}
  for p in d['parts'][:4]:assert p['image'].startswith('assets/equipment/water-bath/parts/')
print('PASS JSON schemas, original frame percentages, exact full-image ratios, shared asset paths, PNG fallbacks, four-locale keys and label answers')
