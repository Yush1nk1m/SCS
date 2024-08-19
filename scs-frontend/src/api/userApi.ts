import { UserDto } from "./swaggerApi";
import { authRequest } from "./apiClient";
import api from "./apiClient";

export const getCurrentUser = async (): Promise<UserDto> => {
  const response = await authRequest<{ user: UserDto }, {}>(
    () => api.v1.userControllerGetCurrentUser(),
    {}
  );
  return response.user;
};
