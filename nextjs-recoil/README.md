[해당 글](https://parkgang.github.io/blog/2021/05/06/using-recoil-in-nextjs/) 을 참고하여 작업했습니다. 
## _app.js 
```javaScript
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
```
next.js는 모든 페이지를 렌더링하기 전에, _app.js를 거친다. 따라서 ```<RecoilRoot>``` 를 _app.js에 적용해 줌

## atom 
```javaScript
import { atom } from "recoil";

export const pageNameState = atom({
  key: "pageNameState",
  default: "",
}); 
```
```states/index.js``` 파일 내에 atom 사용하여 선언 

## 비동기처리 
### 1️⃣ selector + ```useRecoilValueLoadable()```
```javaScript
import { selector } from "recoil";

export const getNameSelector = selector({
  key: "getNameSelector",
  get: async () => {
    const res = await axios.get("http://localhost:3000/api/hello");
    return res.data; //res 모두 리턴하면 run time error 발생함. (dev환경에서)
  },
});
```
selector 사용해서 비동기 작업.    
💁🏻‍♀️ res 전체 값을 return 하게 되면 에러 발생. 따라서 res.data를 return
```javaScript
const name = useRecoilValueLoadable(getNameSelector);
```
```useRecoilValueLoadable()```를 ```<Suspense>``` 대신하여 사용함    
```Loadable```은 atom이나 selector의 현재 상태를 나타내는 객체이며 아래와 같은 인터페이스를 가짐   
- state : atom 혹은 selector의 최신 상태, ```hasValue``` , ``` hasError``` , ```Loading```의 상태를 가짐   
- contents : Loadable에 의해 대표되는 값, state에 따라 다음 값을 가짐   
  +  ```hasValue``` : 실제 값   
  + ```hasError ``` : Error객체   
  + ```Loading``` : promise 객체   
  
[리코일 공식문서 Loadable](https://recoiljs.org/ko/docs/api-reference/core/Loadable/)
  
### 2️⃣ Selecotor + ``` <Suspense> ```   
```javaScript
 const name = useRecoilValue(getNameSelector); 
 const isname = nameValue ? `${nameValue}` : "";
 ```
  ```javaScript
          <Suspense fallback={<div>Loading...</div>}>
          <h1>{JSON.stringify(isname)}</h1>
        </Suspense>
```    
next.js 12 버전 이하에서는 ```React.Suspense``` 를 지원하지 않았으나, 12 이상 부터는 지원한다.   
따라서 앞서 ```useRecoilValueLoadable``` 을 통해 렌더링할 데이터가 도착하기 이전(loading, 비동기 처리하고 있을 때 ) 보여줄 fallback UI를 ```Suspense```를 통해 보여준 것이다. 
        
 
