import { useEffect, useState } from "react";
import { CategoryAttribute } from "../../../types/category";
import { ProductInput } from "../../../types/product";

interface Props {
  attribute: CategoryAttribute;
  productData: ProductInput;
  handleChange: (field: string, value: any) => void;
}


const Variation: React.FC<Props> = ({ attribute, productData, handleChange }) => {
  const { name, options = [] } = attribute;
  const [priceStockStatus, setPriceStockStatus] = useState<{ isSamePrice: boolean; isSameStock: boolean; }[]>([]);

  useEffect(() => {
    if (options.length === 0) return;

    let updatedStatus = options.map(() => ({ isSamePrice: false, isSameStock: false }));

    if (productData.variations.length > 0) {
      productData.variations.forEach((variation) => {
        if (variation.name === name) {
          const optionIndex = options.findIndex(option => option == variation.value);

          if (optionIndex !== -1) {
            updatedStatus[optionIndex] = {
              isSamePrice: variation.price == productData.price,
              isSameStock: variation.stock == productData.stock,
            };
          }
        }
      });
    }

    setPriceStockStatus(updatedStatus);
  }, []);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, { key, option }: { key: string, option: string }) => {
    const { value } = e.target;
    if (key === "stock") {
      handleChange('variations', productData.variations.map(variation =>
        variation.name === name && variation.value === option
          ? { ...variation, stock: Number(value) }
          : variation
      ).concat(
        productData.variations.some(variation => variation.name === name && variation.value === option)
          ? []
          : [{ name, value: option, stock: Number(value), price: 0 }]
      ));

    } else if (key === 'price') {

      handleChange('variations', productData.variations.map(variation =>
        variation.name === name && variation.value === option
          ? { ...variation, price: Number(value) }
          : variation
      ).concat(
        productData.variations.some(variation => variation.name === name && variation.value === option)
          ? []
          : [{ name, value: option, stock: 0, price: Number(value) }]
      ));

    }

  }
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, { key, option, index }: { key: string; option: string, index: number }) => {
    const { checked } = e.target;
    if (key === "stock") {
      setPriceStockStatus(priceStockStatus.map((data, i) => i === index ? { ...data, isSameStock: checked } : data));
      handleChange('variations', productData.variations.map(variation =>
        variation.name === name && variation.value === option
          ? { ...variation, stock: Number(productData.stock) }
          : variation
      ).concat(
        productData.variations.some(variation => variation.name === name && variation.value === option)
          ? []
          : [{ name, value: option, stock: Number(productData.stock), price: 0 }]
      ));

    } else if (key === 'price') {
      setPriceStockStatus(priceStockStatus.map((data, i) => i === index ? { ...data, isSamePrice: checked } : data));
      handleChange('variations', productData.variations.map(variation =>
        variation.name === name && variation.value === option
          ? { ...variation, price: Number(productData.price) }
          : variation
      ).concat(
        productData.variations.some(variation => variation.name === name && variation.value === option)
          ? []
          : [{ name, value: option, stock: 0, price: Number(productData.price) }]
      ));

    }
  };

  return (
    <>
      <div className="p-4 border-b text-lg font-semibold text-gray-700">{name}</div>

      <div className="p-4 space-y-4">
        {options.map((option, index) => (
          <div key={option} className="p-4 border rounded-lg shadow-md bg-white">
            {/* Option Name */}
            <div className="font-medium text-gray-800 mb-2">{option}</div>

            {/* Inputs */}
            <div className="grid grid-cols-2 gap-4">
              {!priceStockStatus[index]?.isSameStock && (
                <input
                  placeholder="Stock"
                  name={`stock_${option}`}
                  onChange={(e) => handleInputChange(e, { key: 'stock', option })}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                />
              )}

              {!priceStockStatus[index]?.isSamePrice && (
                <input
                  placeholder="Price"
                  name={`price_${option}`}
                  onChange={(e) => handleInputChange(e, { key: 'price', option })}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                />
              )}
            </div>

            {/* Checkboxes */}
            <div className="mt-4 space-y-2">
              <label className="flex items-center gap-2 text-gray-600">
                <input
                  type="checkbox"
                  checked={priceStockStatus[index]?.isSameStock ?? false}
                  onChange={(e) => handleCheckboxChange(e, { key: 'stock', option, index })}
                  className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
                />
                Same as total stock
              </label>

              <label className="flex items-center gap-2 text-gray-600">
                <input
                  type="checkbox"
                  checked={priceStockStatus[index]?.isSamePrice ?? false}
                  onChange={(e) => handleCheckboxChange(e, { key: 'price', option, index })}
                  className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
                />
                Same as total price
              </label>
            </div>
          </div>
        ))}
      </div>
    </>

  )
};
export default Variation;