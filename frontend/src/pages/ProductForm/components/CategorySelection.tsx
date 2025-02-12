import { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import { Category } from "../../../types/category";
import { useDispatch } from "react-redux";
import { fetchCategories } from "../../../api";
import { addCategories } from "../../../store/slices/categorySlice";
import { ProductInput } from "../../../types/product";

interface CategorySelectionProps {
  handleChange :(field: string, value: any) => void;
  productData: ProductInput;
}

export const CategorySelection: React.FC<CategorySelectionProps> = ({ productData,handleChange }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const dispatch = useDispatch();
  useEffect(() => {  
      fetchCategories().then((res) => {
          setCategories(res.data as Category[]);
          dispatch(addCategories(res.data as Category[]))
      })
      .catch(() => {
          
      });
  }, []);

  const handleCategoryChange = (selectedOption: SingleValue<{ value: number; label: string }>) => {
    if (selectedOption) {
      handleChange('categoryId',selectedOption.value)
    } else {
      handleChange('categoryId','')
    }
  };
  return (
    <form className="space-y-4">
      {/* Category Selection */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">Category</label>
        <div>
          <Select
            options={categories.map(category => ({ value: category.id, label: category.name }))}
            value={productData ? { value: Number(productData.categoryId), label: categories.find(category => category.id === Number(productData.categoryId))?.name || "" } : null}
            onChange={handleCategoryChange}
            placeholder="Select a category"
            isClearable
          />
        </div>
      </div>
    </form>
  );
};
