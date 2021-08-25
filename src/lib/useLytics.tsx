import Cookies from 'cookies-ts';
import { v4 as uuidv4 } from 'uuid';

const cookies = new Cookies();

const cookieName = '_lytics_id';
const hit = async () => {
  try {
    const res = await fetch('/api/lytics');
    res.json().then((e) => console.log(e));
    return 'bla';
  } catch (error) {
    console.log(error);
    return false;
  }
};

const useLytics = () => {
  const init = () => {
    let uid = cookies.get(cookieName);
    if (!uid) {
      uid = uuidv4();
      cookies.set(cookieName, uid);
    }

    hit();
  };
  const routeChange = () => {
    hit();
  };
  return { routeChange, init };
};

export default useLytics;
