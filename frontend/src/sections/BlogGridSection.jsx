import React from 'react';
import styled from 'styled-components';
import BlogCard from '../components/BlogCard';

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

const BlogGridSection = ({ posts, onReadClick }) => (
  <BlogGrid>
    {posts.map((post, index) => (
      <BlogCard key={post.id} post={post} index={index} onReadClick={onReadClick} />
    ))}
  </BlogGrid>
);

export default BlogGridSection; 