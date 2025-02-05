import React, { useEffect, useState } from "react";
import { fetchCategories } from "../../../api";
import { Category } from "../../../types/category";
import { addCategories, addCategoryAttribute, addParentCategory } from "../../../store/slices/categorySlice";
import { useDispatch } from "react-redux";

interface CategoryInputProps {
    parentCategory: number | null;
    setParentCategory: React.Dispatch<React.SetStateAction<number | null>>;
}

const ParentCategoryInput: React.FC<CategoryInputProps> = ({ parentCategory, setParentCategory }) => {
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

    const handleParentCategorySelect = (e: React.ChangeEvent<HTMLSelectElement>)=>{
        setParentCategory(Number(e.target.value));
        dispatch(addParentCategory({ id: parseInt(e.target.value), parent_id: parentCategory }))
    }
    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
                Category
            </label>
            <select
                value={parentCategory || ''}
                onChange={handleParentCategorySelect }
                className="w-full px-4 py-2 border rounded-md"
                required
            >
                <option value="" disabled>Select a category</option>
                {categories.map((cat) => (
                    <option key={cat.slug} value={cat.id}>
                        {cat.name}
                    </option>
                ))}
            </select>

        </div>
    );
};

export default ParentCategoryInput;
