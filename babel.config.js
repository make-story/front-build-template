/**
 * https://babeljs.io/docs/en/config-files/
 * 
 * 프로젝트 전체 구성 : babel.config.js
 * 파일 관련 구성 : .babelrc.json 또는 package.json"babel"키 
 */

 module.exports = function(api) {
  api.cache(true);
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
      '@babel/preset-env', {
        //modules: env === 'test' ? 'commonjs' : false,
        //loose: true,
        // https://github.com/babel/babel/issues/9849
        targets: {
          esmodules: true,
        },
      },
    ]
  ];
  const plugins = [
    // $ npm install @babel/plugin-proposal-class-properties
    '@babel/plugin-proposal-class-properties',
    [
      // $ npm install babel-plugin-module-resolver
			"module-resolver", {
				"root": ["./"],
				"alias": {
		  			"@src": "./src"
				}
			}
		]
  ];
  const babelrcRoots = ['.'];

  return {
    presets,
    plugins,
    babelrcRoots
  };
}