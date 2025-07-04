import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(50px); }
  to { opacity: 1; transform: translateY(0); }
`;

const FeaturesSectionWrapper = styled.section`
  padding: 100px 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  position: relative;
`;
const SectionTitle = styled.h2`
  text-align: center;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;
const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
`;
const FeatureCard = styled.div`
  background: white;
  padding: 40px 30px;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.1);
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 30px 80px rgba(0,0,0,0.15);
  }
`;
const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  position: relative;
  z-index: 1;
`;
const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: #333;
`;
const FeatureDescription = styled.p`
  color: #666;
  line-height: 1.6;
  font-size: 1rem;
`;

const FeaturesSection = () => (
  <FeaturesSectionWrapper>
    <SectionTitle>Why Choose Ngaindeithia Health and Wellness?</SectionTitle>
    <FeaturesGrid>
      <FeatureCard>
        <FeatureIcon>🌿</FeatureIcon>
        <FeatureTitle>Premium Blog Content</FeatureTitle>
        <FeatureDescription>
          Access exclusive wellness articles, tips, and insights from certified experts in natural health and holistic healing.
        </FeatureDescription>
      </FeatureCard>
      <FeatureCard>
        <FeatureIcon>📚</FeatureIcon>
        <FeatureTitle>Expert Ebooks</FeatureTitle>
        <FeatureDescription>
          Download comprehensive guides on nutrition, mindfulness, herbal remedies, and sustainable wellness practices.
        </FeatureDescription>
      </FeatureCard>
      <FeatureCard>
        <FeatureIcon>🎯</FeatureIcon>
        <FeatureTitle>Personalized Journey</FeatureTitle>
        <FeatureDescription>
          Get tailored recommendations based on your wellness goals and preferences for a truly personalized experience.
        </FeatureDescription>
      </FeatureCard>
    </FeaturesGrid>
  </FeaturesSectionWrapper>
);

export default FeaturesSection; 