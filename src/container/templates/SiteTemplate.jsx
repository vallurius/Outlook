import React from 'react';

import Header from 'components/Header';
import Footer from 'components/Footer';

function SiteTemplate({children}) {
  return (
    <div className="container">
      <Header />
      <div className="app-container">{children}</div>
      <Footer />
    </div>
  );
}

export default SiteTemplate;
