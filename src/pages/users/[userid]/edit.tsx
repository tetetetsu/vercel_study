import { useRouter } from 'next/router';
import { useGetUser } from "@/hooks/useGetUser";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { useCallback, useEffect, useState } from 'react';
import PageTitle from '@/app/components/title/pageTitle';

export default function EditUser() {
  const router = useRouter();
  const userId = typeof router.query.userid === 'string' ? router.query.userid : '';
  const { user, isLoading: isLoadingUser, isError: isErrorUser } =  useGetUser(userId);
  const { updateUser, isLoading: isLoadingUpdateUser, isError: isErrorUpdateUser } =  useUpdateUser();
  const [userInfo, setUserInfo] = useState({
    name: '',
    mail: '',
    description: '',
  });

  useEffect(() => {
    if(user) {
      setUserInfo({
        name: user?.name ?? '',
        mail: user?.mail ?? '',
        description: user?.description ?? '',
      });
    }
  },[user]);

  const handleChange = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // input要素のnameとvalueを取得
    setUserInfo(prevState => ({
      ...prevState,
      [name]: value, // 計算されたプロパティ名を使って特定のキーの値を更新
    }));
  }, []);
  
  // 編集キャンセル
  const handleCancel = useCallback(() => {
    router.push(`/users/${userId}`);
  },[userId]);

  // 編集保存
  const submit = useCallback(async() => {
    const result = await updateUser(userId, userInfo);
    if(result.error) throw result.error;
    router.push(`/users/${userId}`);
  },[user, userId, userInfo, updateUser, router])

  return (
    <>
      {isErrorUser && <div>failed to load</div>}
      {isErrorUpdateUser && <div>error...</div>}
      {isLoadingUser && <div>loading...</div>}
      {isLoadingUpdateUser && <div>更新中...</div>}

      {!isLoadingUser && !isErrorUser && user && (
        <>
          <PageTitle>ユーザー詳細：{user && user.name}</PageTitle>
          <div className="flex gap-5 flex-col">
            <div className="bg-gray-100 p-3">
                <dl className="flex">
                  <dt className="pr-5">名前</dt>
                  <dd>
                    <input
                      type="text"
                      name="name"
                      value={userInfo.name}
                      onChange={handleChange}
                      placeholder="Name"
                    />
                  </dd>
                </dl>
                <dl className="flex">
                  <dt className="pr-5">メール</dt>
                  <dd>
                    <input
                      type="text"
                      name="mail"
                      value={userInfo.mail}
                      onChange={handleChange}
                      placeholder="Email"
                    />
                  </dd>
                </dl>
                <dl className="flex">
                  <dt className="pr-5">説明</dt>
                  <dd>
                    <input
                      type="text"
                      name="description"
                      value={userInfo.description}
                      onChange={handleChange}
                      placeholder="Description"
                    />
                  </dd>
                </dl>
            </div>
            <button onClick={handleCancel}>キャンセル</button>
            <button onClick={submit}>保存</button>
          </div> 
        </>
      )}
    </>
  )
}