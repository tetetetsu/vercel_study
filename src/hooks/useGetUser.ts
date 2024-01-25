import useSWR from "swr";
import { apiUri } from '@/utils';

type User = {
  id: string;
  name: string;
  email: string;
}

async function fetcher(key: string) {
  return fetch(key).then((res) => res.json() as Promise<User | null>);
}

export const useGetUser = (id: string) => {
  const { data, error, isLoading } = useSWR(`${apiUri}/users/${id}`, fetcher);

  return {
    user: data,
    isLoading,
    isError: error
  }
}