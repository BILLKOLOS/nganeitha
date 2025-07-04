import React, { useState, useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import AuthTabs from '../components/AuthTabs';
import AuthForm from '../components/AuthForm';
import { signup, login } from '../services/authService';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const slideInFromLeft = keyframes`
  from { opacity: 0; transform: translateX(-100px); }
  to { opacity: 1; transform: translateX(0); }
`;
const slideInFromRight = keyframes`
  from { opacity: 0; transform: translateX(100px); }
  to { opacity: 1; transform: translateX(0); }
`;
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="%23ffffff" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
  }
`;
const LeftPanel = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  position: relative;
  z-index: 2;
  @media (max-width: 768px) { display: none; }
`;
const RightPanel = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  position: relative;
  z-index: 2;
  @media (max-width: 768px) { flex: none; width: 100%; }
`;
const WelcomeContent = styled.div`
  text-align: center;
  color: white;
  animation: ${slideInFromLeft} 1s ease-out;
`;
const WelcomeTitle = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(45deg, #fff, #f0f8ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;
const WelcomeSubtitle = styled.p`
  font-size: 1.3rem;
  opacity: 0.9;
  line-height: 1.6;
  max-width: 400px;
  margin: 0 auto;
`;
const FloatingIcon = styled.div`
  position: absolute;
  animation: ${float} 3s ease-in-out infinite;
  font-size: 2rem;
  opacity: 0.7;
  &:nth-child(1) { top: 10%; left: 10%; animation-delay: 0s; }
  &:nth-child(2) { top: 20%; right: 15%; animation-delay: 1s; }
  &:nth-child(3) { bottom: 30%; left: 20%; animation-delay: 2s; }
`;
const AuthContainer = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 40px;
  animation: ${slideInFromRight} 1s ease-out;
`;

const AuthSection = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '', fullName: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login: contextLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!isLogin) {
      if (!formData.fullName) newErrors.fullName = 'Full name is required';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    if (validateForm()) {
      setLoading(true);
      try {
        let res;
        if (isLogin) {
          res = await login({ email: formData.email, password: formData.password });
        } else {
          res = await signup({ fullName: formData.fullName, email: formData.email, password: formData.password });
        }
        contextLogin(res.user, res.token);
        setLoading(false);
        toast.success(isLogin ? 'Login successful!' : 'Signup successful!');
        if (res.user.isAdmin) {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } catch (err) {
        setApiError(err.message);
        setLoading(false);
        toast.error(err.message);
      }
    }
  };

  return (
    <Container>
      <LeftPanel>
        <WelcomeContent>
          <WelcomeTitle>Welcome to Ngaindeithia Health and Wellness</WelcomeTitle>
          <WelcomeSubtitle>
            Sign up or sign in to access premium wellness content, ebooks, and more.
          </WelcomeSubtitle>
        </WelcomeContent>
        <FloatingIcon style={{ left: '10%', top: '10%' }}>🌱</FloatingIcon>
        <FloatingIcon style={{ right: '15%', top: '20%' }}>🧘‍♂️</FloatingIcon>
        <FloatingIcon style={{ left: '20%', bottom: '30%' }}>🌞</FloatingIcon>
      </LeftPanel>
      <RightPanel>
        <AuthContainer>
          <AuthTabs isLogin={isLogin} setIsLogin={setIsLogin} />
          {apiError && <div style={{ color: '#e74c3c', marginBottom: 10 }}>{apiError}</div>}
          <AuthForm
            isLogin={isLogin}
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            onSubmit={handleSubmit}
            onInputChange={handleInputChange}
          />
          {loading && <div style={{ textAlign: 'center', marginTop: 10 }}>Loading...</div>}
        </AuthContainer>
      </RightPanel>
    </Container>
  );
};

export default AuthSection; 