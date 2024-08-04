import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ auth, setAuth, setCurrentForm, children }) => {
  return (
    <Container>
      <Header auth={auth} setAuth={setAuth} setCurrentForm={setCurrentForm}>Header</Header>
      <Main>{children}</Main>
      <Footer>Footer</Footer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #ff7e5f, #feb47b);
`;

export default Layout;
