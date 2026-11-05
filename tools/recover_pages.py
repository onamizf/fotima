"""Cancel orphan Pages deployments belonging to failed runs of this workflow only."""
import json,os,time
from urllib.request import Request,urlopen
from urllib.error import HTTPError

API=os.environ.get('GITHUB_API_URL','https://api.github.com').rstrip('/')
REPO=os.environ['GITHUB_REPOSITORY']
TOKEN=os.environ['GH_TOKEN']
CURRENT=os.environ['GITHUB_SHA']

def api(method,path):
    request=Request(API+'/repos/'+REPO+path,method=method,headers={
        'Authorization':'Bearer '+TOKEN,'Accept':'application/vnd.github+json',
        'X-GitHub-Api-Version':'2022-11-28','User-Agent':'fotima-pages-recovery'})
    try:
        with urlopen(request,timeout=20) as response:
            body=response.read()
            return response.status,json.loads(body) if body else {}
    except HTTPError as error:
        return error.code,{}

def main():
    code,result=api('GET','/actions/workflows/pages.yml/runs?status=failure&per_page=10')
    if code!=200:raise RuntimeError('Cannot inspect failed Pages runs: HTTP '+str(code))
    heads=list(dict.fromkeys(r['head_sha'] for r in result.get('workflow_runs',[]) if r['head_sha']!=CURRENT))
    active={'queued','pending','deployment_queued','building','deploying','updating_pages','waiting'}
    for sha in heads:
        path='/pages/deployments/'+sha
        code,status=api('GET',path)
        if code==404:continue
        if code!=200:raise RuntimeError('Cannot inspect prior Pages deployment: HTTP '+str(code))
        phase=status.get('status','unknown')
        print('Prior failed Pages build',sha[:8],'status:',phase,flush=True)
        if phase not in active:continue
        code,_=api('POST',path+'/cancel')
        print('Cancel failed Pages build',sha[:8],'HTTP',code,flush=True)
        if code not in (200,201,202,204,404):raise RuntimeError('Pages refused to cancel its failed deployment: HTTP '+str(code))
        for _ in range(12):
            code,status=api('GET',path)
            if code==404 or code==200 and status.get('status') not in active:break
            time.sleep(5)
        else:raise RuntimeError('GitHub Pages still reports the failed deployment as active after cancellation; site files are built, but hosting is blocked.')

if __name__=='__main__':main()
