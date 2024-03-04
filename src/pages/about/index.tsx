import useQueryParameter from "@/hooks/useQueryParameter";


export async function getServerSideProps(context: any) {
  console.log()
  return {
    props: {
      initialQueryParam: context.query.name || null,
    },
  };
}

export default function About({initialQueryParam}:any) {
  const queryParam = useQueryParameter('name', initialQueryParam)
  return (
      <>
        <h1>About Page</h1>
        {queryParam ? (<div>クエリパラメーターは{queryParam}</div>) : (<div>クエリパラメーターはありません</div>)}
      </>
  )
}