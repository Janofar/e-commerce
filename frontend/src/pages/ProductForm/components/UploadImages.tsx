import { Trash2, Upload } from 'lucide-react';
import React, { useState } from 'react'
import { ProductInput } from '../../../types/product';
interface UploadImagesProps {
    handleChange :(field: string, value: any) => void;
    productData: ProductInput;
}
export const UploadImages: React.FC<UploadImagesProps> = ({ productData, handleChange }) => {
    const [imagePreviews, setImagePreviews] = useState<string[]>(
        productData?.images?.map((file) => URL.createObjectURL(file)) || []
    );
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newFiles = Array.from(files);
            if (productData) {
                //setProductData({ ...productData, images: [...(productData.images || []), ...newFiles] });
                handleChange('images',[...(productData.images || []), ...newFiles])
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
            //setProductData({ ...productData, images: updatedImages });
            handleChange('images',updatedImages)
        }
    };
    
    return (
        <form className="space-y-6 bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto">
            <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800">Upload Images</h2>
                <p className="text-sm text-gray-500">Drag & drop or click to upload</p>
            </div>

            {/* Drag & Drop Upload Box */}
            <div
                className="relative flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 transition"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                    e.preventDefault();
                    const files = Array.from(e.dataTransfer.files);
                    const newPreviews = files.map((file) => URL.createObjectURL(file));
                    setImagePreviews((prev) => [...prev, ...newPreviews]);
                }}
            >
                <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-full">
                    <Upload size={40} className="text-indigo-500" />
                    <span className="mt-2 text-sm font-medium text-indigo-600">Click to Upload</span>
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

            {/* Image Preview Grid */}
            {imagePreviews.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-3">
                    {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group w-28 h-28 border rounded-lg overflow-hidden shadow-sm">
                            <img
                                src={preview}
                                alt={`Preview ${index + 1}`}
                                className="object-cover w-full h-full"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md text-gray-600 hover:text-red-600 opacity-0 group-hover:opacity-100 transition"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </form>
    )
}
