import { useNavigate, useParams } from "react-router";
import { FaStar } from "react-icons/fa";
import { useState,useEffect } from "react";
import { toast } from "react-toastify";
import { editReviewAsync } from "../features/review/ReviewSlice";
import { useDispatch,useSelector } from "react-redux";
import { setCurrrentReview } from "../features/review/ReviewSlice";
import { FaEdit } from "react-icons/fa";
import { MdCancel, MdTitle } from "react-icons/md";
const ReviewEditPage = () => {
  console.log("Hello\n");
  const dispatch = useDispatch();
  const {id:reviewId} = useParams();
  const currentReview = useSelector((state)=>state.review.currentReview);
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [comment,setComment] = useState("");
  const [title,setTitle] = useState("");
  const [hoverRating, setHoverRating] = useState(0);
  const [isEdit,setEdit] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();
    if( rating == 0 ){
        toast.warning("Please Give Atleast 1 Rating");
    }
    if( title == "" ){
        toast.warning("Please Title For Review");
    }
    if( comment == "" ){
        toast.warning("Please Provide Comment");
    }
    const resp = await dispatch(
      editReviewAsync({ ...currentReview, rating, title, comment })
    );
    if (resp.payload.success) {
      toast.success("Review Edited Succesfull");
      navigate("/profile");
    } else {
      toast.error("Error While Editing Review\n");
    }
  };
  useEffect(()=>{
    const help = async ()=>{
        console.log( dispatch(setCurrrentReview(reviewId)));
        console.log(currentReview);
        
        setRating(currentReview.rating);
        setTitle(currentReview.title);
        setComment(currentReview.comment);
    }
    help();
  },[])
  console.log(currentReview);
  
  return (
    <div>
      {/* <h1 className="text-3xl font-medium text-gray-900">My Review</h1> */}
      {/* grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-1 */}
      <div className=" bg-white mt-5 px-2">
        <div className="heading flex items-center justify-between gap-5 mb-5 mx-auto ">
          <div>
            <h1 className='text-2xl font-medium text-gray-900"'>My Review</h1>
            <div className="flex items-center gap-5 ">
              <div className="bannner w-[100px] h-[100px] rounded-full ">
                <img
                  src={currentReview.product.thumbnail}
                  alt=""
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <h1>{currentReview?.product?.title}</h1>
              </div>
            </div>
          </div>
          <div className="">
            {!isEdit ? (
              <div className="pr-2 text-right w-full cursor-pointer">
                <FaEdit
                  onClick={() => {
                    setEdit((e) => !e);
                  }}
                  className="text-xl"
                />
              </div>
            ) : (
              <div className="pr-2 text-right  w-full cursor-pointer">
                <MdCancel
                  onClick={() => {
                    setEdit((e) => !e);
                  }}
                  className="text-xl"
                />
              </div>
            )}
          </div>
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
                          if (!isEdit) return;
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
              {rating > 0 && isEdit && (
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={!isEdit}
              className="w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>

          <div className="flex flex-col my-5">
            <label htmlFor="textReview">Describe Your Views*</label>
            <textarea
              type=""
              rows={6}
              name="comment"
              id="textReview"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              disabled={!isEdit}
              className='"w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"'
            />
          </div>

          {/* <div className="my-5">
            <button
              type="button"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
            >
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
          </div> */}
          <div className="flex justify-end">
            <div className="flex justify-end gap-x-10">
              {
                <button
                  type="button"
                  onClick={() => {
                    navigate(-1);
                  }}
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                >
                  Back
                </button>
              }
              {isEdit && (
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewEditPage;
