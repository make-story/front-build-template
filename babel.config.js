/**
 * https://babeljs.io/docs/en/config-files/
 *
 * -
 * babel은 그 자체로는 아무것도 하지 않는다.
 * 만약 preset과 plugin을 추가하지 않는다면 babel은 아무것도 하지 않는다.
 *
 * -
 * babel이 7로 업데이트 되면서 scoped package로 전환
 * babel-cli -> @babel/cli
 * (기존의 비공식적인 package들과 네이밍 컨벤션에 문제)
 * 바벨에서 기본적으로 제공하는 프리셋과 비공식 프리셋 또는 직접만든 프리셋 구분
 *
 * babel@7.4.0 이전에는 @babel/polyfill을 많이 사용했지만, 이제는 @babel/preset-env로 통합하여 사용
 * (@babel/polyfill은 babel@7.4.0에서 deprecated 되었다.)
 *
 * -
 * 웹팩(webpack)과 함께 사용할 때
 * .babelrc 있다면 해당 파일을 먼저 참조 하며,
 * 없을 경우 webpack options에 부여한 presets plugins 을 참조한다.
 * (즉, 웹팩에 babel-loader를 활성화하고 옵션을 비워 둘 경우, ".babelrc" 을 웹팩이 읽어 사용)
 *
 * -
 * 프로젝트 전체 구성 : babel.config.js
 * 파일 관련 구성 : .babelrc.json 또는 package.json "babel" 키
 */

module.exports = function (api) {
    api.cache(true)
    //const env = api.cache(() => process.env.NODE_ENV);
    //const isProd = api.cache(() => process.env.NODE_ENV === "production");
    //api.cache.forever(); // api.cache(true)
    //api.cache.never();   // api.cache(false)
    //api.cache.using(fn); // api.cache(fn)

    // babel은 그 자체로는 아무것도 하지 않는다.
    // 만약 preset과 plugin을 추가하지 않는다면 babel은 아무것도 하지 않는다.
    // $ npm install @babel/core @babel/cli
    const presets = [
        [
            // $ npm install @babel/preset-env
            "@babel/preset-env",
            {
                //modules: env === 'test' ? 'commonjs' : false,
                //loose: true,
                // https://github.com/babel/babel/issues/9849
                targets: {
                    esmodules: true,
                },
            },
        ],
    ]
    const plugins = [
        // $ npm install @babel/plugin-proposal-class-properties
        // https://babeljs.io/docs/en/babel-plugin-proposal-class-properties
        "@babel/plugin-proposal-class-properties",
        // $ npm install @babel/plugin-proposal-optional-chaining
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
        "@babel/plugin-proposal-optional-chaining",
        [
            // $ npm install babel-plugin-module-resolver
            "module-resolver",
            {
                root: ["./"],
                alias: {
                    "@src": "./src",
                },
            },
        ],
    ]
    const babelrcRoots = ["."]

    return {
        presets,
        plugins,
        babelrcRoots,
    }
}

/*
// require.resolve 함수는 모듈 내부의 파일경로를 입력받아 해당 파일을 가져오는 함수 입니다.
// require는 모듈 자체를 가져온다면 요거는 필요한 파일만 가져오는 것
module.exports = {
  presets: [
    require.resolve('@babel/preset-env'),
    require.resolve('@babel/preset-typescript'),
    [require.resolve('@babel/preset-react'), { runtime: 'automatic' }],
  ],
  plugins: [
    [require.resolve('@babel/plugin-proposal-class-properties'), { loose: true }],
    [require.resolve('@babel/plugin-proposal-private-methods'), { loose: true }],
    [require.resolve('@babel/plugin-proposal-private-property-in-object'), { loose: true }],
    require.resolve('@babel/plugin-proposal-numeric-separator'),
  ],
};
*/
