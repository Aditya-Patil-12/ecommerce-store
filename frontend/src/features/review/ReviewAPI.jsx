import axios from "../../app/axiosConfig";
const reviewServerURL = "reviews/";

const createReviewAPI = async (reviewDetails) => {
  console.log("Entered Review Placement API");
  try {
    console.log(reviewDetails);
    // create order =====>
    const resp = await axios.post(reviewServerURL, reviewDetails);
    console.log(resp.data);
    // empty cart on your side .....
    return { data: resp.data, success: true };
  } catch (error) {
    return { msg: error.response.data.msg, success: false };
  }
};
const getReviewAPI = async () => {
  console.log("Entered Review Placement API");
  try {
    // console.log(reviewDetails);
    // create order =====>
    const resp = await axios.get(
      reviewServerURL );
    console.log(resp.data);
    // empty cart on your side .....
    return { data: resp.data, success: true };
  } catch (error) {
    return { msg: error.response.data.msg, success: false };
  }
};
const getProductReviewAPI = async (product) => {
  console.log("Entered Review Placement API");
  try {
    // console.log(reviewDetails);
    // create order =====>
    const resp = await axios.get(
      reviewServerURL+`product/${product}`);
    console.log(resp.data);
    // empty cart on your side .....
    return {data:resp.data.data,totalReviews:resp.data.items,success: true };
  } catch (error) {
    console.log(error);
    return { msg: error.response.data.msg, success: false };
  }
};
const deleteReviewAPI = async (review) => {
  console.log("Entered Review Placement API");
  try {
    // console.log(reviewDetails);
    // create order =====>
    const resp = await axios.delete(reviewServerURL + `${review}`);
    console.log(resp.data);
    // empty cart on your side .....
    return {data:resp.data.data,totalReviews:resp.data.items,success: true };
  } catch (error) {
    console.log(error);
    return { msg: error.response.data.msg, success: false };
  }
};
const editReviewAPI = async (review) =>{
  console.log("Entered Edit Review API");
  try {
    // console.log(reviewDetails);
    // create order =====>
      // review  : {title, comment , rating }
    const resp = await axios.patch(reviewServerURL + `${review._id}`,review);
    console.log(resp.data);
    // empty cart on your side .....
    return {
      data: resp.data,
      success: true,
    };
  } catch (error) {
    console.log(error);
    return { msg: error.response.data.msg, success: false };
  }
}
export {
  createReviewAPI,
  getProductReviewAPI,
  getReviewAPI,
  deleteReviewAPI,
  editReviewAPI,
};
