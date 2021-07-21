import * as React from 'react';

import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import classNames from 'classnames';
import Link from 'next/link';
import Popup from 'reactjs-popup';

import { NavigationItem, PageResult } from '@src/pageTypes/page/pageQueries';

import Icon from '../components/Icon';
import useAnimationDelay from '../lib/hooks/useAnimationDelay';
import { useMenu } from '../lib/store';

const NI: React.FC<NavigationItem> = (props) => {
  const { items, label, slug } = props;

  if (!items) {
    return (
      <Link href={`/${slug || ''}`} passHref>
        <a className="px-6 font-bold">{label}</a>
      </Link>
    );
  }
  return (
    <Popup
      trigger={
        <button id="testId" className="px-6 font-bold" type="button">
          {label}
        </button>
      }
      position="bottom center"
      on={['hover', 'focus']}
    >
      <div className="flex flex-col bg-white">
        {items.map((i) => (
          <Link key={i.key} href={`/${i.slug || ''}`} passHref>
            <a className="p-3 font-bold">{i.label}</a>
          </Link>
        ))}
      </div>
    </Popup>
  );
};

const NavItem = React.memo(NI);

// interface INavProps {
//   items?: INavItemProps[];
// }
interface INavProps extends PageResult {}

const Nav: React.FunctionComponent<INavProps> = (props) => {
  const items = props.site?.navigation?.main;
  const isWhite = props.pageHeader?.color === 'white';
  const [scrolled, setScrolled] = React.useState(false);

  useScrollPosition(
    ({ currPos }) => {
      const isShow = currPos.y < -200;
      if (isShow !== scrolled) setScrolled(isShow);
    },
    [scrolled]
  );
  const didMount = React.useRef(false);

  const { isOpen, toggle } = useMenu();

  const { render, trigger, animateIn } = useAnimationDelay({
    delay: 150,
  });

  React.useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
    } else {
      trigger(isOpen);
    }
  }, [isOpen, trigger]);

  return (
    <>
      {render && (
        <div
          className={classNames(
            'transform -translate-x-full transition-transform ',
            'fixed top-0 inset-0 z-50 flex flex-col items-center justify-center w-full h-full bg-gray-600 relativ',
            { '-translate-x-0': animateIn }
          )}
        >
          <Icon
            icon="x"
            size="m"
            onClick={toggle}
            className="absolute top-app_side_small right-app_side_small"
          />

          {items &&
            items.map((item) => (
              <NavItem
                key={item.key}
                label={item.label}
                labelEn={item.labelEn}
                slug={item.slug}
                items={item.items}
              />
            ))}
        </div>
      )}
      <div
        className={classNames(
          'fixed z-50  top-0 left-0 right-0 flex items-center justify-between',
          'h-20 bg-opacity-80  px-app_side_small md:px-app_side transition-colors duration-500',
          { 'bg-transparent': !scrolled && !isWhite },
          { 'bg-transparent text-white': !scrolled && isWhite },
          { 'bg-main text-white': scrolled }
        )}
      >
        <Link href="/" passHref>
          <a className="text-3xl font-bold">Hanne Rønn</a>
        </Link>

        <div className="md:hidden">
          <Icon
            icon="menu"
            size="m"
            onClick={toggle}
            className=" top-app_side_small right-app_side_small"
          />
        </div>
        <div className="hidden md:block">
          {items &&
            items.map((item) => (
              <NavItem
                key={item.key}
                label={item.label}
                labelEn={item.labelEn}
                slug={item.slug}
                items={item.items}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default Nav;
