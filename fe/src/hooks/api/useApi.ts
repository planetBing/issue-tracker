import { useState, useEffect } from "react";

export default function useApi<T>(path: string) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);
  const [apiPath, setApiPath] = useState(path);

  useEffect(() => {
    fetchData();
  }, [apiPath]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.REACT_APP_SERVER}${path}`);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching label data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = (newPath?: string) => {
    setApiPath(newPath || path); // newPath가 제공되면 그것으로 경로를 업데이트
  };

  return { data, isLoading, refetch };
}
