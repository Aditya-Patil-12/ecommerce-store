const orderController = (req, res) => {
  console.log(req.body);
  
  return res.json({ msg: "asdfas" });
};

module.exports = {
  orderController,
};
