import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { validateInteger } from "../../utils/validateNumeric";
import { validateReal } from "../../utils/validateNumeric";
import { Link, useNavigate } from "react-router";
import {
  addProductAsync,
  editProductAsync,
  fetchProductDetailAsync,
} from "../productList/productListSlice";
/*
How useSelector Works During Re-Renders
It does not reinitialize – It remains the same function instance across renders.
It re-executes the selector function to fetch the latest state.
If the selected value changes, it triggers a re-render.
If the selected value remains the same, it prevents unnecessary re-renders
*/
import { clearSelectedProduct } from "../productList/productListSlice";
import { useParams } from "react-router";
export default function AdminProductForm() {
  // TODO : infinite rendering why ? 
  // TODO : whenever we leave the page it should setSelectedProductNull,


  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [isCategoryFilterOpen, setIsCategoryFilterOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [isBrandFilterOpen, setIsBrandFilterOpen] = useState(false);


  const filters = useSelector((state) => state.product.filters);
  const selectedProduct = useSelector((state) => state.product.currentProduct);
  const page = useSelector((state) => state.product.page);
  const totalItems = useSelector((state) => state.product.totalItems);
  const filterQuery = useSelector((state)=>state.product.filterQuery);
  const sortQuery = useSelector((state) => state.product.sortQuery);
  const products = useSelector((state)=>state.product.products);
  const index = products.find((product)=> product.id === "101");
  const navigate = useNavigate();
  // console.log(index);
  
  const params = useParams();
  const categories = filters[1];
  const brands = filters[0];
  // console.log(categories, " ", brands);
  
  useEffect(() => {
    if (params.id && !selectedProduct) {
      const fetchEditData =  async ()=>{
        await dispatch(fetchProductDetailAsync(params.id));
      }
      fetchEditData();
    }
    // cleanout Concept of useEffect () => 
    if( params.id ){
      return ()=>{
        dispatch(clearSelectedProduct());
      }
    }
    // as the selected Product is not changed the params.id has to be included ....
  }, [dispatch]);

  // if there is a selectedProduct we need to get the selectedCategory and selectedBrand
  useEffect(() => {
    if (params.id && selectedProduct) {
      setSelectedCategory(selectedProduct.category);
      setSelectedBrand(selectedProduct.brand);
    }
  }, [selectedProduct]);


  // Validation on Frontend .....
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formInput = new FormData(e.currentTarget);
    let data = Object.fromEntries(formInput);
    data = { ...data, images: data["images"].split("\n") };
    // console.log(data);
    for (let key in data) {
      if (key != "images" && key != "description") {
        if (data[key] === "") {
          console.log("Fill All Values");
          return;
        }
      }
    }
    if (!validateReal(data["price"])) {
      console.log("Price Incorrect");
      return;
    }
    if (!validateReal(data["discountPercentage"])) {
      console.log("Discount Percentage Incorrect");
      return;
    }
    if (!validateInteger(data["stock"])) {
      console.log("Stocks Incorrect ");
      return;
    }
    const reqCategory = categories.options.find(
      (category) => category.value == data["category"]
    );
    const reqBrands = brands.options.find(
      (brand) => brand.value == data["brand"]
    );
    if (!reqCategory) {
      console.log("Category Incorrect");
      return;
    }
    if (!reqBrands) {
      console.log("Brand Incorrect");
      return;
    }
    // Submitting data to server
    console.log(data);

    console.log("Submitting Final data",params," ",params.id);
    console.log({...selectedProduct,...data});
    console.log((totalItems+1).toString());
    
    if( params && params.id ){
      // edit update ====>
      data["id"] =params.id;
      await dispatch(editProductAsync({...selectedProduct,...data}));   
      // console.log(data);
      // // navigate(-1);  
    } 
    else{
      // add A new Item .....
      // data["id"] = (totalItems + 1).toString();    
      // await dispatch(addProductAsync(data));
    }
    navigate(-1);


    // TODO :Over here all Products are Fetched 
      await dispatch(
        fetchProductByFiltersAsync({ filterQuery, sortQuery, page })
      );  
  };

  return (
    <form className="bg-white" onSubmit={handleSubmit}>
      <div className="space-y-12">
        {/* Product Title Description */}
        {/* border-b border-gray-900/10 */}
        <div>
          <h2 className="px-2 text-base/7 font-semibold text-gray-900">
            {(params ? "Edit " : "Add ") + "Product"}
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 px-6">
            <div className="sm:col-span-4">
              {/* we have label over here  */}
              <label
                htmlFor="title"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Title*
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <input
                    id="title"
                    name="title"
                    type="text"
                    defaultValue={selectedProduct ? selectedProduct.title : ""}
                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Description
              </label>
              <div className="mt-2 m-auto">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  defaultValue={
                    selectedProduct ? selectedProduct.description : ""
                  }
                  // there is resize property given to adjust the typing the y direction
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 "
                />
              </div>
            </div>
          </div>
        </div>
        {/* border-b border-gray-900/10 */}
        {/* start of Description of Product  */}
        <div>
          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 px-6">
            {/* this to get three column layout */}
            {/* when you add sm:col-start-1 this ensures it starts from first columns irrespective of the previous/above the field */}
            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="price"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Price*
              </label>
              <div className="mt-2">
                <input
                  id="price"
                  name="price"
                  type="text"
                  min={1}
                  max={10000}
                  defaultValue={selectedProduct ? selectedProduct.price : ""}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="discountPercentage"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Discount Percentage*
              </label>
              <div className="mt-2">
                <input
                  id="discountPercentage"
                  name="discountPercentage"
                  type="text"
                  defaultValue={
                    selectedProduct ? selectedProduct.discountPercentage : ""
                  }
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="stock"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Stock*
              </label>
              <div className="mt-2">
                <input
                  id="stock"
                  name="stock"
                  type="text"
                  defaultValue={selectedProduct ? selectedProduct.stock : ""}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            {/* Categories ==============> */}
            <div className="sm:col-span-3 ">
              <label
                htmlFor="category"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Category*
              </label>
              <div className="mt-2 grid grid-cols-1 relative">
                <input
                  id="category"
                  name="category"
                  type="text"
                  value={selectedCategory}
                  onFocus={(e) => {
                    console.log("Focus");
                    setIsCategoryFilterOpen(true);
                  }}
                  // the inline JSX  function will be executed after every re-render .......
                  // thus causing an Infinite Loop =======>
                  // defaultValue={selectedProduct ?
                  //   setSelectedCategory(selectedProduct.category) : ""}
                  placeholder="---select category---"
                  onChange={(e) => {
                    console.log("Am i going to input");
                    setSelectedCategory(e.target.value);
                  }}
                  className="col-start-1 row-start-1  block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 "
                />
                <div
                  className={
                    "z-10 absolute w-full bg-white top-full " +
                    `${
                      isCategoryFilterOpen
                        ? "border-1 border-gray-500 rounded-md"
                        : ""
                    }`
                  }
                >
                  {categories.options
                    .filter((category) =>
                      category.value.startsWith(selectedCategory)
                    )
                    .map((category) => (
                      <option
                        onClick={(e) => {
                          console.log("Option Clicked ", category.value);
                          setSelectedCategory((state) => category.value);
                          setIsCategoryFilterOpen(false);
                        }}
                        className={
                          "px-1 hover:cursor-pointer " +
                          `${isCategoryFilterOpen ? "" : "hidden"}`
                        }
                      >
                        {category.value}
                      </option>
                    ))}
                </div>
                {/* </select>
                 ****pointer-events-none *****
                 */}
                <ChevronDownIcon
                  aria-hidden="true"
                  className="col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                  onClick={(e) => {
                    console.log("ICon toogle");
                    setIsCategoryFilterOpen(!isCategoryFilterOpen);
                  }}
                />
              </div>
            </div>
            {/* Brands     ==============>*/}
            <div className="sm:col-span-3 ">
              <label
                htmlFor="brand"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Brand*
              </label>
              <div className="mt-2 grid grid-cols-1 relative">
                <input
                  id="brand"
                  name="brand"
                  type="text"
                  value={selectedBrand}
                  onFocus={(e) => {
                    setIsBrandFilterOpen(true);
                  }}
                  // the inline JSX  function will be executed after every re-render .......
                  // thus causing an Infinite Loop =======>
                  // defaultValue={selectedProduct ? setSelectedBrand(selectedProduct.brand) : ""}
                  placeholder="---select brand---"
                  onChange={(e) => {
                    setSelectedBrand(e.target.value);
                  }}
                  // defaultValue={(selectedProduct) ?(setSelectedCategory(selectedProduct.category))  : ("")}
                  className="col-start-1 row-start-1  block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 "
                />
                <div
                  className={
                    "z-10 absolute w-full bg-white top-full " +
                    `${
                      isBrandFilterOpen
                        ? "border-1 border-gray-500 rounded-md"
                        : ""
                    }`
                  }
                >
                  {brands.options
                    .filter((brand) => brand.value.startsWith(selectedBrand))
                    .map((brand) => (
                      <option
                        onClick={(e) => {
                          setSelectedBrand((state) => brand.value);
                          setIsBrandFilterOpen(false);
                        }}
                        className={
                          "px-1 hover:cursor-pointer " +
                          `${isBrandFilterOpen ? "" : "hidden"}`
                        }
                      >
                        {brand.value}
                      </option>
                    ))}
                </div>
                {/* </select>
                 ****pointer-events-none *****
                 */}
                <ChevronDownIcon
                  aria-hidden="true"
                  className="col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                  onClick={(e) => {
                    console.log("ICon toogle");

                    setIsBrandFilterOpen(!isBrandFilterOpen);
                  }}
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="returnPolicy"
                className=" block text-sm/6 font-medium text-gray-900"
              >
                Return Policy*
              </label>
              <div className="mt-2 m-auto">
                <textarea
                  id="returnPolicy"
                  name="returnPolicy"
                  rows={1}
                  // there is resize property given to adjust the typing the y direction
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 "
                  defaultValue={
                    selectedProduct ? selectedProduct.returnPolicy : ""
                  }
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="warrantyInformation"
                className=" block text-sm/6 font-medium text-gray-900"
              >
                Warranty Information*
              </label>
              <div className="mt-2 m-auto">
                <textarea
                  id="warrantyInformation"
                  name="warrantyInformation"
                  rows={1}
                  // there is resize property given to adjust the typing the y direction
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 "
                  defaultValue={
                    selectedProduct ? selectedProduct.warrantyInformation : ""
                  }
                />
              </div>
            </div>

            <div className="sm:col-span-full">
              <label
                htmlFor="thumbnail"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Thumbnail*
              </label>
              <div className="mt-2">
                <input
                  id="thumbnail"
                  name="thumbnail"
                  type="text"
                  defaultValue={
                    selectedProduct ? selectedProduct.thumbnail : ""
                  }
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <div className="flex flex-wrap">
                <label
                  htmlFor="images"
                  className="text-sm/6 font-medium text-gray-900"
                >
                  Images
                </label>
                <h1 className="inline ml-2 text-sm/6 font-medium text-gray-600">
                  [Link for each image on NewLine]
                </h1>
              </div>
              <div className="mt-2 m-auto">
                <textarea
                  id="images"
                  name="images"
                  rows={3}
                  // there is resize property given to adjust the typing the y direction
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 "
                  defaultValue={
                    selectedProduct ? selectedProduct.images.join("\n") : ""
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link
          to="/admin/products"
          className="text-sm/6 font-semibold text-gray-900"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}
