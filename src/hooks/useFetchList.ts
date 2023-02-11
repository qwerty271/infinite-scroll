import { useCallback, useEffect, useState } from "react";

/** Custom hook calling request and returns object
 * @param {string} url - Fetch url;
 * @param {string} query - Fetch query params;
 * @param {number} page - Fetch page number.
 * @returns {{isloading: boolean, isError: boolean, list: Array}}
 */
const useFetchList = <T>(url: string, query: string, page: number) => {
  const [isloading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [list, setList] = useState<T[]>([]);

  const sendQuery = useCallback(() => {
    setIsLoading(true);
    fetch(`${url}?page=${page}&${query}`)
      .then((res) => res.json())
      .then((responseData) => {
        setList((prevState) => [...prevState, ...responseData.results]);
      })
      .catch((err) => setIsError(err))
      .finally(() => setIsLoading(false));
  }, [url, page, query]);

  useEffect(() => {
    sendQuery();
  }, [query, sendQuery, page]);

  return { isloading, isError, list };
};

export default useFetchList;
