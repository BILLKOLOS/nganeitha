import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(50px); }
  to { opacity: 1; transform: translateY(0); }
`;
const bookFloat = keyframes`
  0%, 100% { transform: translateY(0px) rotateY(0deg); }
  50% { transform: translateY(-10px) rotateY(5deg); }
`;
const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const EbookCardWrapper = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 25px;
  padding: 30px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  transition: all 0.4s ease;
  position: relative;
  backdrop-filter: blur(20px);
  animation: ${fadeInUp} 0.8s ease-out;
  animation-delay: ${props => props.index * 0.1}s;
  animation-fill-mode: both;
  &:hover {
    transform: translateY(-15px);
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.25);
  }
`;
const EbookCover = styled.div`
  width: 100%;
  height: 300px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 15px;
  margin-bottom: 25px;
  position: relative;
  overflow: hidden;
  animation: ${bookFloat} 4s ease-in-out infinite;
  box-shadow: 0 15px 40px rgba(102, 126, 234, 0.3);
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: ${props => `linear-gradient(135deg, rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.8)), url(${props.image}) center/cover`};
  }
  &::after {
    content: '📖';
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    font-size: 3rem;
    z-index: 2;
  }
`;
const BestsellerBadge = styled.div`
  position: absolute;
  top: -10px;
  left: 20px;
  background: linear-gradient(135deg, #f093fb, #f5576c);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 5px 15px rgba(240, 147, 251, 0.4);
`;
const EbookInfo = styled.div`
  text-align: center;
`;
const EbookTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: #333;
  line-height: 1.3;
`;
const EbookAuthor = styled.p`
  color: #667eea;
  font-weight: 600;
  margin-bottom: 15px;
  font-size: 1rem;
`;
const EbookDescription = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
  font-size: 0.95rem;
`;
const PriceSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;
const Price = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  color: #667eea;
`;
const OriginalPrice = styled.span`
  font-size: 1rem;
  color: #999;
  text-decoration: line-through;
  margin-left: 10px;
`;
const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;
const PrimaryButton = styled.button`
  flex: 2;
  padding: 15px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 12px;
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
const SecondaryButton = styled.button`
  flex: 1;
  padding: 15px;
  background: transparent;
  color: #667eea;
  border: 2px solid #667eea;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background: #667eea;
    color: white;
    transform: translateY(-2px);
  }
`;

const EbookCard = ({ ebook, index, onPreview, onBuy }) => (
  <EbookCardWrapper index={index}>
    <EbookCover image={ebook.image} />
    {ebook.bestseller && <BestsellerBadge>Bestseller</BestsellerBadge>}
    <EbookInfo>
      <EbookTitle>{ebook.title}</EbookTitle>
      <EbookAuthor>{ebook.author}</EbookAuthor>
      <EbookDescription>{ebook.description}</EbookDescription>
      <PriceSection>
        <Price>KES {ebook.price}</Price>
        {ebook.originalPrice && <OriginalPrice>KES {ebook.originalPrice}</OriginalPrice>}
      </PriceSection>
      <ActionButtons>
        <PrimaryButton onClick={() => onBuy(ebook)}>Buy Now</PrimaryButton>
        <SecondaryButton onClick={() => onPreview(ebook)}>Preview</SecondaryButton>
      </ActionButtons>
    </EbookInfo>
  </EbookCardWrapper>
);

export default EbookCard; 