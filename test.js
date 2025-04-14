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



// let queryString = "";
// let sortFilter = Object.entries(sortQuery);
// if (sortFilter.length != 0) {
//   queryString += "sort=";
// }
// for (let [key, value] of sortFilter) {
//   if (value == "desc") {
//     queryString += "-";
//   }
//   queryString += key + ",";
// }
// if (sortFilter.length != 0) {
//   console.log("inside  ", queryString[queryString.length - 1]);
//   queryString = queryString.slice(0, -1) + "&";
// }
// console.log(sortFilter,"  ",queryString);



  // let {
  //   _sort: sortQ,
  //   _page: page,
  //   _per_page: perPage,
  //   filters,
  // } = {
  //   _sort: "price,rating,stock",
  //   _page: 1,
  //   _per_page: 12,
  //   filters: {
  //     category: ["mens-watches", "mobile-accessories"],
  //     brand: ["Apple","Rolex"],
  //   },
  // };
  // let products = await Product.find({});
  //   // Filtering    ==============>
  //   if( filters ){
  //     console.log(products);
      
  //     products = products.filter((product)=>{
  //       let check=true;
  //       for(let filter in filters){
  //         if( Object.hasOwn(product,filter) ){
  //           let productValue = product[`${filter}`];
  //           let requiredValues = filters[filter];
  //         console.log(productValue," ",requiredValues);
          
  //           let index = requiredValues.findIndex((currentValue)=> productValue === currentValue );
  //           if( index === -1 ){
  //             check=false;
  //             break;
  //           }
  //         }
  //         else{
  //           check=false;
  //           break;
  //         }
  //       }
  //       console.log(check," ",product.id);
        
  //       return check;
  //     });
  //     console.log(products);
  //   }
  //   // Sorting      ==============>
  //   if (sortQ && sortQ !== " ") {
  //     // sort = sort.split(',').map((parameter)=> (parameter[0] === "-")? [parameter.splice(1),"desc"]:
  //     // [parameter.splice(0),"asc"]);
  //     sortQ = sortQ.split(",").map((p) => {
  //       return p.charAt(0) === "-" ? [p.slice(1), "desc"] : [p.slice(0), "asc"];
  //     });
  //     sortQ = Object.fromEntries(sortQ);
  //     products.sort((product1 , product2)=>{
  //       let check=true;
  //       for(let param in sortQ ){
  //         console.log(param," ",sortQ[param]);
          
  //         if( sortQ[param] === "asc" ){
  //           if( product1[param] < product2[param] ){
  //             break;
  //           }
  //           else if(product1[param] > product2[param]  ) {
  //             check=false;
  //             break;
  //           }
  //         }
  //         else{
  //           if( product1[param] < product2[param] ){
  //             check=false;
  //             break;            
  //           }
  //           else if(product1[param] > product2[param]  ) {
  //             break;
  //           }
  //         }
  //       }
  //       console.log(product1.id," ",product2.id," ",check);
  //       // sort can support multiple categories 
  //       return check ? -1 : 1;
  //     });
  //   }
  //   // Pagination   ==============>
  //   // products = products.splice((page - 1) * perPage, (page * perPage) - 1);

  //   console.log(products);
    // res.status(200).json(products);
    // console.log(sortQ);
    // res.status(200).json(Object.fromEntries(sortQ));
  
// const obj = { "name" : "Aditya",id:12}; 
// const arr = [1,2,"adfs"];
// arr.port = 500;
// console.log(arr);

// for( let val in arr ){
//   console.log(val," ",arr[val]);
// } 

// populate the data into data base 

// const calculatePercentage = (amount, percentage) => {
//   return Math.ceil(((amount * (100 - percentage)) / 100) * 100) / 100;
// };

// console.log(calculatePercentage(21,31));

const filterQuery =  {"category":["smartphones","laptops"]};
let queryString = "";
for (let [key, value] of Object.entries(filterQuery)) {
  if (value.length) {
    let filterTypeValues = "";
    for (let val of value) {
      filterTypeValues += val + ",";
    }
    console.log(filterTypeValues);
    filterTypeValues = filterTypeValues.slice(0,filterTypeValues.length-1);
    queryString += key + "=" + filterTypeValues + "&";
  }
}
console.log(queryString);