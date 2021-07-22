import * as React from 'react';

import classNames from 'classnames';

import Icon from '@components/Icon';
import useAnimationDelay from '@lib/hooks/useAnimationDelay';
import { NavigationItem } from '@lib/queries/siteQuery';
import { useMenu } from '@lib/store';

import NavItem from './NavItem';

interface INavOverlayProps {
  items: NavigationItem[];
}

const NavOverlay: React.FunctionComponent<INavOverlayProps> = ({ items }) => {
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
            'fixed top-0 inset-0 z-50 flex flex-col items-center justify-center w-full h-full bg-black text-white relativ',
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
                className="py-5 text-2xl"
                key={item.key}
                label={item.label}
                labelEn={item.labelEn}
                slug={item.slug}
                items={item.items}
              />
            ))}
        </div>
      )}
    </>
  );
};

export default NavOverlay;
