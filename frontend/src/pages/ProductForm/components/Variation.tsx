import React, { useEffect, useState, useCallback } from "react";
import { CategoryAttribute } from "../../../types/category";
import { ProductInput } from "../../../types/product";

interface Props {
  attribute: CategoryAttribute;
  productData: ProductInput;
  handleChange: (field: string, value: any) => void;
}

const Variation: React.FC<Props> = ({ attribute, productData, handleChange }) => {
  const { id, name, type, options = [] } = attribute;
  const [priceStockStatus, setPriceStockStatus] = useState<{ isSamePrice: boolean; isSameStock: boolean; selectedOption: boolean }[]>([]);

  useEffect(() => {
    if (!options || options.length === 0) return;

    let updatedStatus = options.map(() => ({ isSamePrice: false, isSameStock: false, selectedOption: false }));

    if (productData.variations.length > 0) {
      productData.variations.forEach((variation) => {
        if (variation.name === name) {
          const optionIndex = options.findIndex(option => option === variation.value);

          if (optionIndex !== -1) {
            updatedStatus[optionIndex] = {
              isSamePrice: variation.price === productData.price,
              isSameStock: variation.stock === productData.stock,
              selectedOption: true,
            };
          }
        }
      });
    }

    setPriceStockStatus(updatedStatus);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, { key, option }: { key: string, option: string }) => {
    const { value } = e.target;
    handleChange('variations', productData.variations.map(variation =>
      variation.name === name && variation.value === option
        ? { ...variation, [key]: Number(value) }
        : variation
    ).concat(
      productData.variations.some(variation => variation.name === name && variation.value === option)
        ? []
        : [{ name, attributeId: id ?? 0, value: option, [key]: Number(value), price: key === 'price' ? Number(value) : 0, stock: key === 'stock' ? Number(value) : 0 }]
    ));
  }, [handleChange, name, productData.variations]);

  const handleCheckSelectChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, { key, option, index }: { key: 'price' | 'stock'; option: string, index: number }) => {
    const { checked } = e.target;
    setPriceStockStatus(priceStockStatus.map((data, i) => i === index ? { ...data, [key === 'stock' ? 'isSameStock' : 'isSamePrice']: checked } : data));
    handleChange('variations', productData.variations.map(variation =>
      variation.name === name && variation.value === option
        ? { ...variation, [key]: key === 'price' ? productData.price : productData.stock }
        : variation
    ).concat(
      productData.variations.some(variation => variation.name === name && variation.value === option)
        ? []
        : [{ name, attributeId: id ?? 0, value: option, [key]: Number(productData[key]), price: key === 'price' ? Number(productData.price) : 0, stock: key === 'stock' ? Number(productData.stock) : 0 }]
    ));
  }, [handleChange, name, productData, priceStockStatus]);

  const handleFieldChange = useCallback((value: string | number) => {
    const index = productData.variations.findIndex((variation) => variation.name === name);

    if (index !== -1) {
      const updatedVariations = productData.variations.map((variation, i) =>
        i === index ? { ...variation, value } : variation
      );

      handleChange('variations', updatedVariations);
    } else {
      handleChange('variations', [
        ...productData.variations,
        {
          name,
          attributeId: id,
          value,
          price: productData.price,
          stock: productData.stock,
        },
      ]);
    }
  }, [handleChange, name, productData]);

  const handleSelectOption = useCallback((index: number) => {
    setPriceStockStatus(priceStockStatus.map((data, i) => i === index ? { ...data, selectedOption: !data.selectedOption } : data));
  }, [priceStockStatus]);

  return (
    <>
      {type === "select" && (
        <>
          <div className="p-4 border-b text-lg font-semibold text-gray-700 capitalize">{name}</div>
          <div className="p-4 space-y-4">
            {options.map((option, index) => (
              <div key={option} className="p-4 border rounded-lg shadow-md bg-white">
                <div
                  className={`cursor-pointer p-4 border rounded-lg transition-all ${priceStockStatus[index]?.selectedOption ? "border-blue-500 bg-blue-100" : "border-gray-300 bg-white"}`}
                  onClick={() => handleSelectOption(index)}
                >
                  <div className="font-medium text-gray-800 capitalize">{option}</div>
                </div>
                {priceStockStatus[index]?.selectedOption && (
                  <>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      {!priceStockStatus[index]?.isSameStock && (
                        <input
                          placeholder="Stock"
                          value={productData.variations.find((variation) => variation.name === name && variation.value === option)?.stock || undefined}
                          name={`stock_${option}`}
                          onChange={(e) => handleInputChange(e, { key: 'stock', option })}
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                        />
                      )}
                      {!priceStockStatus[index]?.isSamePrice && (
                        <input
                          placeholder="Price"
                          value={productData.variations.find((variation) => variation.name === name && variation.value === option)?.price || undefined}
                          name={`price_${option}`}
                          onChange={(e) => handleInputChange(e, { key: 'price', option })}
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                        />
                      )}
                    </div>
                    <div className="mt-4 space-y-2">
                      <label className="flex items-center gap-2 text-gray-600">
                        <input
                          type="checkbox"
                          checked={priceStockStatus[index]?.isSameStock ?? false}
                          onChange={(e) => handleCheckSelectChange(e, { key: 'stock', option, index })}
                          className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
                        />
                        Same as total stock
                      </label>
                      <label className="flex items-center gap-2 text-gray-600">
                        <input
                          type="checkbox"
                          checked={priceStockStatus[index]?.isSamePrice ?? false}
                          onChange={(e) => handleCheckSelectChange(e, { key: 'price', option, index })}
                          className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
                        />
                        Same as total price
                      </label>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </>
      )}
      {type === "radio" && (
        <>
          <div className="p-4 border-b text-lg font-semibold text-gray-700 capitalize">{name}</div>
          <div className="p-4 space-y-4">
            {options.map((option) => (
              <label key={option} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer">
                <input
                  type="radio"
                  name={name}
                  value={option}
                  checked={!!productData.variations.find((variation) => variation.name === name && variation.value === option)}
                  onChange={() => handleFieldChange(option)}
                  className="w-5 h-5 text-blue-500 border-gray-300 focus:ring-blue-400"
                />
                <span className="font-medium text-gray-800 capitalize">{option}</span>
              </label>
            ))}
          </div>
        </>
      )}
      {type === "checkbox" && (
        <>
          <div className="p-4 border-b text-lg font-semibold text-gray-700 capitalize">{name}</div>
          <div className="p-4 space-y-3">
            {options.map((option) => (
              <label
                key={option}
                className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer bg-white hover:bg-gray-100 transition-all"
              >
                <input
                  type="checkbox"
                  name={name}
                  value={option}
                  checked={!!productData.variations.find(
                    (variation) => variation.name === name && variation.value === option
                  )}
                  onChange={() => handleFieldChange(option)}
                  className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
                />
                <span className="font-medium text-gray-800 capitalize">{option}</span>
              </label>
            ))}
          </div>
        </>
      )}
      {(type === "text" || type === "number") && (
        <>
          <div className="p-4 border-b text-lg font-semibold text-gray-700">{name}</div>
          <div className="p-4">
            <input
              type={type}
              placeholder="Enter value"
              value={productData.variations.find((variation) => variation.name === name)?.value || ""}
              onChange={(e) => handleFieldChange(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </>
      )}
    </>
  );
};

export default Variation;