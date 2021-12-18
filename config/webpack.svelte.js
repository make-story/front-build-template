/**
 * Svelte
 * yarn add svelte-loader
 */
const path = require('path'); 

module.exports = {
    entry: {
        '': '',
    },
    
    // 모듈처리 방법 (로더 등)
    // 로더는 웹팩 번들링되는 중간 과정에 개입 (로더는 파일을 해석하고 변환하는 과정에 관여, 모듈을 처리하는 단위)
    module: {
        rules: [
            // Svelte
            {
				test: /\.(html|svelte)$/,
				exclude: /node_modules/,
				use: {
					loader: 'svelte-loader',
					options: {
						preprocess: require('svelte-preprocess')({  // npm install -D svelte-preprocess
							// options
						})
					},
				},
			},
        ]
    },
};