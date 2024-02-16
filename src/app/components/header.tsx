import Link from "next/link"
import { useRouter } from 'next/router';
import React from "react";

const HeaderComponent = () => {
  // const router = useRouter();

  // const goToPage = () => {
  //   router.push("/company")
  // }
  return (
    <header>
      <div className="inner flex justify-between p-5 border-b border-black mb-5">
        <div className="logo"><Link href="/">logo</Link></div>
        <nav className="flex gap-4">
          <Link href="/about">About</Link>
          <Link
            href={{
              pathname: '/about',
              query: { name: 'test' },
            }}
          >
            About with query
          </Link>
          <Link href="/users">Users</Link>
          <Link href="/articles/1">article</Link>
          <Link href="/posts/hgoe">posts</Link>
          <Link href="/posts/fuga">posts</Link>
          {/* <button onClick={goToPage}>Company page</button> */}
        </nav>
      </div>
    </header>
  )
}

const Header = React.memo(HeaderComponent);

export default Header