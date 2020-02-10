import { useEffect, useState, useRef } from 'react';


export const useDataFetch = (fetch, deps) => {
  const isMounted = useRef(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    isMounted.current = true;

    (async () => {
      const d = await fetch();

      if (isMounted.current) {
        setData(d);
      }
    })();

    return () => {
      isMounted.current = false;
    };
  }, deps || []);

  return data;
};
