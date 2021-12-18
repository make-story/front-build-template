/**
 * 리액트 + 타입스크립트
 */
const path = require('path'); 

module.exports = {
    entry: {
        'react-typescript': 'src/react-typescript/App.tsx',
    },

    // 모듈처리 방법 (로더 등)
    // 로더는 웹팩 번들링되는 중간 과정에 개입 (로더는 파일을 해석하고 변환하는 과정에 관여, 모듈을 처리하는 단위)
    module: {
        rules: [
            // Typescript
            // https://github.com/TypeStrong/ts-loader
            {
                test: /\.(ts|tsx)$/, // TypeScript 를 사용 할때는 .ts (리액트 컴포넌트의 경우에는 .tsx) 확장자를 사용
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true
                        }
                    },
                ],
            },
        ]
    },
};