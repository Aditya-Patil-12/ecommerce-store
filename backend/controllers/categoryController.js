const Category = require("../models/Category");

const { StatusCodes } = require("http-status-codes");
const allCategories = async (req, res) => {
  try {
    let categories = await Category.find({}).exec();
    categories = { name: "Category", id: "category", options: categories };
    res.status(StatusCodes.OK).json(categories);
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: err.message });
  }
};
const addCategory = async (req, res) => {
  console.log(req.body);
  try {
    let category = await Category.create(req.body);
    console.log(category);
    res.status(StatusCodes.CREATED).json({ category: category });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: err.message });
  }
};
const addCategoryDB = async (data) => {
  // console.log(req.body);/
  try {
    let category = await Category.create(data);
    console.log(category);
    // res.status(StatusCodes.CREATED).json({ category: category });
  } catch (err) {
    console.log(err);
    
    // res.status(StatusCodes.BAD_REQUEST).json({ msg: err.message });
  }
};
const deleteCategory = async (req, res) => {
  try {
    //  parmas --->   /:id
    const { id: categoryId } = req.params;
    console.log(req.params);
    let category = await Category.findOne({
      _id: categoryId,
    }).exec();
    console.log(category);
    
    if (!category) {
      throw new Error(`No category Found with id : ${categoryId}`);
    }
    // this the latest mongoose command ....
    await category.deleteOne();
    res.status(StatusCodes.OK).json({
      msg: "category Was Deleted",
    });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: err.message });
  }
};
const updateCategory = async (req, res) => {
  try {
    const { id: categoryId } = req.params;
    let category = await Category.findOneAndUpdate(
      {
        _id: categoryId,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).exec();

    if (!category) {
      throw new Error(`No Category Found with id : ${categoryId}`);
    }
    res.status(StatusCodes.OK).json({
      msg: "Category Was Updated",
    });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: err.message });
  }
};
module.exports = {
  allCategories,
  addCategory,
  deleteCategory,
  updateCategory,
  addCategoryDB,
};
