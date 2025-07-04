import React from 'react';
import styled from 'styled-components';

const FilterBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 50px;
  flex-wrap: wrap;
`;
const FilterButton = styled.button`
  padding: 12px 24px;
  border: 2px solid ${props => props.active ? '#667eea' : 'transparent'};
  background: ${props => props.active ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'white'};
  color: ${props => props.active ? 'white' : '#667eea'};
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  }
`;

const FilterBar = ({ categories, selectedCategory, onSelectCategory }) => (
  <FilterBarWrapper>
    {categories.map(category => (
      <FilterButton
        key={category}
        active={selectedCategory === category}
        onClick={() => onSelectCategory(category)}
      >
        {category}
      </FilterButton>
    ))}
  </FilterBarWrapper>
);

export default FilterBar; 