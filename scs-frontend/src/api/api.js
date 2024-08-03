import axios from 'axios';

const API_URL = 'http://localhost:4000';

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  return response.data;
};

export const signup = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/v1/signup`, userData);
  return response.data;
};

export const logout = async () => {
  const response = await axios.post(`${API_URL}/auth/logout`);
  return response.data;
};

export const fetchUserProfile = async () => {
  const response = await axios.get(`${API_URL}/user/profile`);
  return response.data;
};

export const fetchSections = async () => {
  const response = await axios.get(`${API_URL}/sections`);
  return response.data;
};

export const fetchLibraries = async () => {
  const response = await axios.get(`${API_URL}/libraries`);
  return response.data;
};

export const sendVerificationCode = async (email) => {
  const response = await axios.post(`${API_URL}/auth/v1/email/verification-code`, { email });
  return response.data;
};

export const verifyCode = async (email, verificationCode) => {
  const response = await axios.post(`${API_URL}/auth/v1/email/verify-code`, { email, verificationCode });
  return response.data;
};
