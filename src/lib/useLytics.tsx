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
    hit();
  };
  const routeChange = () => {
    hit();
  };
  return { routeChange, init };
};

export default useLytics;
