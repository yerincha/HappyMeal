import React from 'react';
import AppFooter from '../src/modules/views/AppFooter';
import ProductHero from '../src/modules/views/ProductHero';
import withRoot from '../src/modules/withRoot';
import AppAppBar from '../src/modules/views/AppAppBar';

function Home() {
  return (
    <>
      <AppAppBar />
      <ProductHero />
      <AppFooter />
    </>
  );
}

export default withRoot(Home);
