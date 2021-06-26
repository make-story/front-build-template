/**
 * child_process
 * 노드에서 다른 프로그램을 실행하고 싶거나, 명령어를 수행하고 싶을 떄 사용하는 모듈
 * 이름이 child_process 인 이유는 현재 노드 프로세스 외에 새로운 프로세스를 띄워서 명령을 수행하고, 노드 프로세스에 결과를 알려주기 때문
 */
const exec = require('child_process').exec;

const process = exec('ls');
process.stdout.on('data', function(data) { // 실행 결과
    console.log(data.toString());
});
process.stderr.on('data', function(data) { // 실행 에러
    console.error(data.toString());
});

