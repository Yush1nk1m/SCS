import { useEffect, useState } from "react";
import { getAccessToken, isTokenExpired } from "../utils/tokenUtils";
import { refreshTokens } from "../api/authApi";
import { DecodedToken } from "../types/auth";
import { jwtDecode } from "jwt-decode";

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const accessToken = getAccessToken();
      if (accessToken && !isTokenExpired(accessToken)) {
        const decodedToken = jwtDecode<DecodedToken>(accessToken);
        setIsLoggedIn(true);
        setUserId(decodedToken.sub);
      } else {
        const refreshed = await refreshTokens();
        if (refreshed) {
          const newAccessToken = getAccessToken();
          if (newAccessToken) {
            const decodedToken = jwtDecode<DecodedToken>(newAccessToken);
            setUserId(decodedToken.sub);
          }
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          setUserId(null);
        }
      }
    };

    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);

    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);

  return { isLoggedIn, userId };
};
