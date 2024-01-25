import useSWR from "swr";
import { apiUri } from '@/utils';

type Users = {
  id: string;
  name: string;
  email: string;
}

async function fetcher(key: string) {
  return fetch(key).then((res) => res.json() as Promise<Users[] | null>);
}

export const useGetUsers = () => {
  const { data, error, isLoading } = useSWR(`${apiUri}/users`, fetcher);

  return {
    users: data,
    isLoading,
    isError: error
  }
}