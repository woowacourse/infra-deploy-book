import React from 'react';
import Head from 'next/head';

const App = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="엘라의 항공사 웹사이트의 컴포넌트 접근성 높이기 미션" />
      <title>Ella's airline</title>
    </Head>
    <Component {...pageProps} />
  </>
);

export default App;
