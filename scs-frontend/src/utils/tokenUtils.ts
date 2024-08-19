import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../types/auth";

// 토큰의 만료 여부를 확인하는 함수
export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    console.error("Failed to decode token or token is invalid.", error);
    return true;
  }
};

// 로컬 스토리지에서 액세스 토큰을 가져오는 함수
export const getAccessToken = (): string | null => {
  try {
    return localStorage.getItem("accessToken");
  } catch (error) {
    console.error("Failed to retrieve access token from localStorage.", error);
    return null;
  }
};

// 로컬 스토리지에서 리프레시 토큰을 가져오는 함수
export const getRefreshToken = (): string | null => {
  try {
    return localStorage.getItem("refreshToken");
  } catch (error) {
    console.error("Failed to retrieve refresh token from localStorage.", error);
    return null;
  }
};

// 액세스 토큰과 리프레시 토큰을 로컬 스토리지에 저장하는 함수
export const setTokens = (accessToken: string, refreshToken: string): void => {
  try {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  } catch (error) {
    console.error("Failed to store tokens in localStorage.", error);
  }
};

// 로컬 스토리지에서 토큰을 제거하는 함수
export const removeTokens = (): void => {
  try {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  } catch (error) {
    console.error("Failed to remove tokens from localStorage.", error);
  }
};
