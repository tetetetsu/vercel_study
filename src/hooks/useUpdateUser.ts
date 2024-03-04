import axios from "axios";
import { useState } from "react";

type UserFormData = {
  name: string;
  mail: string;
  description: string;
}


export const useUpdateUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const updateUser = async (userId: string, formData: UserFormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/user/update/${userId}`, {
        method: 'PATCH',
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
    updateUser,
    isLoading,
    isError: error,
  }
}