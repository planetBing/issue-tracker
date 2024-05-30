import { useEffect, useState, useCallback } from "react";
import axios from "axios";

export default function useApi<T>(apiPath: string) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(
    async (
      method: "GET" | "PUT" | "POST" | "DELETE" | "PATCH",
      path: string,
      body?: any
    ) => {
      setIsLoading(true);
      try {
        const response = await axios({
          url: `${process.env.REACT_APP_SERVER}${path}`,
          method,
          headers: {
            "Content-Type": "application/json",
          },
          data: body,
        });
        if (method === "GET") {
          setData(response.data);
        }
      } catch (error) {
        console.error(`Error with ${method} request:`, error);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchData("GET", apiPath);
  }, [apiPath, fetchData]);

  const refetch = (newPath?: string) => {
    fetchData("GET", apiPath);
  };

  const putData = async (putPath: string, body: any) => {
    await fetchData("PUT", putPath, body);
  };

  const postData = async (postPath: string, body: any) => {
    await fetchData("POST", postPath, body);
  };

  const deleteData = async (deletePath: string, body?: any) => {
    await fetchData("DELETE", deletePath, body);
  };

  const patchData = async (patchPath: string, body: any) => {
    await fetchData("PATCH", patchPath, body);
  };

  return { data, isLoading, refetch, putData, postData, deleteData, patchData };
}
