import React from "react";

interface CategoryInputProps {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  isSubCategory : boolean;
}

const CategoryInput: React.FC<CategoryInputProps> = ({ category, setCategory,isSubCategory }) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {isSubCategory ? "Sub Category" : "Category"}
      </label>
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full px-4 py-2 border rounded-md"
        placeholder={isSubCategory ? "Sub Category Name" : "Category Name"}
        required
      />
    </div>
  );
};

export default CategoryInput;
