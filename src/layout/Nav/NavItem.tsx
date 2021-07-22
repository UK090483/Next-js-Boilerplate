import * as React from 'react';

import Link from 'next/link';
import Popup from 'reactjs-popup';

import { NavigationItem } from '@lib/queries/siteQuery';

interface NavItemProps extends NavigationItem {
  className?: string;
}

const NavItem: React.FC<NavItemProps> = (props) => {
  const { items, label, slug, className: extraClassNames } = props;

  const className = `px-6 text-xl ${extraClassNames}`;

  if (!items) {
    return (
      <Link href={`/${slug || ''}`} passHref>
        <a className={className}>{label}</a>
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
      on={['hover', 'focus']}
    >
      <div className="flex flex-col bg-white">
        {items.map((i) => (
          <Link key={i.key} href={`/${i.slug || ''}`} passHref>
            <a className={className}>{i.label}</a>
          </Link>
        ))}
      </div>
    </Popup>
  );
};

export default React.memo(NavItem);
