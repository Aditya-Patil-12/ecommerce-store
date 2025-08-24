import React from 'react'
import SingleReview from './SingleReview'
import { useSelector } from 'react-redux';
const ProductReviews = () => {
  const data = useSelector((state) => state.review.reviews);
  console.log(data);
  
  return (
    <div className="px-5">
      {data.map((review) => {
        return <SingleReview review={review} />;
      })}
    </div>
  );
}

export default ProductReviews
