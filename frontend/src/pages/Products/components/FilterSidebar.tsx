
import { useSearchParams } from 'react-router-dom';
import { Filter } from 'lucide-react';

const categories = [
  'Electronics',
  'Fashion',
  'Home & Living',
  'Books',
  'Sports',
  'Beauty',
];

const priceRanges = [
  { label: 'Under $25', value: '0-25' },
  { label: '$25 to $50', value: '25-50' },
  { label: '$50 to $100', value: '50-100' },
  { label: 'Over $100', value: '100-' },
];

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCategoryChange = (category: string) => {
    searchParams.set('category', category.toLowerCase());
    setSearchParams(searchParams);
  };

  const handlePriceChange = (range: string) => {
    searchParams.set('price', range);
    setSearchParams(searchParams);
  };

  return (
    <div className="w-64 flex-shrink-0">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-2 mb-6">
          <Filter className="h-5 w-5 text-gray-500" />
          <h2 className="text-lg font-semibold">Filters</h2>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-3">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <label key={category} className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    className="text-indigo-600"
                    onChange={() => handleCategoryChange(category)}
                    checked={searchParams.get('category') === category.toLowerCase()}
                  />
                  <span className="ml-2 text-gray-600">{category}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Price Range</h3>
            <div className="space-y-2">
              {priceRanges.map((range) => (
                <label key={range.value} className="flex items-center">
                  <input
                    type="radio"
                    name="price"
                    className="text-indigo-600"
                    onChange={() => handlePriceChange(range.value)}
                    checked={searchParams.get('price') === range.value}
                  />
                  <span className="ml-2 text-gray-600">{range.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;