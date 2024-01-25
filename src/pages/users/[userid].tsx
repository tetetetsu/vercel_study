import { useRouter } from 'next/router';
import { useGetUser } from "@/hooks/useGetUser";
import Layout from '@/app/components/layouts/layout';

export default function User() {
  const router = useRouter();
  // const { userid } = router.query;
  const userid = typeof router.query.userid === 'string' ? router.query.userid : '';
  const { user, isLoading, isError } =  useGetUser(userid);

  // if(isError) return <div>failed to load</div>;
  // if(isLoading) return <div>loading...</div>;
  return (
    <>
      <h1>user detail</h1>
      {isError && <div>failed to load</div>}
      {isLoading && <div>loading...</div>}
      {!isLoading && !isError && user && (
        <div className="flex gap-5 flex-col">
          {user && (
            <div className="bg-gray-100 p-3">
                <p>{user.name}</p>
                <p>{user.email}</p>
            </div>
          )}
        </div>  
      )}
      
    </>
  )
}