import React from 'react'
import { ProductInput } from '../../../types/product';
interface ProductBasicInfoProps {
    handleChange :(field: string, value: any) => void;
    productData: ProductInput;
}
export const ProductBasicInfo: React.FC<ProductBasicInfoProps> = ({ productData, handleChange }) => {
    // const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target as HTMLInputElement;
    //     setProductData({ ...productData, [name]: value });
    // };
    return (
        <form className="space-y-4">
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Product Name</label>
                <input
                    type="text"
                    name="name"
                    value={productData?.name}
                    onChange={(e)=>{handleChange(e.target.name,e.target.value)}}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                    required
                />
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
                <textarea
                    name="description"
                    value={productData?.description}
                    onChange={(e)=>{handleChange(e.target.name,e.target.value)}}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                    rows={3}
                    required
                ></textarea>
            </div>

        </form>

    )
}
