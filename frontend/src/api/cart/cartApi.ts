import axiosInstance from '../../utils/axiosInstance';

export const addToCart = (productId: number, quantity: number) => {
  return axiosInstance.post('/cart/add', { productId, quantity });
};

export const fetchCart = () => {
  return axiosInstance.get('/cart');
};
