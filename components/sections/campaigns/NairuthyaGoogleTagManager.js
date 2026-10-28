import Script from 'next/script';

export const GTM_CONTAINER_ID = 'GTM-KTWB6VSQ';

/**
 * Google Tag Manager Integration for Nairuthya Whispering Wood Campaign Landing Page
 * Container ID: GTM-KTWB6VSQ
 * Scoped strictly to route: /lp/nairuthya-whispering-wood
 *
 * Implements:
 * 1. Official Google Tag Manager JavaScript snippet injected via next/script.
 * 2. Official Google Tag Manager noscript iframe fallback.
 * 3. Preserves existing Meta Pixel tracking without duplication or conflict.
 * 4. Zero PII transmission.
 */
export default function NairuthyaGoogleTagManager() {
  return (
    <>
      {/* Official Google Tag Manager JavaScript snippet */}
      <Script
        id="google-tag-manager-nairuthya"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');`
        }}
      />
      {/* Official Google Tag Manager noscript fallback */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  );
}
