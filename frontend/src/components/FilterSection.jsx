import React from 'react';
import styled from 'styled-components';

const FilterSectionWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 60px;
  flex-wrap: wrap;
`;
const FilterButton = styled.button`
  padding: 12px 28px;
  background: ${props => props.active ? 'linear-gradient(135deg, #f093fb, #f5576c)' : 'rgba(255, 255, 255, 0.1)'};
  color: white;
  border: 2px solid ${props => props.active ? 'transparent' : 'rgba(255, 255, 255, 0.3)'};
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  &:hover {
    background: ${props => props.active ? 'linear-gradient(135deg, #f093fb, #f5576c)' : 'rgba(255, 255, 255, 0.2)'};
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
`;

const FilterSection = ({ categories, selectedCategory, onSelectCategory }) => (
  <FilterSectionWrapper>
    {categories.map(category => (
      <FilterButton
        key={category}
        active={selectedCategory === category}
        onClick={() => onSelectCategory(category)}
      >
        {category}
      </FilterButton>
    ))}
  </FilterSectionWrapper>
);

export default FilterSection; 