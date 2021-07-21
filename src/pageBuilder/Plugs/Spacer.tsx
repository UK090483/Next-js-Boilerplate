import React from 'react';

import classNames from 'classnames';

export const seoHeaderPlugQuery = ` 
_type == "spacer" => {
  _type,
 size,
}
`;
export type SpacerPlugResult = {
  _type: 'spacer';
  _key: string;
  space: 's' | 'm' | 'l' | 'xl' | 'xxl';
};

const SpacerPlug: React.FC<SpacerPlugResult> = (props) => {
  const { space } = props;

  return (
    <div
      className={classNames(
        { 'pb-10': space === 's' },
        { 'pb-20': space === 'm' },
        { 'pb-32': space === 'l' },
        { 'pb-44': space === 'xl' },
        { 'pb-60': space === 'xxl' }
      )}
    />
  );
};

export default SpacerPlug;
