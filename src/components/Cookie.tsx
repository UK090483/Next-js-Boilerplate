/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';

import { useRouter } from 'next/router';

const barAnim = {
  show: {
    y: '0%',
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  hide: {
    y: '100%',
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const CookieBar: React.FC = () => {
  const { locale } = useRouter();
  const message =
    'Wir nutzen Cookies um Ihr Erlebnis auf unserer Website angenehm zu gestalten und steig zu verbessen!';
  const message_en =
    'We use cookies to make your experience on our website pleasant and to improve it!';

  const hasMounted = useHasMounted();
  // const { accepted, declined, acceptCookies, declineCookies } = useCookie();

  if (!hasMounted || !message) return null;

  return (
    <div />
    // <AnimatePresence>
    //   {!accepted && !declined && (
    //     <m.div
    //       initial="hide"
    //       animate="show"
    //       exit="hide"
    //       variants={barAnim}
    //       role="dialog"
    //       aria-live="polite"
    //       className="fixed bottom-0 left-0 right-0 w-full p-2 bg-frida-white z-90 md:p-4 "
    //     >
    //       <div className="flex flex-wrap items-center justify-between md:flex-nowrap">
    //         <div className="flex  justify-between items-center  text-xs-fluid md:pr-frida_7%">
    //           <img src="/Cookie.png" alt="cookie" className="h-20" />

    //           <p className=" text-xs-fluid">
    //             {locale === 'en' ? message_en : message}
    //           </p>
    //         </div>

    //         <div className="flex items-center justify-between w-full md:w-60">
    //           <Button
    //             onClick={() => acceptCookies()}
    //             label={locale === 'en' ? 'Accept' : 'Einverstanden'}
    //             type="click"
    //             size="s"
    //           >
    //             Accept
    //           </Button>

    //           <Icon
    //             onClick={() => declineCookies()}
    //             icon="x"
    //             size="s"
    //             color="pink"
    //             className="border-3 border-frida-pink"
    //           />
    //         </div>
    //       </div>
    //     </m.div>
    //   )}
    // </AnimatePresence>
  );
};

export default React.memo(CookieBar);
