// import { useRouter } from 'next/router';

// export default function Article() {
//   const router = useRouter();
//   console.log(router)
//   const {article} = router.query;

//   return <h1>Article {article} Page</h1>;
// }

export async function getServerSideProps(context: any) {
  console.log()
  return {
    props: {
      initialQueryParam: context.query.article || null,
    },
  };
}

import useQueryParameter from "@/hooks/useQueryParameter";

export default function Article({initialQueryParam}:any) {
  const queryparam = useQueryParameter('article', initialQueryParam)
  console.log(queryparam)
  const hoge = queryparam === "1" ? <>test1</> : <>testother</>

  return <h1>Article {hoge} Page</h1>;
}