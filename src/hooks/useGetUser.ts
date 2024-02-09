import useSWR from "swr";

type User = {
  id: string;
  name: string;
  email: string;
}

async function fetcher(key: string) {
  return fetch(key).then((res) => res.json() as Promise<User | null>);
}

export const useGetUser = (id: string) => {
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/${id}`, fetcher);

  return {
    user: data,
    isLoading,
    isError: error
  }
}