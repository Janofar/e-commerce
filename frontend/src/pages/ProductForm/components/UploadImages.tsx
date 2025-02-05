import { Trash2 } from 'lucide-react';
import React, { useState } from 'react'
interface UploadImagesProps {
    setProductData: (data: any) => void;
    handleFormSubmit: (data: any) => void;
    goToPreviousStep: (data: any) => void;
    productData: {
        name: string;
        price: number;
        description: string;
        category: string;
        images: File[] | null;
        imagePaths: string[] | null;
    } | null;
}
export const UploadImages: React.FC<UploadImagesProps> = ({ productData, setProductData, handleFormSubmit, goToPreviousStep }) => {
    const [imagePreviews, setImagePreviews] = useState<string[]>(
        productData?.images?.map((file) => URL.createObjectURL(file)) || []
      );
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newFiles = Array.from(files);
            if (productData) {
                setProductData({ ...productData, images: [...(productData.images || []), ...newFiles] });
            }

            const previewUrls = newFiles.map((file) => URL.createObjectURL(file));
            setImagePreviews([...imagePreviews, ...previewUrls]);
        }
    };

    const handleRemoveImage = (index: number) => {
        const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
        setImagePreviews(updatedPreviews);

        if (productData && productData.images) {
            const updatedImages = productData.images.filter((_, i) => i !== index);
            setProductData({ ...productData, images: updatedImages });
        }
    };
    
    return (
        <form className="space-y-4">
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
            <button
                type="button"
                onClick={goToPreviousStep}
                className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300"
            >
                Previous
            </button>
            <button
                type="button"
                onClick={handleFormSubmit}
                className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300"
            >
                Save
            </button>
        </form>
    )
}
