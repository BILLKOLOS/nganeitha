import React from 'react';
import styled from 'styled-components';
import EbookCard from '../components/EbookCard';

const EbooksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 40px;
  max-width: 1400px;
  margin: 0 auto;
`;

const EbookGridSection = ({ ebooks, onPreview, onBuy }) => (
  <EbooksGrid>
    {ebooks.map((ebook, index) => (
      <EbookCard key={ebook.id} ebook={ebook} index={index} onPreview={onPreview} onBuy={onBuy} />
    ))}
  </EbooksGrid>
);

export default EbookGridSection; 