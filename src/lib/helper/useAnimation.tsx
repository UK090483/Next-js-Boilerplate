import { useEffect, useState } from 'react';

type UseAnimationState = {
  direction: 'in' | 'out' | null;
  isAnimating: boolean;
  current: boolean;
  shouldRender: boolean;
  setCurrent: boolean;
};
const useAnimation = (time: number) => {
  const [state, setState] = useState<UseAnimationState>({
    direction: null,
    isAnimating: false,
    current: false,
    shouldRender: false,
    setCurrent: false,
  });

  const { direction, isAnimating, current, shouldRender, setCurrent } = state;

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;
    if (isAnimating)
      timeout = setTimeout(() => {
        setState((oS) => ({
          ...oS,
          isAnimating: false,
          direction: null,
          ...(state.direction === 'out' ? { shouldRender: false } : {}),
        }));
      }, time);
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [isAnimating, time]);

  useEffect(() => {
    if (current === setCurrent) return;
    setTimeout(() => {
      setState((oS) => ({
        ...oS,
        current: setCurrent,
      }));
    }, 10);
  }, [setCurrent, current]);

  const animate = (dir: 'in' | 'out' | 'toggle') => {
    switch (dir) {
      case 'toggle':
        setState((oS) => ({
          ...oS,
          current: !current,
          isAnimating: true,
        }));
        break;
      case 'in':
        setState((oS) => ({
          ...oS,
          isAnimating: true,
          shouldRender: true,
          setCurrent: true,
          direction: 'in',
        }));

        break;
      case 'out':
        setState((oS) => ({
          ...oS,
          current: false,
          isAnimating: true,
          direction: 'out',
        }));
        break;

      default:
        break;
    }
  };

  return {
    isAnimating,
    animate,
    direction,
    current,
    shouldRender,
  };
};

export default useAnimation;
