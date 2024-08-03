import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Sections from './components/Sections';
import Libraries from './components/Libraries';
import MyPage from './components/MyPage';

const Main = styled.main`
  background: linear-gradient(135deg, #3a8dff, #6a70ff);
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const App = () => {
  return (
    <Router>
      <Header />
      <Main>
        <Routes>
          <Route path="/" element={<Home />} /> {/* 기본 라우트를 Home 페이지로 설정 */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/sections" element={<Sections />} />
          <Route path="/libraries" element={<Libraries />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </Main>
      <Footer />
    </Router>
  );
};

export default App;
