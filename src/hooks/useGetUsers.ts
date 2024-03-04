import useSWR from "swr";

type Users = {
  id: string;
  name: string;
  mail: string;
  description: string;
}

async function fetcher(key: string) {
  return fetch(key).then((res) => res.json() as Promise<Users[] | null>);
}

export const useGetUsers = () => {
  const { data, error, isLoading } = useSWR(`/api/user`, fetcher);
  
  return {
    users: data,
    isLoading,
    isError: error
  }
}