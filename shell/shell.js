/**
 * node shell.js
 */
 const execSync = require('child_process').execSync;

 // 쉘 명령 실행결과 반환
 console.log(execSync("echo 'test'", { encoding: 'UTF-8' }));