import "./App.css";
import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SectionPage from "./pages/SectionPage/SectionPage";
import QuestionPage from "./pages/QuestionPage/QuestionPage";
import CreateActionPage from "./pages/CreateActionPage/CreateActionPage";
import ActionPage from "./pages/ActionPage/ActionPage";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/section" element={<SectionPage />} />
        <Route path="/question/:id" element={<QuestionPage />} />
        <Route
          path="/question/:id/create-action"
          element={<CreateActionPage />}
        />
        <Route path="/action/:id" element={<ActionPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
