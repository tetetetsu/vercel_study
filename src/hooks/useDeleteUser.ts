import axios from "axios";
import { useState } from "react";

export const useDeleteUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const deleteUser = async (userId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/user/delete/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
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
    deleteUser,
    isLoading,
    isError: error,
  }
}