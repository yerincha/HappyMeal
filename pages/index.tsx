import React from 'react';
import AppFooter from '../src/modules/views/AppFooter';
import ProductHero from '../src/modules/views/ProductHero';
import AppAppBar from '../src/modules/views/AppAppBar';
import withRoot from '../src/modules/withRoot';

function Home() {
  return (
    <div className='EpiCare'>
      <React.Fragment>
          <AppAppBar />
          <ProductHero />
          <AppFooter />
      </React.Fragment>
    </div>
  );
}

export default withRoot(Home);
