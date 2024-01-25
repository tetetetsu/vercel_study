import Layout from "@/app/components/layouts/layout";
import { useGetUsers } from "@/hooks/useGetUsers";
import Link from "next/link";

export default function Index() {
  const { users, isLoading, isError } = useGetUsers();

  if(isError) return <div>failed to load</div>;
  if(isLoading) return <div>loading...</div>;

  return (
    <>
      <h1>users index</h1>
      {isError && <div>failed to load</div>}
      {isLoading && <div>loading...</div>}
      {!isLoading && !isError && users && (
        <div className="flex gap-5 flex-col">
          {users && users.map((user, index: number) => {
            return (
              <div key={index} className="bg-gray-100 p-3">
                <Link href={`/users/${user.id}`}>
                  <p>{user.name}</p>
                  <p>{user.email}</p>
                </Link>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}