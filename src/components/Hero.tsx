import * as React from 'react';

import classNames from 'classnames';

import type { HeroBlockProps } from '@src/pageBuilder/Blocks/HeroBlock';

import Button from './buttons/button';
import Photo from './Photo';

const Hero: React.FunctionComponent<HeroBlockProps> = (props) => {
  const { photo, text, title, btnText, size } = props;

  return (
    <div
      className={classNames(
        'relative w-full ',
        {
          'h-screen': size === 'full' || !size,
        },
        { 'h-[50vh]': size === '1/2' },
        { 'h-[33vh]': size === '1/3' },
        { 'h-[66vh]': size === '2/3' }
      )}
    >
      <Photo photo={photo} layout="fill" />
      <div className="absolute top-0 bottom-0 flex items-end justify-center w-full bg-white bg-opacity-0 md:w-2/5 ">
        <div className="px-12 text-white pb-28">
          {title && <h1 className="text-3xl">{title}</h1>}
          {text && <p className="pb-8 pr-20 text-lg opacity-50">{text}</p>}

          {btnText && (
            <Button color="white" label={btnText} type="link" link="/" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
