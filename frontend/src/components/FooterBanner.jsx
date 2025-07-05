import React from 'react';

const bannerUrl = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80';

const FooterBanner = () => (
  <div style={{ width: '100%', height: '80px', overflow: 'hidden', position: 'fixed', bottom: 0, left: 0, zIndex: 99 }}>
    <img
      src={bannerUrl}
      alt="Footer Banner"
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
    />
  </div>
);

export default FooterBanner; 