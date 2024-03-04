import PageTitle from '@/app/components/title/pageTitle';
import { useCreateUser } from '../../hooks/useCreateUser';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from "react";

export default function CreateUser() {
  const router = useRouter();
  const { createUser, isLoading, isError } = useCreateUser();
  const [success, setSuccess] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    mail: '',
    description: '',
  });

  const handleChange = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // input要素のnameとvalueを取得
    setUserInfo(prevState => ({
      ...prevState,
      [name]: value, // 計算されたプロパティ名を使って特定のキーの値を更新
    }));
  }, []);

  const submit = useCallback(async() => {
    setSuccess(false)
    const name = userInfo.name;
    const mail = userInfo.mail;
    const description = userInfo.description;

    const result = await createUser({ name, mail, description });
    if(result.error) throw result.error;
    // エラーがなければ初期化
    setUserInfo({
      name: '',
      mail: '',
      description: '',
    });
    setSuccess(true)
  },[createUser, userInfo]);
  
  return (
    <>
      <PageTitle>ユーザー作成</PageTitle>
      {isError && <div>error...</div>}
      {isLoading && <div>登録中...</div>}
      <div className="flex gap-5 flex-col items-center">
        <div className="flex gap-5 flex-col p-3">
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
        <button onClick={submit} disabled={isLoading}>
          Create User
        </button>
        {isError && <p>{isError}</p>}
        {success && <p>登録成功！</p>}
      </div>
    </>
  )
}