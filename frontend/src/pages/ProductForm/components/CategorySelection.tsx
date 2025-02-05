import { useState } from "react";
import Select, { SingleValue } from "react-select";

interface CategorySelectionProps {
  setProductData: (data: any) => void;
  goToNextStep: (data: any) => void;
  productData: {
    name: string;
    price: number;
    description: string;
    category: string;
    subCategory : string;
    imagePaths: string[] | null;
  } | null;
}

export const CategorySelection: React.FC<CategorySelectionProps> = ({ productData, setProductData, goToNextStep }) => {
  const [categories] = useState([
    { value: "electronics", label: "Electronics" },
    { value: "clothing", label: "Clothing" },
    { value: "books", label: "Books" },
  ]);

  const subcategories: { [key: string]: { value: string; label: string }[] } = {
    electronics: [
      { value: "mobile", label: "Mobile" },
      { value: "laptop", label: "Laptop" },
      { value: "accessories", label: "Accessories" },
    ],
    clothing: [
      { value: "men", label: "Men" },
      { value: "women", label: "Women" },
      { value: "kids", label: "Kids" },
    ],
    books: [
      { value: "fiction", label: "Fiction" },
      { value: "non-fiction", label: "Non-Fiction" },
      { value: "academic", label: "Academic" },
    ],
  };

  const handleCategoryChange = (selectedOption: SingleValue<{ value: string; label: string }>) => {
    if (selectedOption) {
      setProductData({ ...productData, category: selectedOption.value, subCategory: "" });
    } else {
      setProductData({ ...productData, category: "", subCategory: "" });
    }
  };

  const handleSubcategoryChange = (selectedOption: SingleValue<{ value: string; label: string }>) => {
    if (selectedOption) {
      setProductData({ ...productData, subCategory: selectedOption.value });
    } else {
      setProductData({ ...productData, subCategory: "" });
    }
  };

  return (
    <form className="space-y-4">
      {/* Category Selection */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">Category</label>
        <div>
          <Select
            options={categories}
            value={categories.find((option) => option.value === productData?.category) || null}
            onChange={handleCategoryChange}
            placeholder="Select a category"
            isClearable
          />
        </div>
      </div>

      {/* Subcategory Selection */}
      {productData?.category && (
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Subcategory</label>
          <div>
            <Select
              options={subcategories[productData.category] || []}
              value={
                subcategories[productData.category]?.find(
                  (option) => option.value === productData.subCategory
                ) || null
              }
              onChange={handleSubcategoryChange}
              placeholder="Select a subcategory"
              isClearable
            />
          </div>
        </div>
      )}

      {/* Next Button */}
      <button
        type="button"
        onClick={goToNextStep}
        className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300"
      >
        Next
      </button>
    </form>
  );
};
