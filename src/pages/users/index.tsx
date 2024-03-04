import PageTitle from "@/app/components/title/pageTitle";
import { useDeleteUser } from "@/hooks/useDeleteUser";
import { useGetUsers } from "@/hooks/useGetUsers";
import Link from "next/link";
import { useCallback, useState } from "react";
import styled from 'styled-components';
import { mutate } from 'swr';


const DeleteButton = styled.button`
  padding: 4px 10px;
  color: #fff;
  background: #888;
  border-radius: 3px;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  z-index: 1;
`;

export default function Index() {
  const [refreshKey, setRefreshKey] = useState(0);
  const { users, isLoading, isError } = useGetUsers();
  const { deleteUser, isLoading: isLoadingDelete, isError: isErrorDelete } = useDeleteUser();


  

  const handleDelete = useCallback(async(userId:any, e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const result = await deleteUser(userId);
      if(result.error) throw result.error;
      
      // 再検証
      mutate(`/api/user`)
    } catch (err) {
      console.error(err);
    }
  },[deleteUser]);


  return (
    <>
      <PageTitle>ユーザー一覧</PageTitle>
      {isError && <div>failed to load</div>}
      {isLoading && <div>loading...</div>}
      {!isLoading && !isError && users && (
        <div className="flex gap-5 flex-col">
          {users && users.map((user, index: number) => {
            return (
              <div key={user.id} className="bg-gray-100 p-3 relative">
                <Link href={`/users/${user.id}`}>
                  <dl className="flex">
                    <dt className="pr-5">ID</dt>
                    <dd>{user.id}</dd>
                  </dl>
                  <dl className="flex">
                    <dt className="pr-5">名前</dt>
                    <dd>{user.name}</dd>
                  </dl>
                  <dl className="flex">
                    <dt className="pr-5">メール</dt>
                    <dd>{user.mail}</dd>
                  </dl>
                  <dl className="flex">
                    <dt className="pr-5">説明</dt>
                    <dd>{user.description}</dd>
                  </dl>
                  <DeleteButton onClick={(e) => handleDelete(user.id, e)}>削除</DeleteButton>  
                </Link>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}