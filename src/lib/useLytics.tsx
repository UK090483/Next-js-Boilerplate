import React from 'react';

import Cookies from 'cookies-ts';
import { useRouter } from 'next/router';
import { useBeforeunload } from 'react-beforeunload';
import { v4 as uuidv4 } from 'uuid';

const cookies = new Cookies();

const cookieName = '_lytics_id';
const hit = async (params: { type: string; [k: string]: string }) => {
  try {
    const p = new URLSearchParams(params).toString();

    const res = await fetch(`/api/lytics?${p}`);
    res.json().then((e) => console.log(e));
    return 'bla';
  } catch (error) {
    console.log(error);
    return false;
  }
};

const useLytics = () => {
  const router = useRouter();
  useBeforeunload(() => {
    hit({ type: 'unload' });
  });
  const init = () => {
    let uid = cookies.get(cookieName);
    if (!uid) {
      uid = uuidv4();
      cookies.set(cookieName, uid);
    }

    hit({ type: 'init' });
  };
  const routeChange = (url: string) => {
    hit({ type: 'routChange', url });
  };
  React.useEffect(() => {
    init();
    const handleRouteChange = (url: string) => {
      routeChange(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { routeChange, init };
};

export default useLytics;
