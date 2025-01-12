import axiosInstance from '../../utils/axiosInstance';

export const fetchProducts = () => {
  return axiosInstance.get('/products');
};

export const addProduct = (productData: any) => {
  return axiosInstance.post('/products', productData);
};
