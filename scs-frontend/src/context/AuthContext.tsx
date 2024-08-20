import React, { createContext, useCallback, useEffect, useState } from "react";
import { getAccessToken, removeTokens } from "../utils/tokenUtils";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../types/auth";

interface AuthContextType {
  isLoggedIn: boolean;
  userId: number | null;
  nickname: string | null;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  userId: null,
  nickname: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [nickname, setNickname] = useState<string | null>(null);

  const checkLoginStatus = useCallback(() => {
    const accessToken = getAccessToken();
    if (accessToken) {
      const decodedToken = jwtDecode<DecodedToken>(accessToken);
      setIsLoggedIn(true);
      setUserId(decodedToken.sub);
      setNickname(decodedToken.nickname);
    } else {
      setIsLoggedIn(false);
      setUserId(null);
      setNickname(null);
    }
  }, []);

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  const login = useCallback(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  const logout = useCallback(() => {
    removeTokens();
    setIsLoggedIn(false);
    setUserId(null);
    setNickname(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userId, nickname, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
