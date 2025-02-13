import { useEffect, useState } from "react";
import { CategoryAttribute } from "../../../types/category";
import { ProductInput } from "../../../types/product";

interface Props {
  attribute: CategoryAttribute;
  productData: ProductInput;
  handleChange: (field: string, value: any) => void;
}

const Variation: React.FC<Props> = ({ attribute, productData, handleChange }) => {
  const { name, type, options = [] } = attribute;
  const [priceStockStatus, setPriceStockStatus] = useState<{ isSamePrice: boolean; isSameStock: boolean; selectedOption: boolean }[]>([]);

  useEffect(() => {
    if (!options || options.length === 0) return;

    let updatedStatus = options.map(() => ({ isSamePrice: false, isSameStock: false, selectedOption: false }));

    if (productData.variations.length > 0) {
      productData.variations.forEach((variation) => {
        if (variation.name === name) {
          const optionIndex = options.findIndex(option => option == variation.value);

          if (optionIndex !== -1) {
            updatedStatus[optionIndex] = {
              isSamePrice: variation.price == productData.price,
              isSameStock: variation.stock == productData.stock,
              selectedOption: true,
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

  const handleRadioChange = (option: string) => {
    const index = productData.variations.findIndex((variation) => variation.name === name);
  
    if (index !== -1) {
      const updatedVariations = productData.variations.map((variation, i) =>
        i === index ? { ...variation, value: option } : variation
      );
  
      handleChange('variations', updatedVariations);
    } else {
      handleChange('variations', [
        ...productData.variations,
        {
          name,
          value: option,
          price: productData.price,
          stock: productData.stock,
        },
      ]);
    }
  };

  const handleTextChange = (value : string | number)=>{
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
          value,
          price: productData.price,
          stock: productData.stock,
        },
      ]);
    }
  }

  const handleSelectOption = (index: number) => {
    setPriceStockStatus(priceStockStatus.map((data, i) => i === index ? { ...data, selectedOption: !data.selectedOption } : { ...data }));
  }

  return (
    <>
      {type === "select" && (
        <><div className="p-4 border-b text-lg font-semibold text-gray-700 capitalize">{name}</div><div className="p-4 space-y-4">
          {options.map((option, index) => (
            <div key={option} className="p-4 border rounded-lg shadow-md bg-white">
              {/* Option Name */}
              <div
                className={`cursor-pointer p-4 border rounded-lg transition-all ${priceStockStatus[index]?.selectedOption ? "border-blue-500 bg-blue-100" : "border-gray-300 bg-white"}`}
                onClick={() => handleSelectOption(index)}
              >
                <div className="font-medium text-gray-800 capitalize">{option}</div>
              </div>
              {priceStockStatus[index]?.selectedOption && <>

                {/* Inputs */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {!priceStockStatus[index]?.isSameStock && (
                    <input
                      placeholder="Stock"
                      value={productData.variations.find((variation) => variation.name === name && variation.value === option)?.stock || undefined}
                      name={`stock_${option}`}
                      onChange={(e) => handleInputChange(e, { key: 'stock', option })}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400" />
                  )}

                  {!priceStockStatus[index]?.isSamePrice && (
                    <input
                      placeholder="Price"
                      value={productData.variations.find((variation) => variation.name === name && variation.value === option)?.price || undefined}
                      name={`price_${option}`}
                      onChange={(e) => handleInputChange(e, { key: 'price', option })}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400" />
                  )}
                </div>

                {/* Checkboxes */}
                <div className="mt-4 space-y-2">
                  <label className="flex items-center gap-2 text-gray-600">
                    <input
                      type="checkbox"
                      checked={priceStockStatus[index]?.isSameStock ?? false}
                      onChange={(e) => handleCheckboxChange(e, { key: 'stock', option, index })}
                      className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400" />
                    Same as total stock
                  </label>

                  <label className="flex items-center gap-2 text-gray-600">
                    <input
                      type="checkbox"
                      checked={priceStockStatus[index]?.isSamePrice ?? false}
                      onChange={(e) => handleCheckboxChange(e, { key: 'price', option, index })}
                      className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400" />
                    Same as total price
                  </label>
                </div>
              </>}
            </div>
          ))}
        </div>
        </>)}
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
                  checked={!!productData.variations.find((variation) => variation.name == name && variation.value == option)}
                  onChange={() => handleRadioChange(option)}
                  className="w-5 h-5 text-blue-500 border-gray-300 focus:ring-blue-400"
                />
                <span className="font-medium text-gray-800 capitalize">{option}</span>
              </label>
            ))}
          </div>
        </>
      )}
      {type === "text" || type === "number" && (
        <>
          <div className="p-4 border-b text-lg font-semibold text-gray-700">{name}</div>
          <div className="p-4">
            <input
              type={type}
              placeholder="Enter value"
              value={productData.variations.find((variation) => variation.name == name )?.value || ""}
              onChange={(e) => handleTextChange(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </>
      )}
    </>
  )
};
export default Variation;