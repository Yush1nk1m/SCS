// hooks/useCurrentUser.ts
import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import { getCurrentUser } from "../api/userApi";
import { UserDto } from "../api/swaggerApi";
import toast from "react-hot-toast";

export const useCurrentUser = () => {
  const isLoggedIn = useAuth();
  const [user, setUser] = useState<UserDto>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (isLoggedIn) {
        try {
          const userData = await getCurrentUser();
          setUser(userData);
        } catch (error: any) {
          switch (error.status) {
            case 401:
              toast.error("로그인 상태가 만료되었습니다.");
              break;
            case 404:
              toast.error("사용자 정보가 존재하지 않습니다.");
              break;
            default:
              toast.error("예기치 못한 에러가 발생했습니다.");
              break;
          }
        }
      } else {
        setUser(undefined);
      }
      setLoading(false);
    };

    fetchUser();
  }, [isLoggedIn]);

  return { user, loading, isLoggedIn };
};
