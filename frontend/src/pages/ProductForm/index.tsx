
import { useNavigate } from 'react-router-dom';
import './styles/productForm.css'
import { ProductBasicInfo } from './components/ProductBasicInfo';
import { useEffect, useState } from 'react';
import { CategorySelection } from './components/CategorySelection';
import { Pricing } from './components/Pricing';
import { UploadImages } from './components/UploadImages';
import { addProduct } from '../../api';
import { ProductInput } from '../../types/product';
import toast from 'react-hot-toast';
import Variation from './components/Variation';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Category, CategoryAttribute } from '../../types/category';

const ProductForm = () => {
  const navigate = useNavigate();

  const [productData, setProductData] = useState<ProductInput>({
    name: '',
    price: 0,
    stock: 0,
    description: '',
    categoryId: -1,
    currency: 'INR',
    images: [] as File[],
    variations :[],
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [currentStep, setCurrentStep] = useState(0);
  const categories = useSelector((state: RootState) => state.category);
  const [attributes, setAttributes] = useState<
    CategoryAttribute[]
  >([]);
  useEffect(() => {
    if (categories.length && productData.categoryId) {
      console.log(productData.categoryId)
      let cat = categories.find((cat: Category) => cat.id == productData.categoryId);
      console.log(cat)
      if (cat) {
        setAttributes([...attributes, ...cat.attributes]);
      }
    }
  }, [categories.length, productData.categoryId])

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    if (!productData.name.trim()) {
      newErrors.name = "Product name is required.";
    }
    if (!productData.price || productData.price <= 0) {
      newErrors.price = "Price must be greater than 0.";
    }
    if (!productData.description.trim()) {
      newErrors.description = "Description is required.";
    }
    if (productData.categoryId === -1) {
      newErrors.categoryId = "Please select a category.";
    }
    if (!productData.currency.trim()) {
      newErrors.currency = "Currency is required.";
    }
    if (productData.images.length === 0) {
      newErrors.images = "At least one image is required.";
    }

    if (productData.variations.length === 0) {
      newErrors.variations = "Please fill attributes.";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("price", productData.price.toString());
    formData.append("stock", productData.stock.toString());
    formData.append("description", productData.description);
    formData.append("categoryId", productData.categoryId.toString());
    formData.append("currency", productData.currency);

    formData.append("variations", JSON.stringify(productData.variations));

    productData.images.forEach((file) => {
      formData.append("images", file);
    });
    addProduct(formData).then((res) => {
      toast.success((res.data as { message: string }).message);
      setProductData({
        name: "",
        price: 0,
        stock: 0,
        description: "",
        categoryId: -1,
        currency: "",
        images: [],
        variations : [],
      });
      setCurrentStep(0);

    }).catch((err) => {
      toast.error('Error Ocurred');
    })

  };

  const handleChange = (field: string, value: any) => {
    setProductData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setErrors({})
  };

  const goToNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1); // Move to the next step
  };

  const goToPreviousStep = () => {
    setCurrentStep((prevStep) => Math.max(0, prevStep - 1)); // Go back, ensure not less than 0
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Add a Product</h2>
          <div className="flex space-x-2">
            {[0, 1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`h-3 w-3 rounded-full ${currentStep === step ? "bg-blue-500" : "bg-gray-300"
                  }`}
              ></div>
            ))}
          </div>
        </div>

        {currentStep === 0 && (
          <CategorySelection
            productData={productData}
            handleChange={handleChange}
          />
        )}
        {currentStep === 1 && (
          <ProductBasicInfo
            productData={productData}
            handleChange={handleChange}
          />
        )}
        {currentStep === 2 && (
          <Pricing
            productData={productData}
            handleChange={handleChange}
          />
        )}
        {currentStep === 3 && (
          <>
            {attributes.map((attr) => (
              <Variation
                productData={productData}
                key={attr.id}
                attribute={attr}
                handleChange={handleChange}
              />
            ))}
          </>
        )}
        {currentStep === 4 && (
          <UploadImages
            productData={productData}
            handleChange={handleChange}
          />
        )}

        <div className="flex justify-between mt-6">
          {currentStep > 0 && (
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
              onClick={goToPreviousStep}
            >
              Back
            </button>
          )}
          {currentStep < 4 ? (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition ml-auto"
              onClick={goToNextStep}
            >
              Next
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition ml-auto"
              onClick={handleFormSubmit}
            >
              Submit
            </button>
          )}
        </div>
        {Object.keys(errors).length > 0 && (
          <div className="text-red-500 mt-2">
            {Object.entries(errors).map(([key, value]) => (
              <p key={key}>{value}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductForm;