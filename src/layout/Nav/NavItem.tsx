/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import Popup from 'reactjs-popup';

import { NavigationItem } from '@lib/queries/siteQuery';
import { useMenu } from '@lib/store';

interface NavItemProps extends NavigationItem {
  className?: string;
}

const NavItem: React.FC<NavItemProps> = (props) => {
  const { items, label, slug, className: extraClassNames } = props;
  const { asPath } = useRouter();
  const isActive = asPath === `/${slug}/`;
  const { isOpen, toggle } = useMenu();
  const closeIfOpen = () => {
    if (isOpen) {
      toggle();
    }
  };
  const underlineClass = `customUnderline ${
    isActive ? 'customUnderline--active' : ''
  }`;

  const className = `px-6 py-3 text-xl  ${extraClassNames || ''}`;

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
      trigger={
        <button id="testId" className={className} type="button">
          {label}
        </button>
      }
      position="bottom center"
      on={['hover', 'focus', 'click']}
    >
      <div className="flex flex-col bg-white rounded-sm">
        {items.map((i) => (
          <Link key={i.key} href={`/${i.slug || ''}`} passHref>
            <a
              onClick={closeIfOpen}
              className={`py-6 mx-3 ${underlineClass} ${className}`}
            >
              {i.label}
            </a>
          </Link>
        ))}
      </div>
    </Popup>
  );
};

export default React.memo(NavItem);
