const Brand = require("../models/Brand");
const Category = require("../models/Category");

const allFilters = async (req,res)=>{
    try {
        // Mongoose Query Object is returned ......
        // no guarrnated that executes immediately ....
        // const brands = await Brand.find({}); 
        // Mongoose Query Object is converted to Promise 
        // execvtes immediately ***yes*** 
        let brands = await Brand.find({}).exec();
        let categories = await Category.find({}).exec(); 

        // { name, id ,options :[] }

        brands = {name:"Brand",id:"brand",options:brands};
        categories = { name: "Category", id: "category", options: categories };
        res.status(200).json({filters:[brands,categories]});
    } catch (error) {
        res.status(400).json({msg:error,success:false});
    }
} 

module.exports = { allFilters };