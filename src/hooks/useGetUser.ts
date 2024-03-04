import useSWR from "swr";

type User = {
  id: string;
  name: string;
  mail: string;
  description: string;
}

async function fetcher(key: string) {
  return fetch(key).then((res) => res.json() as Promise<User | null>);
}

export const useGetUser = (id: string) => {
  const { data, error, isLoading } = useSWR(`/api/user/${id}`, fetcher);

  return {
    user: data,
    isLoading,
    isError: error
  }
}