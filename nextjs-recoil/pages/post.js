import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { getNameSelector, pageNameState } from "../states";
import Link from "next/link";
import { Suspense } from "react";

const PostPage = () => {
  const [pageName, setPageName] = useRecoilState(pageNameState);
  //suspaense 대신해서 recoilvalueLoadable 사용
  // const name = useRecoilValueLoadable(getNameSelector);
  //state -> selector의 상태(hasValue, hasError, loading 존재)
  const nameValue = useRecoilValue(getNameSelector);

  const isname = nameValue ? `${nameValue}` : "";
  return (
    <div>
      <div>
        <h1>Post Page!</h1>
      </div>
      <div>
        <span>pageName 상태: {pageName}</span>
      </div>
      <div>
        <button
          onClick={() => {
            setPageName("PostPage");
          }}
        >
          현재 페이지 이름으로 상태 변경
        </button>
      </div>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <h1>{JSON.stringify(isname)}</h1>
        </Suspense>
      </div>
      <Link href="/">
        <button>Index Pages 이동</button>
      </Link>
    </div>
  );

  // switch (name.state) {
  //   case "hasValue":
  //     return (
  //       <div>
  //         <div>
  //           <h1>Post Page!</h1>
  //         </div>
  //         <div>
  //           <span>pageName 상태: {pageName}</span>
  //         </div>
  //         <div>
  //           <button
  //             onClick={() => {
  //               setPageName("PostPage");
  //             }}
  //           >
  //             현재 페이지 이름으로 상태 변경
  //           </button>
  //         </div>
  //         <div>
  //           <h1>{JSON.stringify(name.contents)}</h1>
  //         </div>
  //         <Link href="/">
  //           <button>Index Pages 이동</button>
  //         </Link>
  //       </div>
  //     );

  //   case "loading":
  //     return <div>Loading</div>;
  //   case "hasError":
  //     //contents -> 각 상태에 따른 값으로 hasValue(실제값),hasError(Error객체), loading(Promise객체)
  //     return <div>{name.contents}</div>;
  // }
};

export default PostPage;
