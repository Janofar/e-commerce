import React from 'react'
interface ProductBasicInfoProps {
    setProductData: (data: any) => void;
    goToNextStep: (data: any) => void;
    goToPreviousStep: (data: any) => void;
    productData: {
        name: string;
        price: number;
        description: string;
        category: string;
        imagePaths: string[] | null;
    } | null;
}
export const ProductBasicInfo: React.FC<ProductBasicInfoProps> = ({ productData, setProductData, goToNextStep, goToPreviousStep }) => {
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target as HTMLInputElement;
        setProductData({ ...productData, [name]: value });
    };
    return (
        <form className="space-y-4">
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Product Name</label>
                <input
                    type="text"
                    name="name"
                    value={productData?.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                    required
                />
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
                <textarea
                    name="description"
                    value={productData?.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                    rows={3}
                    required
                ></textarea>
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
