// const products = require('./backend/data/products')
// const categories = new Set(products.map((prod)=>{
//     return prod.category
// }));
// // console.log(categ);

// const filters=[];
// for(let category of categories){

//     if( !category ) continue;
//     let str = category.split("-").map((value)=>value.charAt(0).toUpperCase()+value.slice(1)).join(' ');
//     filters.push({
//       value: category,
//       label: category.charAt(0).toUpperCase() + str.slice(1),
//       checked: false,
//     });
// }
// //  categories.map((category)=>{
    
// //     const str = toString(category)
// //     return { value: str, check: false };
// // });

// console.log(filters);


// // category.charAt(0).toUpperCase()+category.slice(1)

// let filters ={
//   "category":"beauty",
//   "page":"12",
// };
// let sort ="price",order="desc";
// const newFilters = {
//   ...filters,
//   _sort: (order === "asc") ? sort : "-" + sort,
// };

// let queryString = "";
// for (let [key, value] of Object.entries(newFilters)) {
//   queryString += (key) + "=" + (value) + "&";
// }
// console.log(queryString.slice(0,queryString.length-1));


// let val ={};
// if( val != {} ){
//   console.log("ehhlo"); 
// }



let queryString = "";
let sortFilter = Object.entries(sortQuery);
if (sortFilter.length != 0) {
  queryString += "sort=";
}
for (let [key, value] of sortFilter) {
  if (value == "desc") {
    queryString += "-";
  }
  queryString += key + ",";
}
if (sortFilter.length != 0) {
  console.log("inside  ", queryString[queryString.length - 1]);
  queryString = queryString.slice(0, -1) + "&";
}
console.log(sortFilter,"  ",queryString);
