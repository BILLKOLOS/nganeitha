import React, { useState, useEffect } from 'react';
import FilterSection from '../components/FilterSection';
import EbookGridSection from '../sections/EbookGridSection';
import { getEbooks } from '../services/ebookService';
import MpesaPaymentModal from '../components/MpesaPaymentModal';

const categories = ['All', 'Nutrition', 'Mindfulness', 'Herbal', 'Fitness', 'Wellness'];

const EbookPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mpesaOpen, setMpesaOpen] = useState(false);
  const [selectedEbook, setSelectedEbook] = useState(null);

  useEffect(() => {
    setLoading(true);
    getEbooks()
      .then(data => {
        setEbooks(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredEbooks = selectedCategory === 'All'
    ? ebooks
    : ebooks.filter(ebook => ebook.category === selectedCategory);

  const handlePreview = (ebook) => {
    alert('Previewing: ' + ebook.title);
  };

  const handleBuy = (ebook) => {
    setSelectedEbook(ebook);
    setMpesaOpen(true);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #667eea 100%)', position: 'relative', overflow: 'hidden', padding: '60px 20px' }}>
      <header style={{ textAlign: 'center', marginBottom: 80 }}>
        <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 900, marginBottom: '1.5rem', color: 'white', textShadow: '0 4px 20px rgba(0,0,0,0.3)', background: 'linear-gradient(45deg, #fff, #e0e7ff, #c7d2fe)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Ebooks Library</h1>
        <p style={{ fontSize: '1.4rem', color: 'rgba(255,255,255,0.9)', maxWidth: 700, margin: '0 auto', lineHeight: 1.6, fontWeight: 300 }}>
          Explore our curated collection of expert-written ebooks to support your Ngaindeithia Health and Wellness journey.
        </p>
      </header>
      <FilterSection categories={categories} selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: 40, color: '#fff' }}>Loading...</div>
      ) : error ? (
        <div style={{ color: 'red', textAlign: 'center', marginTop: 40 }}>{error}</div>
      ) : (
        <EbookGridSection ebooks={filteredEbooks} onPreview={handlePreview} onBuy={handleBuy} />
      )}
      <MpesaPaymentModal
        open={mpesaOpen}
        onClose={() => setMpesaOpen(false)}
        amount={selectedEbook?.price}
        onSuccess={() => setMpesaOpen(false)}
      />
    </div>
  );
};

export default EbookPage; 