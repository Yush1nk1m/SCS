import React from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SectionPage from "./pages/SectionPage/SectionPage";
import QuestionPage from "./pages/QuestionPage/QuestionPage";
import CreateActionPage from "./pages/CreateActionPage/CreateActionPage";
import ActionPage from "./pages/ActionPage/ActionPage";
import "./App.css";
import ScrollToTop from "./components/common/ScrollToTop";

const App: React.FC = () => {
  return (
    <>
      <Toaster
        gutter={100000}
        toastOptions={{
          style: {
            fontSize: "16px",
            padding: "12px 20px",
            marginTop: "var(--header-height)",
          },
        }}
      />
      <Layout>
        <ScrollToTop />
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
      </Layout>
    </>
  );
};

export default App;
