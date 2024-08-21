import { ContributionResponseDto, UserDto } from "./swaggerApi";
import { authRequest } from "./apiClient";
import api from "./apiClient";

export const getCurrentUser = async (): Promise<UserDto> => {
  const response = await authRequest<{ user: UserDto }, {}>(
    () => api.v1.userControllerGetCurrentUser(),
    {}
  );
  return response.user;
};

export const getMyContribution = async (
  type: "created" | "question" | "action" | "book"
): Promise<ContributionResponseDto> => {
  return authRequest(() => api.v1.userControllerGetMyContribution({ type }), {
    type,
  });
};

export const changeUserNickname = async (data: {
  nickname: string;
}): Promise<UserDto> => {
  const response = await authRequest(
    () => api.v1.userControllerChangeUserNickname(data),
    data
  );
  return response.user;
};

export const changeUserAffiliation = async (data: {
  affiliation: string;
}): Promise<UserDto> => {
  const response = await authRequest(
    () => api.v1.userControllerChangeUserAffiliation(data),
    data
  );
  return response.user;
};

export const changeUserPosition = async (data: {
  position: string;
}): Promise<UserDto> => {
  const response = await authRequest(
    () => api.v1.userControllerChangeUserPosition(data),
    data
  );
  return response.user;
};

export const changeUserPassword = async (data: {
  password: string;
  newPassword: string;
  confirmPassword: string;
}): Promise<void> => {
  await authRequest(() => api.v1.userControllerChangeUserPassword(data), data);
};

export const deleteCurrentUser = async (data: {
  password: string;
  confirmMessage: string;
}): Promise<void> => {
  await authRequest(() => api.v1.userControllerDeleteCurrentUser(data), data);
};
