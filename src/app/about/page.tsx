"use client";

import { useSearchParams } from "next/navigation";

export default function About() {
  const searchParam = useSearchParams();
  const name = searchParam.get("name");
  return (
      <>
        <h1>About Page</h1>
        {name ? (<div>クエリパラメーターは{name}</div>) : (<div>クエリパラメーターはありません</div>)}
      </>
  )
}