import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function useQueryParameter(key:string, initialValue = null) {
  const router = useRouter();
  // const [param, setParam] = useState(() => router.query[key]);
  const [param, setParam] = useState(() => {
    return initialValue || router.query[key];
  });

  useEffect(() => {
    const handleRouteChange = () => {
      setParam(router.query[key]);
    }

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    }

  },[router.events, router.query, key]);

  return param;
}

export default useQueryParameter;