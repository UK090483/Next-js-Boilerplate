/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import cx from 'classnames';
import Link from 'next/link';

import { AppColor } from 'types';

interface ButtonProps {
  label: string;
  color?: AppColor;
  backgroundColor?: AppColor;
  testid?: string;
  className?: string;
  size?: 's' | 'm' | 'l';
  position?: 'inline' | 'left' | 'right' | 'center' | 'auto';
}
interface LinkProps extends ButtonProps {
  type: 'link' | 'externalLink';
  link: string;
  download?: boolean;
}
interface ClickProps extends ButtonProps {
  type: 'click';
  onClick: () => void;
}

const Button: React.FC<LinkProps | ClickProps> = (props) => {
  const {
    label = 'no label',
    color = 'black',
    backgroundColor = 'white',
    className: extraClasses = '',
    position = 'inline',
    size = 'm',
  } = props;

  const className = cx(
    'border-2 inline-block font-bold transition-colors rounded-sm ',
    { 'mr-6': position === 'inline' },
    { 'block mb-2 w-fit-content': position === 'left' },
    { 'block ml-auto mb-2 w-fit-content': position === 'right' },
    { 'block mx-auto mb-2 w-fit-content': position === 'center' },
    { 'is-large': size === 'l' },
    { 'px-6 py-4': size === 'm' },
    { 'is-small': size === 's' },

    {
      'text-black border-black hover:bg-black ': color === 'black',
    },

    {
      'text-white border-white hover:bg-white  hover:text-main':
        color === 'white',
    },

    { 'hover:text-black': backgroundColor === 'black' },

    { '': backgroundColor === 'white' }
  );

  // return (
  //   <div className="text-5xl font-extrabold">
  //     <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
  //       Hello world
  //     </span>
  //   </div>
  // );

  if (props.type === 'link') {
    return (
      <Link href={props.link} passHref>
        <a
          {...(props.download === true ? { download: true } : {})}
          className={` ${className} ${extraClasses}`}
        >
          {label}
        </a>
      </Link>
    );
  }

  if (props.type === 'externalLink') {
    return (
      <a
        rel="noreferrer"
        target="_blank"
        style={{ cursor: 'none' }}
        className={` ${className} ${extraClasses}`}
        href={props.link}
      >
        {label}
      </a>
    );
  }

  if (props.type === 'click') {
    return (
      <button
        type="button"
        style={{ cursor: 'none' }}
        className={` ${className} ${extraClasses}`}
        onClick={() => {
          props.onClick();
        }}
      >
        {label}
      </button>
    );
  }

  return <></>;
};

export default Button;
