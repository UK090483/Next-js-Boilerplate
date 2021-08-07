import * as React from 'react';

import Icon from '@components/Icon';
import Section from '@components/Section';
import { PageResult } from '@src/pageTypes/page/pageQueries';

interface IFooterProps extends PageResult {}

const Footer: React.FunctionComponent<IFooterProps> = (props) => {
  const config = props.site?.config;

  return (
    <div className="w-full text-white bg-gray-800 text-mlg ">
      <Section type="text">
        <div className="flex flex-wrap py-24 md:flex-nowrap">
          <div className="w-full ">
            <p className="pb-6 font-bold">Kontakt</p>
            <div className="flex items-center pb-6">
              <Icon size="s" icon="phone" className="mr-6" />
              {config?.kontaktTel || ' '}
            </div>

            <div className="flex items-center pb-6">
              <Icon size="s" icon="email" className="mr-6" />{' '}
              {config?.kontaktMail || ' '}
            </div>
            <div className="flex items-center pb-6 whitespace-pre">
              <Icon size="s" icon="map" className="mr-6" />{' '}
              {config?.kontaktAdress || ' '}
            </div>
          </div>
          <div className="w-full">
            <Icon size="l" icon="facebook" />
          </div>
        </div>
      </Section>

      <Section className="pb-6 text-center ">
        © 2018 {config?.url || ' '} All rights reserved.
        {config?.cvr && <p className="text-mlg">CVR: {config.cvr}</p>}
      </Section>
    </div>
  );
};

export default Footer;
