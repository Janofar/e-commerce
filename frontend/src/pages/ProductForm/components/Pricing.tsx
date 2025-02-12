import React from 'react'
import { ProductInput } from '../../../types/product';
interface PricingProps {
    handleChange :(field: string, value: any) => void;
    productData: ProductInput;
}
export const Pricing: React.FC<PricingProps> = ({ productData, handleChange }) => {
    // const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target;
    //     setProductData({ ...productData, [name]: value });
    // };

    return (
        <form className="space-y-4">
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Price</label>
                <div className="flex items-center space-x-2">
                    <select
                        name="currency"
                        value={productData?.currency}
                        onChange={(e)=>{handleChange(e.target.name,e.target.value)}}
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
                        value={productData?.price || ''}
                        onChange={(e)=>{handleChange(e.target.name,e.target.value)}}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                        placeholder={`Enter price in ${productData?.currency}`}
                        required
                    />
                </div>
            </div> 
            <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Stock</label>
            <input
                type="number"
                name="stock"
                value={productData?.stock || ''}
                onChange={(e)=>{handleChange(e.target.name,e.target.value)}}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                placeholder={`Enter stock`}
                required
            />
            </div>
        </form>

    )
}
