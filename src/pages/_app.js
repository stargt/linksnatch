import '@/styles/globals.css';
import { AnalyticsBrowser, identify } from '@june-so/analytics-next';
import { DefaultSeo, NextSeo } from 'next-seo';
import { publicRuntimeConfig } from 'next.config';
import { useRouter } from 'next/router';
import posthog from 'posthog-js';
import { useEffect, useState } from 'react';
import { Userpilot } from 'userpilot';

Userpilot.initialize('NX-b34a07ee');

posthog.init('phc_bAZ7MNaUGk1hM3jeEujkgsI55N4VNAk8TsNNVzWUH5H', {
  api_host: 'https://us.i.posthog.com',
  person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
});

let analytics = AnalyticsBrowser.load({
  writeKey: 'wk-d4070aed462a49e1be1ad80973a9744c',
});

export function useJune(writeKey) {
  const [analytics, setAnalytics] = useState(undefined);

  useEffect(() => {
    const loadAnalytics = async () => {
      let response = AnalyticsBrowser.load({
        writeKey,
      });
      setAnalytics(response);
    };
    loadAnalytics();
  }, [writeKey]);

  return analytics;
}

export default function App({ Component, pageProps }) {
  useEffect(() => {
    import('preline');
  }, []);

  const analytics = useJune('wk-d4070aed462a49e1be1ad80973a9744c');
  const router = useRouter();

  // analytics.identify('USER_ID',{
  //   email: `test001+${new Date().getDate()}@measured.im`,
  // });

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      if (analytics) analytics.page(url);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [analytics]);

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
