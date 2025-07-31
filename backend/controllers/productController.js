const { StatusCodes } = require("http-status-codes");
const Product = require("../models/Product");
const CustomError = require("../errors");
const path = require('path');
const createProduct = async (req, res) => {
  const { userId } = req.user;
  const productInfo = { ...req.body, user: userId };
  const product = await Product.create(productInfo);
  return res.status(StatusCodes.CREATED).json(product);
};
const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOne({ _id: id }).populate('reviews');
  if (!product) {
    throw new CustomError.NotFoundError(
      "No Product Exists with this " + `${id}`
    );
  }
  return res.status(StatusCodes.OK).json(product);
};
// const getMultipleProduct = async (req, res) => {
//   const { idS } = req.params;
//   const product = await Product.findOne({ _id: id }).populate('reviews');
//   if (!product) {
//     throw new CustomError.NotFoundError(
//       "No Product Exists with this " + `${id}`
//     );
//   }
//   return res.status(StatusCodes.OK).json(product);
// };

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const product = await Product.findOne({ _id: id });
  if (!product) {
    throw new CustomError.NotFoundError(
      "No Product Exists with this " + `${id}`
    );
  }
  //  multiple admins in setup .....
  if (userId !== product.user.toString() ) {
    throw new CustomError.UnauthorizedError(
      "Not Authorize to Delete Product this Product"
    );
  }
  // product.featured = true;
  // CONDITIONAL TODO : IF THERE IS A COMPLETE REMOVAL OF PRODUCT THEN MAKES SURE ALL RREVIEWS ARE REMOVED PROEPERLY ......
  // await product.save();

  await  product.deleteOne();
  return res.status(StatusCodes.OK).json(product);
};

const updateProduct = async (req, res) => {
  let {id,...productInfo} = req.body;
  // console.log(productInfo);
  // possible mistakes ====>  frontend ---> id
  if (!productInfo) {
    throw new CustomError.NotFoundError(
      "No Product Exists with this " + `${id}`
    );
  }

  // console.log(productInfo);
  productInfo = { ...productInfo, user: req.userId };
  // console.log(productInfo);
  
  const updatedProduct = await Product.findOneAndUpdate(
    { _id: id},
    {_id:id,...productInfo},
    {
      new: true,
      runValidators: true,
    }
  );
  // console.log(updatedProduct);
    return res.status(StatusCodes.OK).json({product:updatedProduct});
};
const uploadImage = async (req, res) => {
  const maxImageSize = ((1024)*(1024));
  if( !req.files ){
    throw new CustomError.BadRequestError("Please Upload Image");
  }
  const productImage = req.files.image;
  if (
    !productImage.mimetype.startsWith("image") ||
    productImage.size > maxImageSize
  ) {
    if (productImage.size > maxImageSize)
      throw new CustomError.BadRequestError(
        "Please Upload Image smaller than 1 MB"
      );
    else throw new CustomError.BadRequestError("Please Upload Image");
  }
  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );
  await productImage.mv(imagePath);
  return res.status(StatusCodes.OK).json({ msg: "Upload Product Image" });
};
const allProducts = async (req, res) => {
  // console.log("HEy herer", req.query);
  console.log("adsfaskj af:::::::::::  ", req.query);

  const user = req.user;
  try {
    let {
      _sort: sortQ,
      _page: page,
      _per_page: perPage,
      ...filters
    } = req.query;

    // .lean() => useful if not use of products for Mongoose Querys
    // convert Mongoose Objects to simple Objects .......

    let products = await Product.find({}).populate("reviews");

    // collect only relevant products in case of "customer"
    if (!user || !user.role || user.role !== "admin") {
      products = products.filter((product) => product.featured);
    }

    for (let filter in filters) {
      let val = filters[filter];
      val = val.split(",");
      filters[filter] = val;
    }
    console.log(filters);
    // Filtering    ==============>

    if( filters.category ){
      products = products.filter((product) => {
        let check = true;
        let filter = "category";
        let productValue = product[`${filter}`];
        let requiredValues = filters[filter];
        let index = requiredValues.findIndex(
          (currentValue) => productValue === currentValue
        );
        if (index === -1)  check = false;
        return check;
      });
    }
    if( filters.brand ){
      products = products.filter((product) => {
        let check = true;
        let filter = "brand";
        let productValue = product[`${filter}`];
        let requiredValues = filters[filter];
        let index = requiredValues.findIndex(
          (currentValue) => productValue === currentValue
        );
        if (index === -1) check = false;
        return check;
      });
    }
    // if (filters) {
    //   // console.log(products);

    //   products = products.filter((product) => {
    //     let check = true;
    //     for (let filter in filters) {
    //       // console.log("tell me filter", filter);
    //       // console.log(product);
    //       // let temp =  JSON.parse(JSON.stringify(product));
    //       // product._doc contains the actual document data (excluding Mongoose methods).
    //       let temp = { ...product._doc };
    //       // console.log(filter, " ", temp.hasOwnProperty(filter));
    //       if (temp.hasOwnProperty(filter)) {
    //         // console.log("inside");

    //         let productValue = product[`${filter}`];
    //         let requiredValues = filters[filter];
    //         // console.log("comparing :", productValue, " ", requiredValues);

    //         let index = requiredValues.findIndex(
    //           (currentValue) => productValue === currentValue
    //         );
    //         if (index === -1) {
    //           check = false;
    //           break;
    //         }
    //       } else {
    //         check = false;
    //         break;
    //       }
    //     }
    //     // console.log(check, " ", product.id);
    //     return check;
    //   });
    //   // console.log("Printing after fitering", products);
    // }

    // Sorting      ==============>
    if (sortQ && sortQ !== " ") {
      // sort = sort.split(',').map((parameter)=> (parameter[0] === "-")? [parameter.splice(1),"desc"]:
      // [parameter.splice(0),"asc"]);
      sortQ = sortQ.split(",").map((p) => {
        return p.charAt(0) === "-" ? [p.slice(1), "desc"] : [p.slice(0), "asc"];
      });
      sortQ = Object.fromEntries(sortQ);
      products.sort((product1, product2) => {
        let check = true;
        for (let param in sortQ) {
          // console.log(param, " ", sortQ[param]);

          if (sortQ[param] === "asc") {
            if (product1[param] < product2[param]) {
              break;
            } else if (product1[param] > product2[param]) {
              check = false;
              break;
            }
          } else {
            if (product1[param] < product2[param]) {
              check = false;
              break;
            } else if (product1[param] > product2[param]) {
              break;
            }
          }
        }
        // console.log(product1.id, " ", product2.id, " ", check);
        // sort can support multiple categories
        return check ? -1 : 1;
      });
    }
    let items = products.length;
    console.log(
      "no. of items :",
      items,
      " ",
      (((+page) - 1) * (+perPage)),
      " ",
      (+page) * (+perPage)
    );
    
    // Pagination   ==============>
    products = products.slice(((+page) - 1) * (+perPage), ((+page) * (+perPage)) );

    res.status(200).json({ products, items });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};
module.exports = {
  createProduct,
  allProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  uploadImage,
};
