import axiosInstance from '../../utils/axiosInstance';

export const login = (email: string, password: string) => {
  return axiosInstance.post('/auth/login', { email, password });
};

export const register = (name: string, email: string, password: string) => {
  return axiosInstance.post('/auth/register', { name, email, password });
};
