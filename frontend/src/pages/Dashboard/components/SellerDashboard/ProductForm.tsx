import { Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';

interface ProductFormProps {
    handleFormSubmit: () => void;
    prepopData: {
        name: string;
        price: number;
        description: string;
        category: string;
        imagePaths: string[] | null;
    } | null;
}

export const ProductForm: React.FC<ProductFormProps> = ({ handleFormSubmit, prepopData }) => {
    const [productData, setProductData] = useState({
        name: '',
        price: 0,
        description: '',
        category: '',
        images: [] as File[],
    });

    useEffect(() => {
        if (prepopData) {
            setProductData({
                name: prepopData.name,
                price: prepopData.price,
                description: prepopData.description,
                category: prepopData.category,
                images: prepopData.imagePaths ? [] : [],
            });
            setImagePreviews(prepopData.imagePaths || []);
        }
    }, [prepopData]);


    const [categories, setCategories] = useState([
        { value: 'electronics', label: 'Electronics' },
        { value: 'clothing', label: 'Clothing' },
        { value: 'books', label: 'Books' },
    ]);
    const [newCategory, setNewCategory] = useState('');
    const [isCreatingCategory, setCreatingCategory] = useState(false);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]); // For displaying multiple previews
    const [selectedCurrency, setSelectedCurrency] = useState('USD');

    const handleCategoryChange = (selectedOption: any) => {
        setProductData({ ...productData, category: selectedOption.value });
    };

    const handleAddCategory = () => {
        if (newCategory.trim()) {
            const newCategoryOption = { value: newCategory.toLowerCase(), label: newCategory };
            setCategories([...categories, newCategoryOption]);
            setProductData({ ...productData, category: newCategoryOption.value });
            setCreatingCategory(false);
            setNewCategory('');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setCreatingCategory(false);
        setProductData({
            name: '',
            price: 0,
            description: '',
            category: '',
            images: [] as File[]
        });
        setImagePreviews([]);
        setSelectedCurrency('USD')
        handleFormSubmit();
    };

    const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCurrency(e.target.value);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newFiles = Array.from(files);
            setProductData({ ...productData, images: [...productData.images, ...newFiles] });

            const previewUrls = newFiles.map((file) => URL.createObjectURL(file));
            setImagePreviews([...imagePreviews, ...previewUrls]);
        }
    };

    const handleRemoveImage = (index: number) => {
        const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
        setImagePreviews(updatedPreviews);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Product Name</label>
                <input
                    type="text"
                    name="name"
                    value={productData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                    required
                />
            </div>

            <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Category</label>
                {isCreatingCategory ? (
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                            placeholder="Enter new category"
                        />
                        <button
                            type="button"
                            onClick={handleAddCategory}
                            className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
                        >
                            Add
                        </button>
                        <button
                            type="button"
                            onClick={() => setCreatingCategory(false)}
                            className="px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700"
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <div>
                        <Select
                            options={categories}
                            onChange={handleCategoryChange}
                            placeholder="Select a category"
                            isClearable
                        />
                        <button
                            type="button"
                            onClick={() => setCreatingCategory(true)}
                            className="mt-2 text-sm text-blue-600 hover:underline"
                        >
                            + Add New Category
                        </button>
                    </div>
                )}
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Price</label>
                <div className="flex items-center space-x-2">
                    <select
                        value={selectedCurrency}
                        onChange={handleCurrencyChange}
                        className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                    >
                        <option value="USD">USD</option>
                        <option value="INR">INR</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                    </select>
                    <input
                        type="number"
                        name="price"
                        value={productData.price}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                        placeholder={`Enter price in ${selectedCurrency}`}
                        required
                    />
                </div>
            </div>

            <div className="mt-4">
                <label
                    htmlFor="file-upload"
                    className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md cursor-pointer hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300"
                >
                    <span>Upload Images</span>
                </label>
                <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    multiple
                />
            </div>

            {/* Image Preview section */}
            <div className="mt-4 overflow-y-auto flex flex-wrap justify-start gap-4 max-h-60">
                {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative w-32 h-32">
                        <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="object-cover rounded-md border border-gray-300"
                        />
                        <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-0 right-0 p-1 bg-white rounded-full shadow-md text-gray-600 hover:text-red-600"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
                <textarea
                    name="description"
                    value={productData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                    rows={3}
                    required
                ></textarea>
            </div>

            <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300"
            >
                Add Product
            </button>
        </form>
    );
};
