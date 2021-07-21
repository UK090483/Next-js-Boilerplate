import React from 'react';

import cx from 'classnames';

import { AppColor } from 'types';

type SectionProps = {
  type?: 'text' | 'full' | 'hero' | 'normal' | 'medium-wide' | null;
  backgroundColor?: AppColor;
  className?: string;
  bgImage?: any;
};

const Section: React.FC<SectionProps> = (props) => {
  const {
    children,

    type = 'normal',
    className = '',
    // bgImage,
  } = props;

  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <section
      className={cx(
        'relative',

        className
      )}
    >
      <div
        className={cx(
          'relative',
          'w-full',
          'mx-auto',
          {
            'px-app_side  ': type === 'normal',
          },
          {
            'px-app_side max-w-7xl ': type === 'medium-wide',
          },
          {
            'px-app_side  max-w-5xl md:px-5': type === 'text',
          },
          {
            'px-app_side mt-28': type === 'hero',
          }
        )}
      >
        {children}
      </div>
    </section>
  );
};

export default Section;
