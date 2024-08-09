import axios from "axios";
import { SignupData } from "../types";

const API_BASE_URL = "http://localhost:4000";

export const sendVerificationCode = (email: string) =>
  axios.post(`${API_BASE_URL}/v1/auth/email/verification-code`, { email });

export const verifyCode = (email: string, verificationCode: string) =>
  axios.post(`${API_BASE_URL}/v1/auth/email/verify-code`, {
    email,
    verificationCode,
  });

export const signup = (data: SignupData) =>
  axios.post(`${API_BASE_URL}/v1/auth/signup`, data);
