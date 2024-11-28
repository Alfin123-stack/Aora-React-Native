import React, { useEffect, useState } from "react";
import {
  getAllPost,
  getLatePost,
  getUserPost,
  searchPost,
} from "../lib/appwrite";

const useFetchData = (type, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchData() {
    setIsLoading(true);
    try {
      if (type === "all") {
        const allPost = await getAllPost();
        setData(allPost);
      } else if (type === "latest") {
        const latePost = await getLatePost();
        setData(latePost);
      } else if (type === "search" && query) {
        const search = await searchPost(query);
        setData(search);
      } else if (type === "user" && query) {
        const user = await getUserPost(query);
        setData(user);
      }
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
