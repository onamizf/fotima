"""Uzbek Latin to Cyrillic for the two supported spellings of the same translation."""
import re
def cyr(text):
 pairs={'o‘':'ў','g‘':'ғ','sh':'ш','ch':'ч','ng':'нг','yo':'ё','yu':'ю','ya':'я','ye':'е','ts':'ц'}
 letters={'a':'а','b':'б','d':'д','e':'е','f':'ф','g':'г','h':'ҳ','i':'и','j':'ж','k':'к','l':'л','m':'м','n':'н','o':'о','p':'п','q':'қ','r':'р','s':'с','t':'т','u':'у','v':'в','x':'х','y':'й','z':'з','’':'ъ'}
 pattern=r'\{[^{}]+\}|'+'|'.join(map(re.escape,pairs))+'|[A-Za-z’]'
 def sub(m):
  s=m.group()
  if s.startswith('{'):return s
  out=pairs.get(s.lower(),letters.get(s.lower(),s))
  return out[0].upper()+out[1:] if s[0].isupper() else out
 return re.sub(pattern,sub,text,flags=re.I)
