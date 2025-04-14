const Brand = require("../models/Brand");
const { StatusCodes } = require("http-status-codes");
const allBrands = async (req, res) => {
  try {
    let brands = await Brand.find({}).exec();
    brands = { name: "Brand", id: "brand", options: brands };
    res.status(StatusCodes.OK).json(brands);
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: err.message });
  }
};
const addBrand = async (req, res) => {
    console.log(req.body);
  try {
    let brand = await Brand.create(req.body);
    console.log(brand);
    res.status(StatusCodes.CREATED).json({ brand:brand });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: err.message });
  }
};
const deleteBrand = async (req, res) => {
  try {
    //  parmas --->   /:id
    const { id: brandId } = req.params;
    console.log(req.params);
    let brand = await Brand.findOne({
      _id: brandId,
    }).exec();
    console.log(brand);
    
    if (!brand) {
      throw new Error(`No Brand Found with id : ${brandId}`);
    }
    // this the latest mongoose command ....
    await brand.deleteOne();
    res.status(StatusCodes.OK).json({
      msg: "Brand Was Deleted",
    });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: err.message });
  }
};
const updateBrand = async (req, res) => {
  try {
    const { id: brandId } = req.params;
    let brand = await Brand.findOneAndUpdate(
      {
        _id: brandId,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).exec();

    if (!brand) {
      throw new Error(`No Brand Found with id : ${brandId}`);
    }
    res.status(StatusCodes.OK).json({
      msg: "Brand Was Updated",
    });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: err.message });
  }
};
module.exports = {
  allBrands,
  addBrand,
  deleteBrand,
  updateBrand,
};
