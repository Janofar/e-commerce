import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Category } from "../../../types/category";

interface AttributesProps {
  attributes: { name: string; type: string; options?: string[] }[];
  setAttributes: React.Dispatch<
    React.SetStateAction<
      { name: string; type: string; options?: string[] }[]
    >
  >;
  parentCategory : number | null;
}

const Attributes: React.FC<AttributesProps> = ({ parentCategory, attributes, setAttributes }) => {
  const categories = useSelector((state: RootState) => state.category); 
  console.log(categories,"catg");
  useEffect(()=>{
    if(categories.length && parentCategory){
      let cat = categories.find((cat : Category) => cat.id == parentCategory);
      if (cat) {
        console.log(cat.attributes, "cat");
        setAttributes([...attributes, ...cat.attributes]);
      }      
    }
  },[categories])
  const handleAddAttribute = () => {
    setAttributes([...attributes, { name: "", type: "text" }]);
  };

  const handleAttributeChange = (
    index: number,
    field: "name" | "type",
    value: string
  ) => {
    const updatedAttributes = [...attributes];
    updatedAttributes[index][field] = value;

    // Reset options if type changes to non-select
    if (field === "type" && value !== "select") {
      delete updatedAttributes[index].options;
    }

    setAttributes(updatedAttributes);
  };

  const handleAddOption = (attrIndex: number) => {
    const updatedAttributes = [...attributes];
    if (!updatedAttributes[attrIndex].options) {
      updatedAttributes[attrIndex].options = [""];
    } else {
      updatedAttributes[attrIndex].options!.push("");
    }
    setAttributes(updatedAttributes);
  };

  const handleOptionChange = (
    attrIndex: number,
    optionIndex: number,
    value: string
  ) => {
    const updatedAttributes = [...attributes];
    if (updatedAttributes[attrIndex].options) {
      updatedAttributes[attrIndex].options![optionIndex] = value;
    }
    setAttributes(updatedAttributes);
  };

  const handleRemoveOption = (attrIndex: number, optionIndex: number) => {
    const updatedAttributes = [...attributes];
    if (updatedAttributes[attrIndex].options) {
      updatedAttributes[attrIndex].options = updatedAttributes[attrIndex].options!.filter(
        (_, i) => i !== optionIndex
      );
    }
    setAttributes(updatedAttributes);
  };

  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Attributes
      </label>
      {attributes.map((attribute, index) => (
        <div key={index} className="mb-4 p-4 border rounded-md">
          <div className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              value={attribute.name}
              onChange={(e) =>
                handleAttributeChange(index, "name", e.target.value)
              }
              className="flex-grow px-4 py-2 border rounded-md"
              placeholder="Attribute Name"
              required
            />
            <select
              value={attribute.type}
              onChange={(e) =>
                handleAttributeChange(index, "type", e.target.value)
              }
              className="px-4 py-2 border rounded-md"
            >
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="select">Select</option>
              <option value="radio">Radio</option>
            </select>
          </div>
          {attribute.type === "select" && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Options
              </label>
              {attribute.options?.map((option, optIndex) => (
                <div
                  key={optIndex}
                  className="flex items-center space-x-2 mb-2"
                >
                  <input
                    type="text"
                    value={option}
                    onChange={(e) =>
                      handleOptionChange(index, optIndex, e.target.value)
                    }
                    className="flex-grow px-4 py-2 border rounded-md"
                    placeholder={`Option ${optIndex + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(index, optIndex)}
                    className="px-2 py-1 bg-red-500 text-white rounded-md"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddOption(index)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md"
              >
                Add Option
              </button>
            </div>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddAttribute}
        className="px-4 py-2 bg-indigo-600 text-white rounded-md"
      >
        Add Attribute
      </button>
    </div>
  );
};

export default Attributes;
