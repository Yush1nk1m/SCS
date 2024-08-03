import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { jwtDecode } from 'jwt-decode';
import { fetchUserProfile, logout } from '../api/api';

const Nav = styled.nav`
  background-color: #282c34;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  font-size: 2rem;
  font-family: 'Cursive';
  color: white;
`;

const Ul = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0;
  padding: 0;
`;

const Li = styled.li`
  color: white;
  margin: 0 1rem;
`;

const StyledNavLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover {
    color: #282c34;
    background-color: #61dafb;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  &.active {
    text-decoration: underline;
  }
`;

const Button = styled.button`
  color: white;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  margin: 0 1rem;

  &:hover {
    color: #61dafb;
  }
`;

function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
      fetchUserProfile()
        .then(response => setUser(response.data))
        .catch(() => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          setUser(null);
        });
    }
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <Nav>
      <Logo>Study Computer Science</Logo>
      <Ul>
        <Li><StyledNavLink to="/sections">Sections</StyledNavLink></Li>
        <Li><StyledNavLink to="/libraries">Libraries</StyledNavLink></Li>
        {user ? (
          <>
            <Li><StyledNavLink to="/mypage">My Page</StyledNavLink></Li>
            <Li><Button onClick={handleLogout}>Logout</Button></Li>
          </>
        ) : (
          <>
            <Li><StyledNavLink to="/signup">Sign Up</StyledNavLink></Li>
            <Li><StyledNavLink to="/login">Login</StyledNavLink></Li>
          </>
        )}
      </Ul>
    </Nav>
  );
}

export default Header;
