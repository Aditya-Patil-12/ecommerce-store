import { useDispatch,useSelector } from "react-redux";
import {useState,useEffect} from 'react'
import { getReviewAsync } from "../../review/ReviewSlice";
import { MdDelete } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { deleteReviewAsync } from "../../review/ReviewSlice";
import { Link } from "react-router";
const UserReviews = () => {
  const dispatch = useDispatch();
  const reviews = useSelector((state)=>state.review.reviews);
  useEffect(()=>{
    dispatch(getReviewAsync());
  },[]);
  console.log(reviews);
  return (
    <div className="w-full h-full ">
      <div className="banner p-5 text-2xl font-bold tracking-tight text-gray-900">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          My Reviews
        </h1>
      </div>
      <div className="revierCon">
        {
          reviews.map((review,index)=>{
            return (
              <div className="border-1 rounded-md p-2 m-2">
                <div className="banner flex justify-between border-b-1">
                  <div className="flex items-center">
                    <div className="productImage w-[50px] h-[50px]">
                      <img
                        src={review.product.thumbnail}
                        alt=""
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <Link className="text-xl font-bold tracking-tight text-gray-900 cursor-pointer underline"
                       to={"/review/edit/"+`${review._id}`}>
                        {review.product.title}
                      </Link>
                      {/* <h1>{review.product.name}</h1> */}
                    </div>
                  </div>
                  <div className="flex gap-x-2 items-baseline text-xl">
                    <MdDelete
                      className="cursor-pointer text-red-500 rounded-md text-2xl"
                      onClick={async () => {
                        dispatch(deleteReviewAsync(review._id))
                      }}
                    />
                  </div>
                </div>
                <div className="footer">
                  <div className="text-small font-medium tracking-tight my-5 ml-5 flex gap-x-5 items-baseline">
                    <div className="inline-block min-w-[50px]">
                      <div className="flex gap-x-5">
                        {Array.from({ length: 5 }).map((_, index) => {
                          if (review.rating - (index + 1) >= 0) {
                            return <FaStar className="text-amber-400" />;
                          } else {
                            return <FaStar />;
                          }
                        })}
                      </div>
                    </div>
                    <h1 className="text-small font-medium tracking-tight sm:text-3xl inline">
                      {review.title}
                    </h1>
                  </div>
                  <div className="pl-10">
                    {review.comment}
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

export default UserReviews
