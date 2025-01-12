
import { useSearchParams } from 'react-router-dom';

const sortOptions = [
  { label: 'Latest', value: 'created_at-desc' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Most Popular', value: 'popularity-desc' },
];

const ProductSort = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set('sort', e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <select
      className="block w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      onChange={handleSort}
      value={searchParams.get('sort') || 'created_at-desc'}
    >
      {sortOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default ProductSort;