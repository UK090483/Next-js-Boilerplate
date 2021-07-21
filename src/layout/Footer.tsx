import * as React from 'react';

import Icon from '@components/Icon';
import Section from '@components/Section';
import { PageResult } from '@src/pageTypes/page/pageQueries';

interface IFooterProps extends PageResult {}

const Footer: React.FunctionComponent<IFooterProps> = (props) => {
  const config = props.site?.config;

  return (
    <div className="w-full text-white bg-gray-800 ">
      <Section type="text">
        <div className="flex flex-wrap py-24 md:flex-nowrap">
          <div className="w-full ">
            <p>Kontakt</p>
            <div className="flex items-center">
              <Icon size="s" icon="phone" />
              {config?.kontaktTel || ' '}
            </div>

            <div className="flex items-center">
              <Icon size="s" icon="email" /> {config?.kontaktMail || ' '}
            </div>
            <div className="flex items-center whitespace-pre">
              <Icon size="s" icon="email" /> {config?.kontaktAdress || ' '}
            </div>
          </div>
          <div className="w-full">
            <Icon size="l" icon="facebook" />
          </div>
        </div>
      </Section>
      <div className="pb-6 text-center whitespace-pre">
        <p>© 2018 {config?.url || ' '} All rights reserved.</p>
        <p>CVR: 39251884</p>
      </div>

      <Section />
    </div>
  );
};

export default Footer;
