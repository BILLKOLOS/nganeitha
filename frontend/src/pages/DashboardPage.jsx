import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProfileEditModal from '../components/ProfileEditModal';
import { toast } from 'react-toastify';
import { updateProfile } from '../services/authService';
import { getPurchaseHistory, getSubscription, updateSubscription } from '../services/userService';
import { FaUserCircle, FaEdit, FaBookOpen, FaBook, FaSignOutAlt, FaSyncAlt } from 'react-icons/fa';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  max-width: 500px;
  margin: 48px auto 0 auto;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 32px #764ba222;
  padding: 32px 20px 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  @media (max-width: 600px) {
    padding: 18px 4px 12px 4px;
    margin: 16px 4px 0 4px;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const Avatar = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 2.8rem;
  margin-bottom: 4px;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: #f3f4fa;
  color: #764ba2;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover { background: #e0e7ff; }
`;

const Section = styled.div`
  background: #fafaff;
  border-radius: 10px;
  padding: 18px 14px;
  box-shadow: 0 1px 8px #764ba208;
  margin-bottom: 8px;
`;

const SectionTitle = styled.h3`
  margin: 0 0 10px 0;
  color: #764ba2;
  font-size: 1.15rem;
  font-weight: 700;
`;

const LogoutButton = styled.button`
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 24px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DashboardPage = () => {
  const { user, logout, login: contextLogin, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [purchases, setPurchases] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subLoading, setSubLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleProfileSubmit = async (form) => {
    setProfileLoading(true);
    try {
      const res = await updateProfile(form, token);
      contextLogin(res.user, token);
      toast.success('Profile updated!');
      setProfileModalOpen(false);
    } catch (err) {
      toast.error(err.message);
    }
    setProfileLoading(false);
  };

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    Promise.all([
      getPurchaseHistory(token),
      getSubscription(token)
    ])
      .then(([p, s]) => {
        setPurchases(p);
        setSubscription(s);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [token]);

  const handleSubscriptionChange = async (plan) => {
    setSubLoading(true);
    try {
      const res = await updateSubscription({ status: 'active', plan }, token);
      setSubscription(res);
      toast.success('Subscription updated!');
    } catch (err) {
      toast.error(err.message);
    }
    setSubLoading(false);
  };

  return (
    <DashboardContainer>
      <Header>
        <Avatar><FaUserCircle /></Avatar>
        <h2 style={{ margin: 0, fontWeight: 800, color: '#333', fontSize: '1.6rem' }}>
          Welcome, {user?.name || 'User'}!
        </h2>
      </Header>
      <Actions>
        <ActionButton onClick={() => setProfileModalOpen(true)}><FaEdit /> Edit Profile</ActionButton>
        <ActionButton onClick={() => navigate('/blogs')}><FaBookOpen /> Go to Blogs</ActionButton>
        <ActionButton onClick={() => navigate('/ebooks')}><FaBook /> Go to Ebooks</ActionButton>
      </Actions>
      <Section>
        <SectionTitle>Subscription</SectionTitle>
        {loading ? (
          <div style={{ margin: '16px 0', textAlign: 'center' }}>Loading...</div>
        ) : error ? (
          <div style={{ color: 'red', margin: '16px 0', textAlign: 'center' }}>{error}</div>
        ) : (
          <>
            <b>Status:</b> <span style={{ color: subscription?.status === 'active' ? '#667eea' : '#aaa', fontWeight: 600 }}>{subscription?.status || 'inactive'}</span>
            <ActionButton style={{ marginLeft: 16, marginTop: 8 }} onClick={() => handleSubscriptionChange(subscription?.plan === 'monthly' ? 'yearly' : 'monthly')} disabled={subLoading}>
              <FaSyncAlt /> {subLoading ? 'Updating...' : `Switch to ${subscription?.plan === 'monthly' ? 'Yearly' : 'Monthly'}`}
            </ActionButton>
          </>
        )}
      </Section>
      <Section>
        <SectionTitle>Purchase History</SectionTitle>
        {loading ? (
          <div style={{ margin: '16px 0', textAlign: 'center' }}>Loading...</div>
        ) : (
          <ul style={{ marginTop: 8, color: '#555', paddingLeft: 18 }}>
            {purchases.length === 0 ? <li>No purchases yet.</li> : purchases.map(p => (
              <li key={p._id} style={{ marginBottom: 6 }}>
                <b>{p.title}</b> ({p.itemType}) - ${p.price} <span style={{ color: '#aaa', fontSize: 12 }}>on {new Date(p.date).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        )}
      </Section>
      <LogoutButton onClick={handleLogout}><FaSignOutAlt /> Logout</LogoutButton>
      <ProfileEditModal open={profileModalOpen} onClose={() => setProfileModalOpen(false)} onSubmit={handleProfileSubmit} initialData={user} loading={profileLoading} />
    </DashboardContainer>
  );
};

export default DashboardPage; 