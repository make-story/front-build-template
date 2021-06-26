/**
 * 파일 읽는 스트림
 */
const fs = require('fs');

const readStream = fs.createReadStream('./readme3.txt', { highWaterMark: 16 }); // highWaterMark : 버퍼의 크기(기본값 64KB)
const data = [];
readStream.on('data', (chunk) => {
    data.push(chunk);
    console.log('data :', chunk, chunk.length);
});
readStream.on('end', () => {
    console.log('end :', Buffer.concat(data).toString());
});
readStream.on('error', (error) => {
    console.log('error :', error);
});