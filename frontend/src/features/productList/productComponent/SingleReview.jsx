import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
const SingleReview = ({ review }) => {
  const [index,setIndex] = useState(0);
  const [chars,setChars] = useState(500);
  console.log(review);
  console.log(String(review.comment, " ").length, chars);
  // const 
  return (
    <div className="border-1 rounded-md mt-2">
      {/* Title  */}
      {/* Profile Pic - Name - Purchase Verified*/}
      <div className="flex justify-between items-center w-[300px] my-4 ml-4">
        <div className="w-10 h-10 rounded-full">
          <img
            src={review.user.profilePic}
            alt=""
            className="w-full h-full object-contain rounded-full"
          />
        </div>
        <h1>{review.user.name}</h1>
        <h1 style={{ color: "green" }}>{"Purchase Verified"}</h1>
      </div>
      <div className="border-b-4"></div>
      <div className="text-small font-medium tracking-tight sm:text-3xl my-5 ml-5 flex gap-x-5">
        <div className="inline-block min-w-[100px]">
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
      {/* Comment Section */}
      {chars >= String(review.comment).length ? (
        <div className="mx-5 my-5 ">
          <p className="inline text-gray-900">
            {review.comment.slice(0, chars)}
          </p>
          {review.comment.length > 500 && (
            <button
              type="button"
              className="inline cursor-pointer"
              style={{ color: "blue" }}
              onClick={() => {
                setChars(500);
              }}
            >
              Show Less
            </button>
          )}
        </div>
      ) : (
        <div className="mx-5 my-5 ">
          <p className="inline text-gray-900">
            {review.comment.slice(0, chars)}
          </p>
          {review.comment.length > 500 && (
            <button
              type="button"
              className="inline cursor-pointer"
              style={{ color: "blue" }}
              onClick={() => {
                setChars((s) => s + 500);
              }}
            >
              Show More
            </button>
          )}
        </div>
      )}
      <div className="px-5 mb-5">
        {/* Horizontally Scrollable Image Gallery */}
        {/* <div className="scrollableImageContainer"> */}
        {review.assets.length != 0 && (
          <div className="h-[300px] w-full flex justify-between">
            <button
              type="button"
              className="cursor-pointer"
              onClick={() => {
                setIndex((s) => {
                  const newIndex =
                    (s - 1 + review.assets.length) % review.assets.length;
                  return newIndex;
                });
              }}
            >
              Previous
            </button>
            <div className="h-full w-[300px] inline-block">
              {review.assets[index].type == "image" && (
                <img
                  src={review.assets[index].url}
                  alt="reviewVideo"
                  className="w-full h-full inline object-contain"
                />
              )}
              {review.assets[index].type == "video" && (
                <video
                  controls
                  width="500"
                  height="500"
                  src={review.assets[index].url}
                  alt="reviewVide"
                  className="w-full h-full inline object-contain border-1"
                />
              )}
            </div>
            <button
              type="button"
              className="cursor-pointer"
              onClick={() => {
                setIndex((s) => {
                  const newIndex = (s + 1) % review.assets.length;
                  return newIndex;
                });
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleReview
