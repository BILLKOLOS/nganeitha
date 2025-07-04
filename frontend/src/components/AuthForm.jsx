import React from 'react';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const InputGroup = styled.div`
  position: relative;
`;
const Input = styled.input`
  width: 100%;
  padding: 16px 20px;
  border: 2px solid rgba(102, 126, 234, 0.2);
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    transform: translateY(-2px);
  }
  &::placeholder {
    color: #999;
  }
`;
const Label = styled.label`
  position: absolute;
  left: 20px;
  top: 16px;
  color: #999;
  font-size: 1rem;
  pointer-events: none;
  transition: all 0.3s ease;
  ${Input}:focus + &,
  ${Input}:not(:placeholder-shown) + & {
    top: -8px;
    font-size: 0.8rem;
    color: #667eea;
    background: white;
    padding: 0 8px;
  }
`;
const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
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
  margin-top: 10px;
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
  &:active {
    transform: translateY(0);
  }
`;
const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: 5px;
  padding: 8px 12px;
  background: rgba(231, 76, 60, 0.1);
  border-radius: 6px;
  border-left: 3px solid #e74c3c;
`;

const AuthForm = ({ isLogin, formData, setFormData, errors, onSubmit, onInputChange }) => (
  <Form onSubmit={onSubmit} autoComplete="off">
    {!isLogin && (
      <InputGroup>
        <Input
          type="text"
          name="fullName"
          placeholder=" "
          value={formData.fullName}
          onChange={onInputChange}
        />
        <Label htmlFor="fullName">Full Name</Label>
        {errors.fullName && <ErrorMessage>{errors.fullName}</ErrorMessage>}
      </InputGroup>
    )}
    <InputGroup>
      <Input
        type="email"
        name="email"
        placeholder=" "
        value={formData.email}
        onChange={onInputChange}
      />
      <Label htmlFor="email">Email</Label>
      {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
    </InputGroup>
    <InputGroup>
      <Input
        type="password"
        name="password"
        placeholder=" "
        value={formData.password}
        onChange={onInputChange}
      />
      <Label htmlFor="password">Password</Label>
      {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
    </InputGroup>
    {!isLogin && (
      <InputGroup>
        <Input
          type="password"
          name="confirmPassword"
          placeholder=" "
          value={formData.confirmPassword}
          onChange={onInputChange}
        />
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
      </InputGroup>
    )}
    <SubmitButton type="submit">{isLogin ? 'Sign In' : 'Sign Up'}</SubmitButton>
  </Form>
);

export default AuthForm; 