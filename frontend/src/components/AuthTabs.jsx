import React from 'react';
import styled from 'styled-components';

const AuthTabsWrapper = styled.div`
  display: flex;
  margin-bottom: 40px;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 50px;
  padding: 4px;
`;
const Tab = styled.button`
  flex: 1;
  padding: 12px 24px;
  border: none;
  background: ${props => props.active ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'transparent'};
  color: ${props => props.active ? 'white' : '#667eea'};
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }
  &:hover::before {
    left: 100%;
  }
`;

const AuthTabs = ({ isLogin, setIsLogin }) => (
  <AuthTabsWrapper>
    <Tab active={isLogin} onClick={() => setIsLogin(true)}>Sign In</Tab>
    <Tab active={!isLogin} onClick={() => setIsLogin(false)}>Sign Up</Tab>
  </AuthTabsWrapper>
);

export default AuthTabs; 