const products = require('./backend/data/products')
const categories = new Set(products.map((prod)=>{
    return prod.category
}));
// console.log(categ);

const filters=[];
for(let category of categories){

    if( !category ) continue;
    let str = category.split("-").map((value)=>value.charAt(0).toUpperCase()+value.slice(1)).join(' ');
    filters.push({
      value: category,
      label: category.charAt(0).toUpperCase() + str.slice(1),
      checked: false,
    });
}
//  categories.map((category)=>{
    
//     const str = toString(category)
//     return { value: str, check: false };
// });

console.log(filters);


// category.charAt(0).toUpperCase()+category.slice(1)