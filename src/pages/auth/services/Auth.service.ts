import { clientAxios } from "../../../utilities";

const usersURL = '/users';

export const getProfileService = async (): Promise<any> => {
  return await clientAxios.get(`${usersURL}/profile`);
};
export const LoginUserService = async (value: any): Promise<any> => {
  return await clientAxios.post(`${usersURL}/login`, value);
};

export const RegisterUserService = async (value: any): Promise<any> => {
  return await clientAxios.post(`${usersURL}`, value);
};

export const verifyTokenService = async (token: string) => {
  return await clientAxios(`${usersURL}/reset-password/${token}`);
};

export const ValidateAccountService = async (token: any): Promise<any> => {
  return await clientAxios.get(`${usersURL}/confirm/${token}`);
};

export const forgotPasswordService = async (value: any): Promise<any> => {
  return await clientAxios.post(`${usersURL}/reset-password`, value);
};

export const resetPasswordService = async (token: string, value: any): Promise<any> => {
  return await clientAxios.post(`${usersURL}/reset-password/${token}`, value);
};
