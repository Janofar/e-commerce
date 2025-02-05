import axiosInstance from '../../utils/axiosInstance';

export const createOrder = (orderData: any) => {
  return axiosInstance.post('/orders', orderData);
};
