import axios from "axios";
import { useState } from "react";

type UserFormData = {
  name: string;
  email: string;
  description: string;
}


export const useCreateUser = () => {
  // const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/users`, fetcher);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null)
  
  const createUser = async (formData: UserFormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(`/api/users`, formData);
      console.log('Success:', response.data);
    } catch(err) {
      setError("Failed");
      console.error('Error:', err);
    } finally {
      setIsLoading(false)
    }
  }
  
  return {
    user: createUser,
    isLoading,
    isError: error
  }
}