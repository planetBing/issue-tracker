import { useState, useEffect } from "react";

export default function useApi<T>(path: string) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

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

  return { data, isLoading };
}
