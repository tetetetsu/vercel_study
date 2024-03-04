import { useRouter } from 'next/router';
import { useGetUser } from "@/hooks/useGetUser";
import { useCallback, useEffect, useState } from 'react';
import PageTitle from '@/app/components/title/pageTitle';
import Link from 'next/link';

export default function User() {
  const router = useRouter();
  const userId = typeof router.query.userid === 'string' ? router.query.userid : '';
  const { user, isLoading, isError } =  useGetUser(userId);

  const handleEdit = useCallback(() => {
    router.push(`/users/${userId}/edit`);
  },[userId])

  return (
    <>
      {isError && <div>failed to load</div>}
      {isLoading && <div>loading...</div>}
      {!isLoading && !isError && user && (
        <>
          <PageTitle>ユーザー詳細：{user && user.name}</PageTitle>
          <div className="flex gap-5 flex-col">
            <div className="bg-gray-100 p-3">
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
            </div>
            <button onClick={handleEdit}>編集</button>
            <Link href="/users">←一覧へ戻る</Link>
          </div> 
        </>
      )}
    </>
  )
}