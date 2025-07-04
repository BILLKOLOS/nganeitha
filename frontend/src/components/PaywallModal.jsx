import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;
const shimmer = keyframes`
  0% { background-position: -1200px 0; }
  100% { background-position: 1200px 0; }
`;
const slideUp = keyframes`
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const PaywallOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
`;
const PaywallModalWrapper = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  max-width: 500px;
  width: 90%;
  text-align: center;
  animation: ${slideUp} 0.4s ease-out;
  position: relative;
`;
const PaywallTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 15px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;
const PaywallDescription = styled.p`
  color: #666;
  margin-bottom: 30px;
  line-height: 1.6;
  font-size: 1.1rem;
`;
const PricingCards = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  @media (max-width: 480px) { flex-direction: column; }
`;
const PricingCard = styled.div`
  flex: 1;
  padding: 20px;
  border: 2px solid ${props => props.popular ? '#667eea' : '#eee'};
  border-radius: 15px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.selected ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'white'};
  color: ${props => props.selected ? 'white' : '#333'};
  &:hover {
    border-color: #667eea;
    transform: translateY(-3px);
  }
  ${props => props.popular && `
    &::before {
      content: 'Most Popular';
      position: absolute;
      top: -10px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #f093fb, #f5576c);
      color: white;
      padding: 5px 15px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
    }
  `}
`;
const PricingPrice = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 5px;
`;
const PricingPeriod = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: 15px;
`;
const PricingFeatures = styled.ul`
  list-style: none;
  padding: 0;
  font-size: 0.9rem;
  li {
    margin-bottom: 8px;
    &::before {
      content: '✓';
      color: ${props => props.selected ? 'white' : '#667eea'};
      font-weight: bold;
      margin-right: 8px;
    }
  }
`;
const PayButton = styled.button`
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
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
    animation: ${shimmer} 2s infinite;
  }
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
  }
`;
const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #999;
  &:hover { color: #333; }
`;

const PaywallModal = ({ show, onClose, selectedPlan, setSelectedPlan, onMpesaPay, monthlyPrice = 0, yearlyPrice = 0 }) => {
  if (!show) return null;
  return (
    <PaywallOverlay onClick={onClose}>
      <PaywallModalWrapper onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <PaywallTitle>Unlock Premium Content</PaywallTitle>
        <PaywallDescription>
          Get unlimited access to our premium wellness articles, expert guides, and exclusive content to accelerate your health journey.
        </PaywallDescription>
        <PricingCards>
          <PricingCard 
            selected={selectedPlan === 'monthly'}
            onClick={() => setSelectedPlan('monthly')}
          >
            <PricingPrice>KES {monthlyPrice}</PricingPrice>
            <PricingPeriod>per month</PricingPeriod>
            <PricingFeatures selected={selectedPlan === 'monthly'}>
              <li>All premium articles</li>
              <li>Expert guides</li>
              <li>Monthly newsletters</li>
            </PricingFeatures>
          </PricingCard>
          <PricingCard 
            popular
            selected={selectedPlan === 'yearly'}
            onClick={() => setSelectedPlan('yearly')}
          >
            <PricingPrice>KES {yearlyPrice}</PricingPrice>
            <PricingPeriod>per year</PricingPeriod>
            <PricingFeatures selected={selectedPlan === 'yearly'}>
              <li>All premium articles</li>
              <li>Expert guides</li>
              <li>Monthly newsletters</li>
              <li>Exclusive webinars</li>
              <li>Save 33%</li>
            </PricingFeatures>
          </PricingCard>
        </PricingCards>
        <PayButton onClick={() => onMpesaPay(selectedPlan === 'monthly' ? monthlyPrice : yearlyPrice)}>
          Pay with M-PESA
        </PayButton>
      </PaywallModalWrapper>
    </PaywallOverlay>
  );
};

export default PaywallModal; 