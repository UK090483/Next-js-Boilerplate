import * as React from 'react';

import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import Link from 'next/link';

import { PageResult } from '@src/pageTypes/page/pageQueries';

import { useMenu } from '../../../lib/store';
import Icon from '../../Icon';
import NavBar from './NavBar';
import NavItem from './NavItem';
import NavOverlay from './NavOverlay';

interface INavProps extends PageResult {}

const Nav: React.FunctionComponent<INavProps> = (props) => {
  const items = props.site?.navigation?.main;
  const isWhite = props.pageHeader?.color === 'white';
  const [scrolled, setScrolled] = React.useState(false);

  const showLogo = !props.pageHeader?.withOutLogo || scrolled;

  useScrollPosition(
    ({ currPos }) => {
      const isShow = currPos.y < -600;
      if (isShow !== scrolled) setScrolled(isShow);
    },
    [scrolled]
  );

  const { toggle } = useMenu();

  return (
    <>
      <NavOverlay items={items} />

      <NavBar isWhite={isWhite}>
        {showLogo ? (
          <Link href="/" passHref>
            <a className="text-2xl font-bold md:text-3xl whitespace-nowrap">
              Konrad Ullrich
            </a>
          </Link>
        ) : (
          <div />
        )}

        <div className="lg:hidden">
          <Icon
            icon="menu"
            size="m"
            onClick={toggle}
            className=" top-app_side_small right-app_side_small"
          />
        </div>
        <div className="hidden lg:block">
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
      </NavBar>
    </>
  );
};

export default Nav;
