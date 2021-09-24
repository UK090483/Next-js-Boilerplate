/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import Popup from 'reactjs-popup';
import { PopupActions } from 'reactjs-popup/dist/types';

import { NavigationItem } from '@lib/queries/siteQuery';
import { useMenu } from '@lib/store';

interface NavItemProps extends NavigationItem {
  className?: string;
}

const NavItem: React.FC<NavItemProps> = (props) => {
  const { items, label, slug, className: extraClassNames } = props;
  const { asPath } = useRouter();
  const isActive = slug
    ? asPath === `/${slug}/`
    : !!(items && items.find((i) => `/${i.slug}/` === asPath));

  const { isOpen, toggle } = useMenu();
  const ref = React.useRef<PopupActions | null>();

  const closeIfOpen = () => {
    if (isOpen) {
      toggle();
    }
    if (ref.current) {
      ref.current.close();
    }
  };

  const underlineClass = `customUnderline ${
    isActive ? 'customUnderline--active' : ''
  }`;

  const className = `px-6 py-3 text-lg font-semibold ${extraClassNames || ''}`;

  if (!items) {
    return (
      <Link href={`/${slug || ''}`} passHref>
        <a onClick={closeIfOpen} className={`${underlineClass} ${className}`}>
          {label}
        </a>
      </Link>
    );
  }
  return (
    <Popup
      ref={ref as React.Ref<PopupActions> | undefined}
      trigger={
        <button className={`${underlineClass} ${className}`} type="button">
          {label}
        </button>
      }
      position="bottom center"
      on={['click', 'hover']}
    >
      <div className="flex flex-col bg-white rounded-lg">
        {items.map((i) => {
          const active = asPath === `/${i.slug}/`;
          return (
            <Link key={i.key} href={`/${i.slug || ''}`} passHref>
              <a
                onClick={closeIfOpen}
                className={`py-6 text-lg hover:bg-black hover:text-white transition-colors ${
                  active ? 'bg-black text-white' : 'bg-white text-black'
                } ${className}`}
              >
                {i.label}
              </a>
            </Link>
          );
        })}
      </div>
    </Popup>
  );
};

export default React.memo(NavItem);
