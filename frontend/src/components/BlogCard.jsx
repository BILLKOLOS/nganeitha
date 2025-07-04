import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;
const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
`;

const BlogCardWrapper = styled.article`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  animation: ${fadeIn} 0.8s ease-out;
  animation-fill-mode: both;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
  }
  animation-delay: ${props => props.index * 0.1}s;
`;
const BlogImage = styled.div`
  height: 200px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: ${props => `url(${props.image}) center/cover`};
    transition: transform 0.3s ease;
  }
  ${BlogCardWrapper}:hover &::before {
    transform: scale(1.1);
  }
`;
const PremiumBadge = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  background: linear-gradient(135deg, #f093fb, #f5576c);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  z-index: 2;
  animation: ${pulse} 2s infinite;
`;
const BlogContent = styled.div`
  padding: 25px;
`;
const BlogCategory = styled.span`
  color: #667eea;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`;
const BlogTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  margin: 10px 0 15px;
  color: #333;
  line-height: 1.4;
`;
const BlogExcerpt = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
const BlogMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-top: 15px;
  border-top: 1px solid #eee;
`;
const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const AuthorAvatar = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
`;
const AuthorInfo = styled.div`
  font-size: 0.9rem;
  color: #666;
`;
const ReadTime = styled.span`
  font-size: 0.9rem;
  color: #999;
`;
const ReadButton = styled.button`
  width: 100%;
  padding: 12px;
  background: ${props => props.isPremium ? 'linear-gradient(135deg, #f093fb, #f5576c)' : 'linear-gradient(135deg, #667eea, #764ba2)'};
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px ${props => props.isPremium ? 'rgba(240, 147, 251, 0.4)' : 'rgba(102, 126, 234, 0.4)'};
  }
`;

const BlogCard = ({ post, index, onReadClick }) => (
  <BlogCardWrapper index={index}>
    <BlogImage image={post.image}>
      {post.isPremium && <PremiumBadge>Premium</PremiumBadge>}
    </BlogImage>
    <BlogContent>
      <BlogCategory>{post.category}</BlogCategory>
      <BlogTitle>{post.title}</BlogTitle>
      <BlogExcerpt>{post.excerpt}</BlogExcerpt>
      <BlogMeta>
        <Author>
          <AuthorAvatar>{post.author.split(' ').map(n => n[0]).join('')}</AuthorAvatar>
          <AuthorInfo>{post.author}</AuthorInfo>
        </Author>
        <ReadTime>{post.readTime}</ReadTime>
      </BlogMeta>
      {post.isPremium && <div style={{ fontWeight: 700, color: '#f5576c', marginBottom: 8 }}>KES {post.price || 200}</div>}
      <ReadButton isPremium={post.isPremium} onClick={() => onReadClick(post)}>
        {post.isPremium ? 'Unlock Premium Content' : 'Read Article'}
      </ReadButton>
    </BlogContent>
  </BlogCardWrapper>
);

export default BlogCard; 