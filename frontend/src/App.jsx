import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import EbookPage from './pages/EbookPage';
import AuthPage from './pages/AuthPage';
import AdminPage from './pages/AdminPage';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import HeaderBanner from './components/HeaderBanner';
import FooterBanner from './components/FooterBanner';

const App = () => {
  const { user } = useContext(AuthContext);
  const isAdmin = user && user.isAdmin;
  return (
    <Router>
      <HeaderBanner />
      <Navbar />
      <div style={{ paddingTop: '150px', paddingBottom: '100px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/ebooks" element={<EbookPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/admin" element={isAdmin ? <AdminPage /> : user ? <DashboardPage /> : <AuthPage />} />
          <Route path="/dashboard" element={user ? <DashboardPage /> : <AuthPage />} />
        </Routes>
      </div>
      <FooterBanner />
    </Router>
  );
};

export default App; 