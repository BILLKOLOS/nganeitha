import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(50px); }
  to { opacity: 1; transform: translateY(0); }
`;
const floating = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
`;
const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;
const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const HeroSectionWrapper = styled.section`
  min-height: 100vh;
  background: linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c);
  background-size: 400% 400%;
  animation: ${gradientShift} 15s ease infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1;
  }
`;
const FloatingElements = styled.div`
  position: absolute;
  width: 100%; height: 100%;
  overflow: hidden;
  z-index: 1;
`;
const FloatingCircle = styled.div`
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
  animation: ${floating} 6s ease-in-out infinite;
  &:nth-child(1) { width: 100px; height: 100px; top: 20%; left: 10%; animation-delay: 0s; }
  &:nth-child(2) { width: 150px; height: 150px; top: 60%; right: 15%; animation-delay: 2s; }
  &:nth-child(3) { width: 80px; height: 80px; bottom: 20%; left: 20%; animation-delay: 4s; }
`;
const HeroContent = styled.div`
  text-align: center;
  color: white;
  z-index: 2;
  position: relative;
  animation: ${fadeInUp} 1.2s ease-out;
  max-width: 800px;
  padding: 0 20px;
`;
const HeroTitle = styled.h1`
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(45deg, #fff, #f0f8ff, #e6f3ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 4px 20px rgba(255,255,255,0.3);
`;
const HeroSubtitle = styled.p`
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  margin-bottom: 3rem;
  opacity: 0.95;
  line-height: 1.6;
  font-weight: 300;
`;
const CTAButton = styled.button`
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 18px 40px;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(102,126,234,0.4);
  animation: ${pulse} 2s infinite;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(102,126,234,0.6);
    animation: none;
  }
`;

const HeroSection = () => (
  <HeroSectionWrapper>
    <FloatingElements>
      <FloatingCircle />
      <FloatingCircle />
      <FloatingCircle />
    </FloatingElements>
    <HeroContent>
      <HeroTitle>Transform Your Wellness Journey</HeroTitle>
      <HeroSubtitle>
        Discover the power of natural healing with our premium wellness content, expert guidance, and transformative ebooks.
      </HeroSubtitle>
      <CTAButton>Start Your Journey</CTAButton>
    </HeroContent>
  </HeroSectionWrapper>
);

export default HeroSection; 