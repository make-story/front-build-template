/**
 * 파일 쓰는 스트림
 */
const fs = require('fs');

const writeStream = fs.createWriteStream('./writeme2.txt');
writeStream.on('finish', () => {
    console.log('파일 쓰기 완료');
});

writeStream.write('이 글을 씁니다.\n');
writeStream.write('한 번 더 씁니다.\n');
writeStream.end();


// createReadStream 으로 파일을 읽고 그 스트림을 전달받아 
// createWriteStream 으로 파일을 쓸 수도 있습니다. 파일 복사와 비슷합니다.
// 스트림끼리 연결하는 것을 '파이핑한다'고 표현합니다.
const readStreamPipe = fs.createReadStream('./readme4.txt');
const writeStreamPipe = fs.createWriteStream('./writeme3.txt');
readStreamPipe.pipe(writeStreamPipe);