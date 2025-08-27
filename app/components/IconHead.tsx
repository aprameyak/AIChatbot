import Head from 'next/head';

export const IconHead = () => {
  const iconUrl = '/icon.svg';
  const timestamp = Date.now(); // Cache busting
  
  return (
    <Head>
      <link rel="icon" href={`${iconUrl}?v=${timestamp}`} />
      <link rel="shortcut icon" href={`${iconUrl}?v=${timestamp}`} />
      <link rel="apple-touch-icon" href={`${iconUrl}?v=${timestamp}`} />
      <link rel="icon" type="image/svg+xml" href={`${iconUrl}?v=${timestamp}`} />
    </Head>
  );
};
