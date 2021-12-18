import * as React from 'react';
import axios from 'axios';
import classNames from 'classnames';

// 부모 컴포에서 전달받은 props의 type를 지정한다
export interface HelloProps {
  compiler : string;
  framework : string;
};

const TEST = {
  a: 'a',
  b: 'b',
};

let test: keyof typeof TEST;
test = 'a';


// as - 타입단언
// as 를 사용해 최종적으로 확실하게 타입을 단언 
const Product = {
  image: `test.png`,
  title: '타이틀',
  link: 'naver.com',
};
const Mock = {
  products: [] as typeof Product[],
};

// props의 type을 helloProps 인터페이스와 연결
export const Hello = (props: HelloProps) => {
  (async () => {
    const { data } = await axios.get('/api/test/0001');
    console.log('axios data', data);
  })();

  // 컴포넌트 테스트
  const refComponent1Props = React.useRef<HTMLInputElement>(null);
  //const refComponent1Props = React.createRef();
  const propsComponent1 = {
    'attr1': 'test1',
    'attr2': 'test2',
  };
  const Component1 = React.forwardRef<HTMLInputElement, any>((props: any, ref) => { // React.forwardRef<RefType, PropsType>((props, ref) => {
    console.log(props);
    return (
      <>
        {/* 리액트 컴포넌트를 사용할 때 컴포넌트 태그 사이의 내용을 보여 주는 props가 있는데요. 바로 children 입니다. */}
        {props.children}
        {props.BottomComponent}
        <div>
          <input ref={ref} />
        </div>
      </>
    );
  });

  // 렌더링과 상관없이 컴포넌트에 필요한 정보
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const setResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  /*
  1. 렌더링
  2. useLayoutEffect 가 호출됨
  3. 브라우저의 화면 그리기 : 이 시점에 컴포넌트에 해당하는 엘레먼트가 실제로 DOM에 추가됨
  4. useEffect 가 호출됨
  */
  React.useLayoutEffect(() => {
    console.log('useLayoutEffect');
    setResize();
    window.addEventListener("resize", setResize);
    return () => window.removeEventListener("resize", setResize);
  }, []);
  React.useEffect(() => {
    console.log('useEffect');
    if (refComponent1Props.current) {
      refComponent1Props.current.focus();
    }
  }, []);
  
  return (
    <>
      <h1>{props.compiler} and {props.framework}!</h1>
      <div>{width} / {height}</div>
      <Component1 { ...propsComponent1 } ref={refComponent1Props} BottomComponent={(<div>BottomComponent</div>)}>
        <div className={classNames('test', { ysm: true })}>children</div>
      </Component1>
    </>
  );
};