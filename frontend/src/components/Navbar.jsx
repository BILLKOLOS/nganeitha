import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';

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
  @media (max-width: 768px) {
    position: fixed;
    top: 70px;
    right: 0;
    background: linear-gradient(90deg, #667eea, #764ba2);
    flex-direction: column;
    width: 200px;
    height: calc(100vh - 70px);
    padding: 2rem 1rem;
    gap: 1.5rem;
    transform: ${({ $open }) => $open ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 0.3s ease;
    box-shadow: -2px 0 8px rgba(102, 126, 234, 0.08);
    z-index: 200;
  }
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
const Hamburger = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
    font-size: 2rem;
    color: #fff;
    cursor: pointer;
    z-index: 201;
  }
`;

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenuToggle = () => setMenuOpen((open) => !open);
  const handleLinkClick = () => setMenuOpen(false);
  return (
    <NavbarWrapper>
      <NavContainer>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Logo to="/">Ngaindeithia Health and Wellness</Logo>
          <Tagline>Real Food, Beyond Nutrition</Tagline>
        </div>
        <Hamburger onClick={handleMenuToggle}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </Hamburger>
        <NavLinks $open={menuOpen}>
          <NavLink to="/" $active={location.pathname === '/'} onClick={handleLinkClick}>Home</NavLink>
          <NavLink to="/blog" $active={location.pathname.startsWith('/blog')} onClick={handleLinkClick}>Blog</NavLink>
          <NavLink to="/ebooks" $active={location.pathname.startsWith('/ebooks')} onClick={handleLinkClick}>Ebooks</NavLink>
          <NavLink to="/auth" $active={location.pathname.startsWith('/auth')} onClick={handleLinkClick}>Login / Signup</NavLink>
        </NavLinks>
      </NavContainer>
    </NavbarWrapper>
  );
};

export default Navbar; 