import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(50px); }
  to { opacity: 1; transform: translateY(0); }
`;

const StatsSectionWrapper = styled.section`
  padding: 100px 20px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
`;
const SectionTitle = styled.h2`
  text-align: center;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  margin-bottom: 60px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;
const StatItem = styled.div`
  animation: ${fadeInUp} 1s ease-out;
`;
const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 10px;
`;
const StatLabel = styled.div`
  font-size: 1.1rem;
  opacity: 0.9;
  font-weight: 300;
`;

const StatsSection = () => (
  <StatsSectionWrapper>
    <SectionTitle style={{ color: 'white' }}>Join Our Growing Community</SectionTitle>
    <StatsGrid>
      <StatItem>
        <StatNumber>10,000+</StatNumber>
        <StatLabel>Happy Members</StatLabel>
      </StatItem>
      <StatItem>
        <StatNumber>500+</StatNumber>
        <StatLabel>Premium Articles</StatLabel>
      </StatItem>
      <StatItem>
        <StatNumber>50+</StatNumber>
        <StatLabel>Expert Ebooks</StatLabel>
      </StatItem>
      <StatItem>
        <StatNumber>99%</StatNumber>
        <StatLabel>Satisfaction Rate</StatLabel>
      </StatItem>
    </StatsGrid>
  </StatsSectionWrapper>
);

export default StatsSection; 