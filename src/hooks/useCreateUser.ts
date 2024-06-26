import axios from "axios";
import { useState } from "react";

type User = {
  name: string;
  mail: string;
  description: string;
}


export const useCreateUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const createUser = async (formData: User) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/user/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();

      return ({data: data, message: "Success!"});
    } catch(err) {
      setError("Failed");

      return ({error: err})
    } finally {
      setIsLoading(false);
    }
  }
  
  return {
    createUser,
    isLoading,
    isError: error,
  }
}