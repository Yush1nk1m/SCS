import axios from "axios";
import { SignupData, UserData } from "../types";

const API_BASE_URL = "http://localhost:4000";

interface SignupResponse {
  message: string;
  user: UserData;
}

export const sendVerificationCode = (email: string) =>
  axios.post(`${API_BASE_URL}/v1/auth/email/verification-code`, { email });

export const verifyCode = (email: string, verificationCode: string) =>
  axios.post(`${API_BASE_URL}/v1/auth/email/verify-code`, {
    email,
    verificationCode,
  });

export const signup = async (data: SignupData): Promise<UserData> => {
  const response = await axios.post<SignupResponse>(
    `${API_BASE_URL}/v1/auth/signup`,
    data
  );
  return response.data.user;
};
