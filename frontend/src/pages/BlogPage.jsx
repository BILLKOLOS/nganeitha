import React, { useState, useEffect } from 'react';
import FilterBar from '../components/FilterBar';
import BlogGridSection from '../sections/BlogGridSection';
import PaywallModal from '../components/PaywallModal';
import MpesaPaymentModal from '../components/MpesaPaymentModal';
import { getBlogs } from '../services/blogService';

const categories = ['All', 'Nutrition', 'Mindfulness', 'Herbal', 'Fitness', 'Wellness'];

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showPaywall, setShowPaywall] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mpesaOpen, setMpesaOpen] = useState(false);
  const [mpesaAmount, setMpesaAmount] = useState(0);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    setLoading(true);
    getBlogs()
      .then(data => {
        setBlogs(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredPosts = selectedCategory === 'All'
    ? blogs
    : blogs.filter(post => post.category === selectedCategory);

  const handleReadClick = (post) => {
    if (post.isPremium) {
      setSelectedArticle(post);
      setShowPaywall(true);
    } else {
      alert('Reading free article: ' + post.title);
    }
  };

  const handleMpesaPay = (amount) => {
    setMpesaAmount(amount);
    setShowPaywall(false);
    setMpesaOpen(true);
  };

  const handleSubscribe = () => {
    alert('Subscribing with plan: ' + selectedPlan);
    setShowPaywall(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', padding: '40px 20px' }}>
      <header style={{ textAlign: 'center', marginBottom: 60 }}>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, marginBottom: 16, background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Wellness Blog</h1>
        <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
          Discover expert insights, practical tips, and transformative knowledge for your Ngaindeithia Health and Wellness journey
        </p>
      </header>
      <FilterBar categories={categories} selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: 40 }}>Loading...</div>
      ) : error ? (
        <div style={{ color: 'red', textAlign: 'center', marginTop: 40 }}>{error}</div>
      ) : (
        <BlogGridSection posts={filteredPosts} onReadClick={handleReadClick} />
      )}
      <PaywallModal
        show={showPaywall}
        onClose={() => setShowPaywall(false)}
        selectedPlan={selectedPlan}
        setSelectedPlan={setSelectedPlan}
        onMpesaPay={handleMpesaPay}
        monthlyPrice={selectedArticle?.monthlyPrice || 0}
        yearlyPrice={selectedArticle?.yearlyPrice || 0}
      />
      <MpesaPaymentModal
        open={mpesaOpen}
        onClose={() => setMpesaOpen(false)}
        amount={mpesaAmount}
        onSuccess={() => setMpesaOpen(false)}
      />
    </div>
  );
};

export default BlogPage; 