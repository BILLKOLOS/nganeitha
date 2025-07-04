import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const NavbarWrapper = styled.nav`
  width: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  padding: 0.5rem 0;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  box-shadow: 0 2px 12px rgba(102, 126, 234, 0.08);
`;
const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
`;
const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 800;
  color: #fff;
  text-decoration: none;
  letter-spacing: 1px;
`;
const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;
const NavLink = styled(Link)`
  color: #fff;
  font-weight: 600;
  text-decoration: none;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  background: ${({ $active }) => $active ? 'rgba(255,255,255,0.15)' : 'transparent'};
  transition: background 0.2s;
  &:hover {
    background: rgba(255,255,255,0.12);
  }
`;
const Tagline = styled.div`
  font-size: 0.9rem;
  color: #e0e7ff;
  font-weight: 400;
  margin-top: -0.2rem;
  letter-spacing: 0.5px;
`;

const Navbar = () => {
  const location = useLocation();
  return (
    <NavbarWrapper>
      <NavContainer>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Logo to="/">Ngaindeithia Health and Wellness</Logo>
          <Tagline>Real Food, Beyond Nutrition</Tagline>
        </div>
        <NavLinks>
          <NavLink to="/" $active={location.pathname === '/'}>Home</NavLink>
          <NavLink to="/blog" $active={location.pathname.startsWith('/blog')}>Blog</NavLink>
          <NavLink to="/ebooks" $active={location.pathname.startsWith('/ebooks')}>Ebooks</NavLink>
          <NavLink to="/auth" $active={location.pathname.startsWith('/auth')}>Login / Signup</NavLink>
        </NavLinks>
      </NavContainer>
    </NavbarWrapper>
  );
};

export default Navbar; 