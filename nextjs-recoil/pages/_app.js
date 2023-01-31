import "../styles/globals.css";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;

//nextjs page별로 정적파일 찍어내는데, 이때 상태관리를 위해서는 _app.js 를 통해 함
// nextjs의 모든 pages는 렌더링 거치기 전에 _app.js 거치기 때문에
