import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SectionPage from "./pages/SectionPage/SectionPage";
import CreateActionPage from "./pages/CreateActionPage/CreateActionPage";
import ActionPage from "./pages/ActionPage/ActionPage";
import "./App.css";
import ScrollToTop from "./components/common/ScrollToTop";
import EditActionPage from "./pages/EditActionPage/EditActionPage";
import LibraryPage from "./pages/LibraryPage/LibraryPage";
import BookDetailPage from "./pages/BookDetailPage/BookDetailPage";
import QuestionDetailPage from "./pages/QuestionDetailPage/QuestionDetailPage";
import QuestionPage from "./pages/QuestionPage/QuestionPage";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";
import { setLogoutCallback } from "./api/apiClient";
import MyPage from "./pages/MyPage/MyPage";

const App: React.FC = () => {
  const { logout } = useAuth();

  useEffect(() => {
    setLogoutCallback(logout);
  }, [logout]);

  return (
    <AuthProvider>
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
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/section" element={<SectionPage />} />
          <Route
            path="/section/:sectionId/questions"
            element={<QuestionPage />}
          />
          <Route path="/question/:id" element={<QuestionDetailPage />} />
          <Route
            path="/question/:id/create-action"
            element={<CreateActionPage />}
          />
          <Route path="/action/:id/edit" element={<EditActionPage />} />
          <Route path="/action/:id" element={<ActionPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/book/:id" element={<BookDetailPage />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
};

export default App;
