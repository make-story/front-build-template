1. VS Code Extenstion 에서 `Debugger for Chrome` 을 설치  
Debugger for Chrome은 특정 포트의 특정 경로에 로드된 JS 코드에 debugger를 listen 시킬 수 있다.  

2. 디버깅할 프로젝트 루트 경로에 다음과 같은 `파일명을 만들고 내용을 작성` 
.vscode 폴더생성  
launch.json 파일생성
```json
{
  "version": "0.2.0",
  "configurations": [
      {
          "type": "chrome",
          "request": "launch",
          "name": "chrome debugger",
          "url": "http://localhost:3000",
          "webRoot": "${workspaceFolder}/src"
      }
  ]
}
```
url에 있는 port는 개발하는 로컬의 port를 입력  

