
import { Star, ThumbsUp } from 'lucide-react';

interface ProductReviewsProps {
  productId: string;
}

const ProductReviews = ({ productId }: ProductReviewsProps) => {
  // This would fetch from your reviews table in Supabase
  const reviews = [
    {
      id: 1,
      user: 'John D.',
      rating: 5,
      comment: 'Excellent product! Exactly what I was looking for.',
      date: '2024-02-15',
      helpful: 12
    },
    {
      id: 2,
      user: 'Sarah M.',
      rating: 4,
      comment: 'Good quality but shipping took longer than expected.',
      date: '2024-02-10',
      helpful: 8
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Customer Reviews</h2>
        
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-6 last:border-b-0 last:pb-0">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-medium text-gray-900">{review.user}</p>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              
              <p className="text-gray-600 mt-2">{review.comment}</p>
              
              <button className="flex items-center text-sm text-gray-500 mt-3 hover:text-gray-700">
                <ThumbsUp className="h-4 w-4 mr-1" />
                Helpful ({review.helpful})
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;