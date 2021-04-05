/*
-
ESLint 설치
https://eslint.org/docs/user-guide/getting-started
$ npm install -g eslint 
$ npm install -D eslint-config-airbnb-base eslint-plugin-import
eslint: ESLint 코어
eslint-config-airbnb: Airbnb의 eslint 스타일 가이드
eslint-plugin-import: ES2015+의 import/export 구문을 지원

-
ESLint + Typescript (TSLint 프로젝트가 deprecated 상태가 되고 ESLint에 통합)
https://pravusid.kr/typescript/2020/07/19/typescript-eslint-prettier.html
https://github.com/typescript-eslint/typescript-eslint#packages-included-in-this-project
$ npm install -D @typescript-eslint/parser @typescript-eslint/eslint-plugin

-
ESLint + React
https://github.com/yannickcr/eslint-plugin-react#configuration
$ npm install -D eslint-plugin-react 

-
웹팩에서 로더로 실행
$ npm install -D eslint-loader

-
초기 설정파일 생성
$ eslint --init
.eslintrc.js 파일 생성됨
*/

module.exports = {
    // 환경(env): 프로젝트의 사용 환경을 설정한다.
    env: {
        browser: true,
        es2020: true,
        node: true, // node: true 는 webpack.config.js 빌드시 node 환경도 적용
    },

    // 파서
    parser: "@typescript-eslint/parser",

    // 파서 옵션(parserOptions): ESLint 사용을 위해 지원하려는 Javascript 언어 옵션을 설정할 수 있다.
    parserOptions: {
        // 자바스크립트 버전
        //ecmaVersion: 11,
        //sourceType: "module",
        // Typescript
        project: "./tsconfig.json",
        parser: "typescript-eslint-parser",
    },

    // 코드 포맷을 prettier로 설정
    plugins: ["prettier", "react", "@typescript-eslint"],

    // 확장(extends): 다른 ESLint 설정을 확장해서 사용할때 설정한다.
    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#supported-rules
    // plugin:prettier/recommended: eslint-plugin-prettier + eslint-config-prettier 동시 적용
    // prettier/@typescript-eslint: prettier 규칙과 충돌하는 @typescript-eslint/eslint-plugin 규칙 비활성화
    extends: [
        "plugin:@typescript-eslint/recommended",
        "prettier/@typescript-eslint",
        "plugin:react/recommended",
        "plugin:prettier/recommended",
    ],

    // ESLint가 무시할 디렉토리, 파일을 설정
    ignorePatterns: ["dist/", "node_modules/"],

    // 규칙(rules): 프로젝트에서 자체적으로 덮어쓰고 싶은 규칙을 정의할 때 사용한다.
    // https://eslint.org/docs/rules/
    rules: {
        quotes: ["error", "double"], //더블 쿼터 사용
        "@typescript-eslint/quotes": ["error", "double"], //더블 쿼터 사용
        "no-unused-vars": "off", //사용안한 변수 경고 중복
        "spaced-comment": "off", //주석을 뒤에 쓰지 말라는 경고
        "@typescript-eslint/no-unused-vars": "warn", //사용안한 변수는 경고
        "jsx-a11y/control-has-associated-label": "off", // 상호작용하는 엘리먼트에 label을 넣는다
        "react/no-array-index-key": "off", // key값으로 index를 사용할수 있다.
        "comma-dangle": "off", // 마지막에 , 을 넣어주지 않는다.
        "arrow-body-style": "off", //화살표 함수 안에 return을 사용 할 수 있다.
        "react/no-unescaped-entities": "off", //문자열 내에서 " ' > } 허용
        "react/prop-types": "off", //proptypes를 사용하지 않는다.
        "object-curly-newline": "off", // { 다음 줄 바꿈을 강제로 사용하지 않는다.
        "react/jsx-one-expression-per-line": "off", //한라인에 여러개의 JSX를 사용 할 수 있다.
        "implicit-arrow-linebreak": "off", // 화살표 함수 다음에 줄 바꿈을 사용할 수 있다.
        "no-shadow": "off", //파일 내에서 중복 이름을 사용 할 수 있다.
        "operator-linebreak": "off", //연산자 다음 줄 바꿈을 사용 할 수 있다.
        "react/react-in-jsx-scope": "off", // jsx를 사용하여도 React를 꼭 import 하지 않아도 된다.
        "react/jsx-props-no-spreading": "off", //props를 스프래드 할 수 있다.
        "jsx-a11y/anchor-is-valid": "off", // next js에서는 a에 href없이 사용
        "global-require": "off", //함수 내에서 require 사용가능
        "no-use-before-define": "off", // 선언전에 사용하지 말라,
        "import/prefer-default-export": "off", //export default 권장
        "no-param-reassign": "off", //param assign 하지 않기
        "jsx-a11y/label-has-associated-control": "off",
        "no-invalid-css": "off",
        "no-confusing-arrow": "off",
        "react/jsx-curly-newline": "off",
        indent: "off",
        "react/jsx-filename-extension": [
            1,
            { extensions: [".js", ".jsx", ".tsx"] }, //jsx사용가능한 확장자 설정
        ],
        "import/extensions": [
            "error",
            "ignorePackages",
            {
                js: "never",
                jsx: "never",
                ts: "never",
                tsx: "never",
            }, //import 시 확장자명은 사용하지 않는다.
        ],
    },
    settings: {
        "import/resolver": {
            node: {
                extensions: [".js", ".jsx", ".ts", ".tsx", ".d.ts"],
            },
        },
    },
}
