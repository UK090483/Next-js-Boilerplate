import * as React from 'react';

import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import classNames from 'classnames';

interface INavBarProps {
  isWhite: boolean;
}

const NavBar: React.FunctionComponent<INavBarProps> = ({
  children,
  isWhite,
}) => {
  const [{ scrolled, hide }, setState] = React.useState({
    scrolled: false,
    hide: false,
  });

  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y < -600;
      const dir = prevPos.y > currPos.y;
      if (isShow !== scrolled || dir !== hide)
        setState({ hide: dir, scrolled: isShow });
    },
    [scrolled, hide]
  );

  return (
    <div
      className={classNames(
        'fixed z-40  top-0 left-0 right-0 flex items-center justify-between max-w-app_max_width mx-auto transition-all',
        'h-20 bg-opacity-80  px-app_side_small md:px-app_side  duration-500',
        { 'bg-transparent': !scrolled && !isWhite },
        { 'bg-transparent text-white': !scrolled && isWhite },
        { 'bg-white text-black': scrolled },
        { '-translate-y-full': hide }
      )}
    >
      {children}
    </div>
  );
};

export default NavBar;
