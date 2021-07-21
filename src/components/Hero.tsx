import * as React from 'react';

import { ImageMetaResult } from '@lib/queries/snippets';

import Button from './buttons/button';
import Photo from './Photo';

interface IHeroProps {
  photo?: ImageMetaResult;
}

const Hero: React.FunctionComponent<IHeroProps> = (props) => {
  const { photo } = props;

  return (
    <div className="relative w-full h-screen">
      <Photo photo={photo} layout="fill" />
      <div className="absolute top-0 bottom-0 flex items-end justify-center w-2/5 pl-48 bg-opacity-0 bg-main ">
        <div className="px-12 pb-56 text-white">
          <h1 className="text-5xl font-bold">Hanne Rønn</h1>
          <p className="pb-8 text-lg text-gray-200">
            Gennem psykoterapi hjælper jeg dig med at skabe et bedre forhold til
            dig selv, din partner, familie og andre vigtige personer i dit liv.
          </p>

          <Button color="white" label="LÆS MERE" type="link" link="/" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
