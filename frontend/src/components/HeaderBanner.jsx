import React from 'react';

const bannerUrl = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80';

const HeaderBanner = () => (
  <div style={{ width: '100%', height: '80px', overflow: 'hidden' }}>
    <img
      src={bannerUrl}
      alt="Header Banner"
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
    />
  </div>
);

export default HeaderBanner; 