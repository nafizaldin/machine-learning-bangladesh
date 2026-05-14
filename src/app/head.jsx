export default async function Head() {
  // Fetch GTM ID from backend (SSR)
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/gtm/all`,
    { cache: "no-store" }
  );

  const data = await res.json();
  const GTM_ID = data?.data?.gtmId || null;

  return (
    <>
      <title>Machine Learning Bangladesh</title>

      {/* GOOGLE TAG MANAGER (HEAD) */}
      {GTM_ID && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              (function(w,d,s,l,i){
                w[l]=w[l]||[];
                w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id=' + i + dl;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
      )}
    </>
  );
}