// Important component helps us a lot ======================> 
{
  /* Profile Photo  */
}
{
  /* <div className="col-span-full">
            <label
              htmlFor="photo"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Photo
            </label>
            <div className="mt-2 flex items-center gap-x-3">
              <UserCircleIcon
                aria-hidden="true"
                className="size-12 text-gray-300"
              />
              <button
                type="button"
                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
              >
                Change
              </button>
            </div>
          </div> */
}
{
  /* Cover Photo */
}
{
  /* <div className="col-span-full">
            <label
              htmlFor="cover-photo"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Cover photo
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <PhotoIcon
                  aria-hidden="true"
                  className="mx-auto size-12 text-gray-300"
                />
                <div className="mt-4 flex text-sm/6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs/5 text-gray-600">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div> */
}
{
  /* 
<div className="border-b border-gray-900/10 pb-12">
  <h2 className="text-base/7 font-semibold text-gray-900">
    Notifications
  </h2>
  <p className="mt-1 text-sm/6 text-gray-600">
    We'll always let you know about important changes, but you pick what
    else you want to hear about.
  </p>

  <div className="mt-10 space-y-10">
    <fieldset>
      <legend className="text-sm/6 font-semibold text-gray-900">
        By email
      </legend>
      <div className="mt-6 space-y-6">
        <div className="flex gap-3">
          <div className="flex h-6 shrink-0 items-center">
            <div className="group grid size-4 grid-cols-1">
              <input
                defaultChecked
                id="comments"
                name="comments"
                type="checkbox"
                aria-describedby="comments-description"
                className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
              />
              <svg
                fill="none"
                viewBox="0 0 14 14"
                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
              >
                <path
                  d="M3 8L6 11L11 3.5"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-0 group-has-checked:opacity-100"
                />
                <path
                  d="M3 7H11"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-0 group-has-indeterminate:opacity-100"
                />
              </svg>
            </div>
          </div>
          <div className="text-sm/6">
            <label
              htmlFor="comments"
              className="font-medium text-gray-900"
            >
              Comments
            </label>
            <p id="comments-description" className="text-gray-500">
              Get notified when someones posts a comment on a posting.
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="flex h-6 shrink-0 items-center">
            <div className="group grid size-4 grid-cols-1">
              <input
                id="candidates"
                name="candidates"
                type="checkbox"
                aria-describedby="candidates-description"
                className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
              />
              <svg
                fill="none"
                viewBox="0 0 14 14"
                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
              >
                <path
                  d="M3 8L6 11L11 3.5"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-0 group-has-checked:opacity-100"
                />
                <path
                  d="M3 7H11"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-0 group-has-indeterminate:opacity-100"
                />
              </svg>
            </div>
          </div>
          <div className="text-sm/6">
            <label
              htmlFor="candidates"
              className="font-medium text-gray-900"
            >
              Candidates
            </label>
            <p id="candidates-description" className="text-gray-500">
              Get notified when a candidate applies for a job.
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="flex h-6 shrink-0 items-center">
            <div className="group grid size-4 grid-cols-1">
              <input
                id="offers"
                name="offers"
                type="checkbox"
                aria-describedby="offers-description"
                className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
              />
              <svg
                fill="none"
                viewBox="0 0 14 14"
                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
              >
                <path
                  d="M3 8L6 11L11 3.5"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-0 group-has-checked:opacity-100"
                />
                <path
                  d="M3 7H11"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-0 group-has-indeterminate:opacity-100"
                />
              </svg>
            </div>
          </div>
          <div className="text-sm/6">
            <label
              htmlFor="offers"
              className="font-medium text-gray-900"
            >
              Offers
            </label>
            <p id="offers-description" className="text-gray-500">
              Get notified when a candidate accepts or rejects an offer.
            </p>
          </div>
        </div>
      </div>
    </fieldset>

    <fieldset>
      <legend className="text-sm/6 font-semibold text-gray-900">
        Push notifications
      </legend>
      <p className="mt-1 text-sm/6 text-gray-600">
        These are delivered via SMS to your mobile phone.
      </p>
      <div className="mt-6 space-y-6">
        <div className="flex items-center gap-x-3">
          <input
            defaultChecked
            id="push-everything"
            name="push-notifications"
            type="radio"
            className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
          />
          <label
            htmlFor="push-everything"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Everything
          </label>
        </div>
        <div className="flex items-center gap-x-3">
          <input
            id="push-email"
            name="push-notifications"
            type="radio"
            className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
          />
          <label
            htmlFor="push-email"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Same as email
          </label>
        </div>
        <div className="flex items-center gap-x-3">
          <input
            id="push-nothing"
            name="push-notifications"
            type="radio"
            className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
          />
          <label
            htmlFor="push-nothing"
            className="block text-sm/6 font-medium text-gray-900"
          >
            No push notifications
          </label>
        </div>
      </div>
    </fieldset>
  </div>
</div> */
}
{
  /* <div className="col-span-full">
  <label
    htmlFor="street-address"
    className="block text-sm/6 font-medium text-gray-900"
  >
    Street address
  </label>
  <div className="mt-2">
    <input
      id="street-address"
      name="street-address"
      type="text"
      autoComplete="street-address"
      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
    />
  </div>
</div> */
}

{
  /* <div className="sm:col-span-2 sm:col-start-1">
  <label
    htmlFor="city"
    className="block text-sm/6 font-medium text-gray-900"
  >
    City
  </label>
  <div className="mt-2">
    <input
      id="city"
      name="city"
      type="text"
      autoComplete="address-level2"
      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
    />
  </div>
</div>

<div className="sm:col-span-2">
  <label
    htmlFor="region"
    className="block text-sm/6 font-medium text-gray-900"
  >
    State / Province
  </label>
  <div className="mt-2">
    <input
      id="region"
      name="region"
      type="text"
      autoComplete="address-level1"
      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
    />
  </div>
</div>

<div className="sm:col-span-2">
  <label
    htmlFor="postal-code"
    className="block text-sm/6 font-medium text-gray-900"
  >
    ZIP / Postal code
  </label>
  <div className="mt-2">
    <input
      id="postal-code"
      name="postal-code"
      type="text"
      autoComplete="postal-code"
      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
    />
  </div>
</div> */
}