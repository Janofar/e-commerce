import React, { useEffect, useState } from "react";

interface CategoryInputProps {
  handleCategoryData: (data : string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({handleCategoryData }) => {
  const [category, setCategory] = useState("");
  useEffect(() => {
    
    handleCategoryData(category);
  }, [category]);
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Category
      </label>
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full px-4 py-2 border rounded-md"
        placeholder={"Category Name"}
        required
      />
    </div>
  );
};

export default CategoryInput;
