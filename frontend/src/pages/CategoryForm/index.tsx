import React, { useState } from "react";
import Attributes from "./components/Attribute";
import CategoryInput from "./components/Category";
import { addCategory } from "../../api";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { CategoryAttribute, CategoryPayload } from "../../types/category";

const CategoryForm: React.FC = (): React.ReactElement => {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [attributes, setAttributes] = useState<CategoryAttribute[]>([]);
  const [category, setCategory] = useState<string>("");

  const handleAttributeData = (data: CategoryAttribute[]) => {
    setAttributes(data);
  };

  const handleCategoryData = (data: string) => {
    setCategory(data)
  };


  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    console.log(category,"submit")
    if (!category) {
      toast.error("Category name is required");
      return;
    }

    const categoryPayload: CategoryPayload = {
      name: category,
      parentId: null,
      description,
      attributes: attributes,
    };
    console.log(categoryPayload);
   
    addCategory(categoryPayload)
      .then((res) => {
        toast.success((res.data as { message: string }).message);
        navigate('/dashboard');
      })
      .catch((err) => {
        if (err.response.data.errors) {
          return toast.error('Validation error: ' + err.response.data.errors.join(', '));
        } else if (err.response.data.error) {
          return toast.error((err.response.data as { error: string }).error);
        } else if (err.response.data.message) {
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
      <div className="w-full flex flex-col space-y-4">
        <CategoryInput handleCategoryData={handleCategoryData} />
       
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
        <Attributes handleAttributeData={handleAttributeData} />
      </div>
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
