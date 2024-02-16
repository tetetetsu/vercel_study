import useSWR from "swr";

type Users = {
  id: string;
  name: string;
  email: string;
  description: string;
}

async function fetcher(key: string) {
  return fetch(key).then((res) => res.json() as Promise<Users[] | null>);
}


export const useGetUsers = () => {
  // const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/users`, fetcher);
  const { data, error, isLoading } = useSWR(`/api/users`, fetcher);
  
  return {
    users: data,
    isLoading,
    isError: error
  }
}