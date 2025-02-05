import React from 'react'
interface PricingProps {
    setProductData: (data: any) => void;
    goToNextStep: (data: any) => void;
    goToPreviousStep: (data: any) => void;
    productData: {
        name: string;
        price: number;
        description: string;
        category: string;
        currency: string;
        imagePaths: string[] | null;
    } | null;
}
export const Pricing: React.FC<PricingProps> = ({ productData, setProductData, goToNextStep, goToPreviousStep }) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    return (
        <form className="space-y-4">
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Price</label>
                <div className="flex items-center space-x-2">
                    <select
                        name="currency"
                        value={productData?.currency}
                        onChange={handleChange}
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
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                        placeholder={`Enter price in ${productData?.currency}`}
                        required
                    />
                </div>
            </div>
            <button
                type="button"
                onClick={goToPreviousStep}
                className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300"
            >
                previous
            </button>
            <button
                type="button"
                onClick={goToNextStep}
                className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300"
            >
                Next
            </button>
        </form>

    )
}
