import React from "react";
import { useNavigate, useSearchParams } from "react-router";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import { FaStarHalfAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { createReviewAsync } from "../features/review/ReviewSlice";
import { useDispatch } from "react-redux";
const ReviewPage = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useSearchParams();
  const [rating,setRating] = useState(0);
  const [hoverRating,setHoverRating] = useState(0);
  const order = query.get("order");
  const product = query.get("product");
  const thumbnail = query.get("thumbnail");
  const navigate = useNavigate();
  console.log(order, " ", product," ",rating," ",hoverRating);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(e.target);
    const data = new FormData(e.target);
    // const resp = Object.fromEntries(data.entries());
    // console.log(data, " ", Object.fromEntries(data.entries()));
    if( rating == 0 ) {
      toast.warning("Please Give Atleast 1 Rating");
    }
    if( data.get("title").title == "" ){
      toast.warning("Please Give Provide Tile");
    }
    if( data.get("comment") == "" ){
      toast.warning("Please Write Comment");
    }
    // console.log(e.target);
    // product & rating
    // console.log({rating,product,...resp})
    data.append("product",product);
    data.append("rating",rating);
    const resp = await dispatch(createReviewAsync(data));
    if( resp.payload.success ){
      toast.success('Review Recoreded Succesfull');
      navigate("/orders");
    }
    else{
      toast.error("Error While Recoding Review\n");
    }
  };
  return (
    <div>
      <h1 className="text-3xl font-medium text-gray-900">Create Review</h1>
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-1 bg-white mt-5 min-h-[50px]">
        <div className="heading flex items-center gap-5 mb-5 mx-auto">
          <div className="bannner w-[100px] h-[100px] rounded-full ">
            <img
              src={thumbnail}
              alt=""
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          <h1 className='text-xl font-medium text-gray-900"'>
            Describe you Views About Product
          </h1>
        </div>
        <form
          onSubmit={submitHandler}
          className="p-5"
          encType="multipart/form-data"
        >
          <div className="flex flex-col my-5">
            <label htmlFor="title"> Rate Product*</label>
            <div className="flex gap-x-2">
              <div className="inline">
                <div className="flex gap-x-7">
                  {Array.from({ length: 5 }).map((_, index) => {
                    return (
                      <FaStar
                        onMouseEnter={() => {
                          setHoverRating(index + 1);
                        }}
                        onMouseLeave={() => {
                          setHoverRating(0);
                        }}
                        onClick={() => {
                          setRating(index + 1);
                        }}
                        className={
                          "cursor-pointer text-3xl " +
                          (hoverRating >= index + 1 || rating >= index + 1
                            ? "text-amber-400"
                            : "")
                        }
                      />
                    );
                  })}
                </div>
              </div>
              {rating > 0 && (
                <button
                  type="button"
                  onClick={() => setRating(0)}
                  className="text-blue-700 w-[10px] inline-block cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-col my-5">
            <label htmlFor="title"> Title For Review*</label>
            <input
              type="text"
              name="title"
              id="title"
              className="w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>

          <div className="flex flex-col my-5">
            <label htmlFor="textReview">Describe Your Views*</label>
            <textarea
              type=""
              name="comment"
              id="textReview"
              className='"w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"'
            />
          </div>

          <div className="my-5">
            <button type="button" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer">
              <label htmlFor="files" className="w-[100px] cursor-pointer">
                Upload Multiple Videos and Files all at once
              </label>
              <input
                type="file"
                name="images"
                id="files"
                multiple
                accept="image/*,video/*"
                onTouchCancel={(e) => console.log("Touch Cancel")}
                onChange={(e) => {
                  console.log(e.target.files);
                }}
                style={{
                  opacity: 0.5,
                  border: "1px solid red",
                  width: "0px",
                  height: "0px",
                }}
              />
            </button>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewPage;
