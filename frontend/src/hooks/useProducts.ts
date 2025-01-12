import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Product } from '../types/product';
import { fetchProducts } from './api';

interface UseProductsOptions {
  category?: string | null;
  sort?: string;
}
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Earbuds",
    description: "High-quality wireless earbuds with noise cancellation.",
    price: 99.99,
    category: "electronics",
    images: ["https://via.placeholder.com/150"],
    stock: 50,
    rating: 4.5,
    reviews: 120,
    seller: {
      id: "seller1",
      name: "Tech Corp",
    },
  },
  {
    id: "2",
    name: "Running Shoes",
    description: "Lightweight running shoes for everyday use.",
    price: 59.99,
    category: "footwear",
    images: ["https://via.placeholder.com/150"],
    stock: 30,
    rating: 4.2,
    reviews: 85,
    seller: {
      id: "seller2",
      name: "Fit Gear",
    },
  },
  {
    id: "3",
    name: "Smartphone",
    description: "Latest model with cutting-edge features.",
    price: 699.99,
    category: "electronics",
    images: ["https://via.placeholder.com/150"],
    stock: 20,
    rating: 4.8,
    reviews: 200,
    seller: {
      id: "seller1",
      name: "Tech Corp",
    },
  },
  {
    id: "4",
    name: "Office Chair",
    description: "Ergonomic office chair with adjustable height.",
    price: 149.99,
    category: "furniture",
    images: ["https://via.placeholder.com/150"],
    stock: 15,
    rating: 4.3,
    reviews: 60,
    seller: {
      id: "seller3",
      name: "Home Essentials",
    },
  },
  {
    id: "5",
    name: "Gaming Laptop",
    description: "High-performance laptop for gaming and productivity.",
    price: 1299.99,
    category: "electronics",
    images: ["https://via.placeholder.com/150"],
    stock: 10,
    rating: 4.7,
    reviews: 140,
    seller: {
      id: "seller4",
      name: "Elite Tech",
    },
  },
];
export const useProducts = ({ category, sort }: UseProductsOptions = {}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     let query = supabase.from('products').select('*');

  //     if (category) {
  //       query = query.eq('category', category);
  //     }

  //     if (sort) {
  //       const [field, order] = sort.split('-');
  //       query = query.order(field, { ascending: order === 'asc' });
  //     }

  //     const { data, error } = await query;

  //     if (error) {
  //       console.error('Error fetching products:', error);
  //       return;
  //     }

  //     setProducts(data);
  //     setIsLoading(false);
  //   };

  //   fetchProducts();
  // }, [category, sort]);
  useEffect(() => {
    const filteredProducts =
      category && category !== "all"
        ? mockProducts.filter((product) => product.category === category)
        : mockProducts;

    const sortedProducts = sort
      ? [...filteredProducts].sort((a, b) => {
          if (sort === "price-asc") {
            console.log(a.price, b.price);
            return a.price - b.price; 
          }
          if (sort === "price-desc") {
            return b.price - a.price; 
          }
          return 0;
        })
      : filteredProducts;
  
    setProducts(filteredProducts);
    setIsLoading(false);
  }, [category, sort]);
  

  return { products, isLoading };
};

export const useFeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const fetchFeaturedProducts = async () => {
  //     const { data, error } = await supabase
  //       .from('products')
  //       .select('*')
  //       .eq('featured', true)
  //       .limit(3);

  //     if (error) {
  //       console.error('Error fetching featured products:', error);
  //       return;
  //     }

  //     setProducts(data);
  //     setIsLoading(false);
  //   };

  //   fetchFeaturedProducts();
  // }, []);
  useEffect(() => {
    const fetchFeaturedProducts = () => {
      const featuredProducts = mockProducts.filter((product) => product.featured).slice(0, 3);
      setProducts(featuredProducts);
      setIsLoading(false);
    };

    fetchFeaturedProducts();
  }, []);
  return { products, isLoading };
};

export const useProduct = (id?: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching product:', error);
        return;
      }

      setProduct(data);
      setIsLoading(false);
    };

    fetchProduct();
  }, [id]);

  return { product, isLoading };
};