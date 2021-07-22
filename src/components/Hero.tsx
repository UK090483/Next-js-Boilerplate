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

      <motion.div
        initial="hidden"
        animate="visible"
        variants={list}
        className="absolute bottom-[20%] left-0  md:left-[15vw] w-full max-w-lg p-12 text-white bg-black md:bg-transparent bg-opacity-30"
      >
        {title && (
          <motion.h1 variants={item} className="text-3xl">
            {title}
          </motion.h1>
        )}
        {text && (
          <motion.p variants={item} className="pb-8 pr-20 text-lg opacity-50">
            {text}
          </motion.p>
        )}

        {btnText && (
          <motion.div variants={item}>
            <Button color="white" label={btnText} type="link" link="/" />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Hero;
