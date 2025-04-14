import axios from '../../app/axiosConfig'
import { productListLimit } from "../../app/constants";
const productServerUrl = "products/";
const filtersServerUrl = "filters/";


async function singleProductAPI(id) {
  try {
    const response = await axios.get(productServerUrl+id);
    return { product:response.data,success:true };
  } catch (error) {
    return { msg:error.response.payload.msg ,success:false };
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
    if (value.length) {
      let filterTypeValues = "";
      for (let val of value) {
        filterTypeValues += val + ",";
      }
      console.log(filterTypeValues);
      filterTypeValues = filterTypeValues.slice(0, filterTypeValues.length - 1);
      queryString += key + "=" + filterTypeValues + "&";
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
    const response = await axios.get(productServerUrl.slice(0,-1)+"?"+`${queryString}`);
    return {
      products: response.data.products,
      totalItems: response.data.items,
      success: true,
    };
  } catch (error) {
    return { msg: error.response.payload.msg, success: false };
  }
}





async function productsFiltersListAPI() {
  try {

    const response = await axios.get(filtersServerUrl);
    // console.log("*&^&%^%^&%^%^asdfa"+response.data);
    let fetchedFiltersObject = response.data;
    let filterArray = [];
    for (let key in fetchedFiltersObject)
      filterArray.push(...fetchedFiltersObject[key]);
    console.log("show me ", filterArray);
    return { filters: filterArray, success: true };
  } catch (error) {
    return { msg: "Fetching Filters Error",success:false};
  }
}


const addProductAPI = async(product) =>{
  try {
    console.log(product);
    const response = await axios.post(productServerUrl,product);
    console.log(response.data);
    return { data: response.data, success: true };
  } catch (error) {
    return { msg: error.response.payload.msg, success: false };
  }
}

const editProductAPI = async (product) => {
  try {
    console.log(product);
    const response = await axios.patch(
      productServerUrl+product.id,
      product
    );
    return { product: response.data, success: true };
  } catch (error) {
    return { msg: "Fetching Filters Error", success: false };
  }
};

export {
  singleProductAPI,
  productsByFiltersAPI,
  productsFiltersListAPI,
  addProductAPI,
  editProductAPI,
};

