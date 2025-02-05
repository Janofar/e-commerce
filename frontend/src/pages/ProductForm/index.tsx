
import { useNavigate } from 'react-router-dom';
import './styles/productForm.css'
import { ProductBasicInfo } from './components/ProductBasicInfo';
import { useState } from 'react';
import { CategorySelection } from './components/CategorySelection';
import { Pricing } from './components/Pricing';
import { UploadImages } from './components/UploadImages';

const ProductForm = () => {
  const navigate = useNavigate();

  
  const [productData, setProductData] = useState({
    name: '',
    price: 0,
    description: '',
    category: '',
    subCategory : '',
    currency: '',
    images: [] as File[],
    imagePaths: null as string[] | null,
  });
  const [currentStep, setCurrentStep] = useState(0);
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(productData,"product data")
    return;
    setProductData(
      {
        name: '',
        price: 0,
        description: '',
        category: '',
        subCategory : '',
        currency: '',
        images: [],
        imagePaths: null,
      });
      setCurrentStep(0);
  };
  const goToNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1); // Move to the next step
  };

  const goToPreviousStep = () => {
    setCurrentStep((prevStep) => Math.max(0, prevStep - 1)); // Go back, ensure not less than 0
  };
  return (
    <div className="product-form-page">
      {currentStep === 0 && (
        <CategorySelection
          goToNextStep={goToNextStep}
          productData={productData}
          setProductData={setProductData}
        />
      )}
      {currentStep === 1 && (
        <ProductBasicInfo
          goToPreviousStep={goToPreviousStep}
          goToNextStep={goToNextStep}
          productData={productData}
          setProductData={setProductData}
        />
      )}

      {currentStep === 2 && (
        <Pricing
          goToNextStep={goToNextStep}
          goToPreviousStep={goToPreviousStep}
          productData={productData}
          setProductData={setProductData}
        />
      )}
      {currentStep === 3 && (
        <UploadImages
          handleFormSubmit = {handleFormSubmit}
          goToPreviousStep={goToPreviousStep}
          productData={productData}
          setProductData={setProductData}
        />
      )}
    </div>
  );
};

export default ProductForm;