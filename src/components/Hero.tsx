import * as React from 'react';

import classNames from 'classnames';
import { AnimationProps, motion } from 'framer-motion';

import type { HeroBlockProps } from '@src/pageBuilder/Blocks/HeroBlock';

import Button from './buttons/button';
import Photo from './Photo';

const list: AnimationProps['variants'] = {
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.3,
      when: 'beforeChildren',
      staggerChildren: 0.2,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
    },
  },
};

const item: AnimationProps['variants'] = {
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.6, type: 'spring', stiffness: 100 },
  },
  hidden: { opacity: 0, x: -100, y: 100 },
};

const Hero: React.FunctionComponent<HeroBlockProps> = (props) => {
  const {
    photo,
    text,
    title,
    btnText,
    btnLink,
    size,
    filterColor = 'white',
    filterIntensity = '0',
  } = props;

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
      <Photo photo={photo} layout="fill" maxWidth={1600} />
      {filterIntensity !== '0' && (
        <div
          className={classNames(
            'absolute inset-0  ',
            { 'bg-white': filterColor === 'white' },
            { 'bg-black': filterColor === 'black' },
            { 'bg-opacity-10': filterIntensity === '10' },
            { 'bg-opacity-20': filterIntensity === '20' },
            { 'bg-opacity-30': filterIntensity === '30' },
            { 'bg-opacity-40': filterIntensity === '40' },
            { 'bg-opacity-50': filterIntensity === '50' },
            { 'bg-opacity-60': filterIntensity === '60' },
            { 'bg-opacity-70': filterIntensity === '70' },
            { 'bg-opacity-80': filterIntensity === '80' },
            { 'bg-opacity-90': filterIntensity === '90' }
          )}
        />
      )}

      <motion.div
        initial="hidden"
        animate="visible"
        variants={list}
        className={classNames(
          'absolute top-10 left-0 w-full p-app_side_small md:top-32 md:left-32 text-white bg-opacity-30 max-w-xl',
          'lg:top-auto lg:bottom-[20%] lg:left-[10vw] lg:max-w-lg lg:p-2 lg:bg-transparent'
        )}
      >
        {title && (
          <motion.h1 className="mt-0" variants={item}>
            {' '}
            {title}{' '}
          </motion.h1>
        )}
        {text && (
          <motion.p variants={item} className="pb-8 pr-20 text-lg opacity-50">
            {text}
          </motion.p>
        )}

        {btnText && (
          <motion.div variants={item}>
            <Button
              color="white"
              label={btnText}
              type="link"
              link={btnLink || '/'}
            />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Hero;
