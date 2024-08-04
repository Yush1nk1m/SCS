import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import Layout from './components/Layout';

const App = () => {
  const [auth, setAuth] = useState(false);
  const [currentForm, setCurrentForm] = useState('home'); // 현재 폼 상태

  return (
    <Router>
      <Layout auth={auth} setAuth={setAuth} setCurrentForm={setCurrentForm}>
        {currentForm === 'home' && <Home />}
        {currentForm === 'signup' && <Signup setCurrentForm={setCurrentForm} />}
        {currentForm === 'login' && <Login setAuth={setAuth} setCurrentForm={setCurrentForm} />}
      </Layout>
    </Router>
  );
};

export default App;
