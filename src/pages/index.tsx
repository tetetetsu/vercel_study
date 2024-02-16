import Layout from "@/app/components/layouts/layout";
import Image from "next/image";
import { useCreateUser } from '../hooks/useCreateUser';
import { useState } from "react";

export default function Index() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const { user, isLoading, isError } = useCreateUser();

  const handleCreateUser = async () => {
    await user({ name, email, description });
  };
  return (
      <>
        <h1>index</h1>
        <div className="flex justify-center">
          <div className="w-6/12">
            <Image
              src="/images/image01.webp"
              alt="cats"
              width={1200}
              height={1200}
              quality={80} // default:75
              sizes="(min-width: 640px) 50vw, 100vw"
              style={{
                width: '100%',
                height: 'auto',
              }}
              priority={true}
            />
          </div>
         </div>
         <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              type="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
            <button onClick={handleCreateUser} disabled={isLoading}>
              Create User
            </button>
            {isError && <p>{isError}</p>}
          </div>
      
      </>
  )
}
