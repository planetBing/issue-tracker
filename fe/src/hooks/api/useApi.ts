import { useEffect, useState, useCallback } from "react";
import axios from "axios";

export default function useApi<T>(initialPath: string) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiPath, setApiPath] = useState(initialPath);

  const fetchData = useCallback(
    async (method: "GET" | "PUT", path: string, body?: any) => {
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
        } else {
          refetch();
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
    setApiPath(newPath || initialPath);
  };

  const putData = (putPath: string, body: any) => {
    fetchData("PUT", putPath, body);
  };

  return { data, isLoading, refetch, putData };
}
