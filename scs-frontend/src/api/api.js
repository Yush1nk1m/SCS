// 기존 코드 유지
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000', // 실제 백엔드 서버의 주소로 변경하세요
});

// 인증 코드 전송 (A-01)
export const sendVerificationCode = async (email) => {
  return api.post('/auth/v1/email/verification-code', { email });
};

// 인증 코드 검증 (A-02)
export const verifyCode = async (email, verificationCode) => {
  return api.post('/auth/v1/email/verify-code', { email, verificationCode });
};

// 회원 가입 (A-03)
export const signup = async (userData) => {
  return api.post('/auth/v1/signup', userData);
};

// 로그인 (A-04)
export const login = async (email, password) => {
  return api.post('/auth/v1/jwt/login', { email, password });
};

// 리프레시 (A-05)
export const refreshAccessToken = async (refreshToken) => {
  return api.post('/auth/v1/jwt/refresh', null, {
    headers: { Authorization: `Bearer ${refreshToken}` },
  });
};

// 로그아웃 (A-06)
export const logout = async (accessToken) => {
  return api.post('/auth/v1/jwt/logout', null, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};
