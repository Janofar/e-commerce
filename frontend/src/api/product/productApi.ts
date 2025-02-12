import axiosInstance from '../../utils/axiosInstance';

export const fetchProducts = () => {
  return axiosInstance.get('/products');
};

export const addProduct = (productData: FormData) => {
  return axiosInstance.post('/products', productData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
