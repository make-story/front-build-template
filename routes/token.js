/**
 * JWT 토큰
 */
const path = require('path'); 
const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const { verifyToken } = require('./middlewares');

router.post('/jwt', (request, response) => {
    const token = jwt.sign(
        // 토큰의 내용
        {
            id: 'testID',
            nick: 'testNICK',
        }, 
        // 토큰의 비밀키
        process.env.JWT_SECRET, 
        // 토큰의 설정
        {
            expiresIn: '1m', // 1분
            issuer: 'nodebird' // 발급자
        }
    );
});
router.get('/test', verifyToken, (request, response) => {
    response.json(request.decoded);
})

module.exports = router;