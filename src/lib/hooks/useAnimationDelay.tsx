import { useCallback, useEffect, useRef, useState } from 'react';

type UseAnimationDelayState = {
  render: boolean;
  state: 'in' | 'inRunning' | 'inDone' | 'out' | 'outDone' | 'init';
  animateIn: boolean;
};

type UseAnimationDelayProps = {
  delay: number;
  callback?: () => void;
};
const useAnimationDelay = ({ delay }: UseAnimationDelayProps) => {
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const [allState, setState] = useState<UseAnimationDelayState>({
    render: false,
    state: 'init',
    animateIn: false,
  });

  const { render, state, animateIn } = allState;

  const trigger = useCallback((dir: boolean) => {
    if (dir) {
      return setState((oS) => ({ ...oS, state: 'in', render: true }));
    }
    return setState((oS) => ({ ...oS, state: 'out', animateIn: false }));
  }, []);

  useEffect(() => {
    const tO = timeout.current;

    if (state === 'in') {
      window.requestAnimationFrame(() => {
        setState((oS) => ({ ...oS, animateIn: true, state: 'inRunning' }));
      });

      timeout.current = setTimeout(() => {
        setState((oS) => ({ ...oS, state: 'inDone' }));
      }, delay);
    }

    if (state === 'out') {
      timeout.current = setTimeout(() => {
        setState((oS) => ({
          ...oS,
          state: 'outDone',
          render: false,
          animateIn: false,
        }));
      }, delay);
    }

    return () => {
      if (tO) {
        window.clearTimeout(tO);
      }
    };
  }, [timeout.current, state]);

  return { render, state, trigger, animateIn };
};

export default useAnimationDelay;
