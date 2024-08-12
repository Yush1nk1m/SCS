import { useEffect, useState } from "react";
import { getAccessToken, isTokenExpired } from "../utils/tokenUtils";
import { refreshTokens } from "../services/auth";

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const accessToken = getAccessToken();
      if (accessToken && !isTokenExpired(accessToken)) {
        setIsLoggedIn(true);
      } else {
        const refreshed = await refreshTokens();
        setIsLoggedIn(refreshed);
      }
    };

    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);

    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);

  return isLoggedIn;
};
