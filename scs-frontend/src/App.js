import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Sections from "./pages/Sections";
import QuestionPage from "./pages/QuestionPage";
import ActionPage from "./pages/ActionPage";
import Signup from "./pages/Signup";
import BookList from "./pages/BookList";
import BookPage from "./pages/BookPage";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sections" element={<Sections />} />
        <Route path="/question/:id" element={<QuestionPage />} />
        <Route path="/action/:id" element={<ActionPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/book/:id" element={<BookPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
