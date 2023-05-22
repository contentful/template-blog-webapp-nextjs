import * as Sentry from '@sentry/browser';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useCallback, useEffect, useState } from 'react';

import { useContentfulEditorialStore, useCtfConsent } from '@src/_ctf-private';
import typewriter from 'analytics';

export const CtfSegmentAnalytics = () => {
  const router = useRouter();

  const [initialized, setInitialized] = useState(false);
  const [initialPageViewFired, setInitialPageViewFired] = useState(false);

  const { preview, space_id, preview_token, delivery_token } = useContentfulEditorialStore();
  const guestSpaceActive = !!space_id && !!preview_token && !!delivery_token;

  const { data } = useCtfConsent();

  data?.on('initialized', () => {
    setInitialized(true);
  });

  const handleRouteChange = useCallback(() => {
    if (initialized && analytics) {
      analytics?.page({
        templateId: 'blog',
        previewActive: preview,
        guestSpaceActive,
      });
    }
  }, [guestSpaceActive, initialized, preview]);

  useEffect(() => {
    if (guestSpaceActive && initialized) {
      typewriter.guestSpaceActive({ spaceId: space_id });
    }
  }, [guestSpaceActive, initialized, space_id]);

  useEffect(() => {
    if (initialized && !initialPageViewFired) {
      handleRouteChange();
      setInitialPageViewFired(true);
    }
  }, [initialized, initialPageViewFired, handleRouteChange]);

  useEffect(() => {
    typewriter.setTypewriterOptions({
      onViolation: (payload, violations) => {
        if (process.env.ENVIRONMENT_NAME === 'local') {
          console.error(`Typewriter violation(s) found: `, violations);
        }

        if (process.env.ENVIRONMENT_NAME !== 'local') {
          Sentry.captureMessage('Typewriter violation(s) found', {
            level: 'error',
            tags: {
              source: 'Segment',
            },
            extra: {
              violations: violations,
            },
          });
        }
      },
    });

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [handleRouteChange, router.events]);

  return initialized ? (
    <Script id="segment-tracking-script">
      {`
        !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics._writeKey="${process.env.NEXT_PUBLIC_SEGMENT_WRITEKEY}";;analytics.SNIPPET_VERSION="4.15.3";
        analytics.load("${process.env.NEXT_PUBLIC_SEGMENT_WRITEKEY}");
        }}();
      `}
    </Script>
  ) : null;
};
