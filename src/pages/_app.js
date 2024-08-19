import '@/styles/globals.css';
import { DefaultSeo, NextSeo } from 'next-seo';
import { publicRuntimeConfig } from 'next.config';
import posthog from 'posthog-js';
import { useEffect } from 'react';
import { Userpilot } from 'userpilot';

Userpilot.initialize('NX-b34a07ee');

posthog.init('phc_bAZ7MNaUGk1hM3jeEujkgsI55N4VNAk8TsNNVzWUH5H', {
  api_host: 'https://us.i.posthog.com',
  person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
});

export default function App({ Component, pageProps }) {
  useEffect(() => {
    import('preline');
  }, []);

  return (
    <>
      <NextSeo
        description={publicRuntimeConfig.description}
        themeColor={publicRuntimeConfig.app_theme_color}
      />

      <DefaultSeo
        openGraph={{
          type: 'application',
          locale: publicRuntimeConfig.app_locale,
          url: publicRuntimeConfig.app_url,
          siteName:
            publicRuntimeConfig.app_name +
            ' — ' +
            publicRuntimeConfig.app_short_description,
          images: [
            { url: publicRuntimeConfig.app_url + '/linksnatch-cover.png' },
          ],
        }}
        twitter={{
          handle: publicRuntimeConfig.app_creator,
          site: publicRuntimeConfig.app_creator,
          creator: publicRuntimeConfig.app_creator,
          cardType: 'summary_large_image',
        }}
      />

      <Component {...pageProps} />
    </>
  );
}
