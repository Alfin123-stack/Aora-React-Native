import React, { useEffect, useState } from "react";

const useFetchData = (fn) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchData() {
    setIsLoading(true);
    try {
      const allPost = await fn();
      return setData(allPost);
    } catch (error) {
      console.log(error.message);
      throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, isLoading, refetch };
};

export default useFetchData;
