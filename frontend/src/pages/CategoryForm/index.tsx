import React, { useState } from "react";
import Attributes from "./components/Attribute";
import ParentCategoryInput from "./components/ParentCategory";
import CategoryInput from "./components/Category";
import { addCategory } from "../../api";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { CategoryAttribute, CategoryPayload } from "../../types/category";

const CategoryForm: React.FC = (): React.ReactElement => {
  const navigate = useNavigate();
  const [type, setType] = useState("category");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [parentCategory, setParentCategory] = useState<number | null>(null);
  const [attributes, setAttributes] = useState<
    CategoryAttribute[]
  >([]);

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();

    if (!category) {
      toast.error("Category name is required");
      return;
    }

    const categoryPayload : CategoryPayload = {
      name: category,
      parentId: parentCategory || null,
      description,
      attributes: attributes,
    };

    addCategory(categoryPayload)
    .then((res) => { 
      toast.success((res.data as { message: string }).message);
      navigate('/dashboard');
    })
    .catch((err) => { 
      if(err.response.data.errors){
        return toast.error('Validation error: ' + err.response.data.errors.join(', '));
      } else if(err.response.data.error){
        return toast.error((err.response.data as { error: string }).error);
      } else if(err.response.data.message){
        return toast.error((err.response.data as { message: string }).message);
      } else {
        return toast.error('An error occurred');
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[50%] mx-auto flex flex-col space-y-6 p-6 border border-gray-300 rounded-lg shadow-lg"
    >
      {/* <div className="w-full flex flex-col space-y-2">
        <label className="text-lg font-medium">
          Do you want to add a category or a subcategory?
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value={type}
              checked={type === "category"}
              onChange={() => setType("category")}
            />
            <span>Category</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="subcategory"
              checked={type === "subcategory"}
              onChange={() => setType("subcategory")}
            />
            <span>Sub category</span>
          </label>
        </div>
      </div> */}

      <div className="w-full flex flex-col space-y-4">
        {/* Parent Category Input */}
        {type === "subcategory" && (
          <ParentCategoryInput parentCategory={parentCategory} setParentCategory={setParentCategory} />
        )}

        {type && (
          <>
            {/* Sub Category Input */}
            <CategoryInput category={category} setCategory={setCategory} isSubCategory={type == 'subcategory'} />
            {/* Description Input */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Enter description"
                rows={4}
              />
            </div>

            {/* Attributes Component */}
            <Attributes parentCategory={parentCategory} attributes={attributes} setAttributes={setAttributes} />
          </>
        )}
      </div>

      {/* Save Button */}
      <button
        type="submit"
        className="w-full px-4 py-2 bg-green-600 text-white rounded-md"
      >
        Save
      </button>
    </form>

  );
};

export default CategoryForm;
