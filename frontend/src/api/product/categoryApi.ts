import { Category, CategoryPayload } from '../../types/category';
import axiosInstance from '../../utils/axiosInstance';

export const addCategory = (categoryData: CategoryPayload) => {
  return axiosInstance.post('/categories', categoryData);
};

export const fetchCategories = async (): Promise<{ data: Category[] }> => {
  return axiosInstance.get('/categories');
};
