// this will be an API call to Respective thing
import { default as axios } from "axios";
import { productListLimit } from "../../app/constants";
import { useSelector } from "react-redux";

async function productListAPI() {
  // console.log("entered to fetch data");
  const response = await axios.get(
    // "http://localhost:5000/api/v1/product/getAllProducts"
    `http://localhost:5000/products`
  );
  // console.log("Product List Received", response.data);
  return [...response.data];
}

async function singleProductAPI(id) {
  // "http://localhost:5000/api/v1/product/getAllProducts"
  try {
    const response = await axios.get(`http://localhost:5000/products?id=${id}`);
    return { ...response.data };
  } catch (error) {
    return { msg: "Single Product Fetching Error" };
  }
}

async function productsByFiltersAPI({filterQuery, sortQuery,page}) {
  // TODO : Multiple Values for a Filter
  // {"category":["smartphones","laptops"]}
  // {"sort":{order:"asc",}}
  // ==========================================
  // "http://localhost:5000/api/v1/product/getAllProducts"
  
  // console.log("are differcent",page," ",useSelector((state)=>state.product.page));
  console.log(filterQuery," ",sortQuery," ",page);
  
  let queryString = "";
  for (let [key, value] of Object.entries(filterQuery)) {
    if( value.length ){
      queryString += key + "=" + value[value.length-1] + "&";
    }
  }
  if( Object.keys(sortQuery).length ){
    queryString += (sortQuery.filterType+"="+sortQuery.value+"&");
  }
  // console.log("Not showiung\n"+ productListLimit);
  
  queryString += "_page="+`${page}`+"&_per_page="+`${productListLimit}`;
  // if (queryString) queryString = queryString.slice(0, queryString.length - 1);

  console.log("fetching for ", queryString);
  try {
    const response = await axios.get(
      `http://localhost:5000/products?` + `${queryString}`
    );
    
    return {data:response.data.data,totalItems:response.data.items};
  } catch (error) {
    return { msg: "Single Product Fetching Error" };
  }
}

async function productsFiltersListAPI() {
  // "http://localhost:5000/api/v1/product/getAllProducts"
  try {
    // console.log("Was there ");
    const response = await axios.get(`http://localhost:5000/filters`);
    // console.log("*&^&%^%^&%^%^asdfa"+response.data);
    let fetchedFilters =  response.data;
    let newFetchedFilters =[];
    for(let key in fetchedFilters){
      newFetchedFilters.push(...fetchedFilters[key]);
    }
    // console.log("show me ", newFetchedFilters);
    return newFetchedFilters;
  } catch (error) {
    return { msg: "Fetching Filters Error" };
  }
}
const addProductAPI = async(product) =>{
  try {
    console.log(product);
    const response = await axios.post(`http://localhost:5000/products`,product);
    console.log(response);
    return {data:response.data,success:true};
  } catch (error) {
    return { msg: "Add A New Product Error", success:false };
  }
}
const editProductAPI = async (product) => {
  let response;
  try {
    console.log(product);
    response = await axios.patch(`http://localhost:5000/products/${product.id}`, product);
    console.log(response);
  } catch (error) {
    return { msg: "Fetching Filters Error", success: false };
  }
  return { data:response.data, success: true };
};

export {
  singleProductAPI,
  productListAPI,
  productsByFiltersAPI,
  productsFiltersListAPI,
  addProductAPI,
  editProductAPI,
};

