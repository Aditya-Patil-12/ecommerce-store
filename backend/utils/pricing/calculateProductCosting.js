const calculateDiscountedAmount = require("../calcualteDiscountedAmount");
const calculatePercentageAmount = require("../calculatePercentageAmount");
function calculateProductCosting(productInfo) {
  console.log("I received the Product Info ::: ",productInfo);
  
  let itemSubTotal = 0,itemTaxAmount = 0,itemShippingAmount = 0;
  itemSubTotal =
    calculateDiscountedAmount(
      productInfo.price,
      productInfo.discountPercentage
    ) * (+productInfo.quantity);
  itemTaxAmount = calculatePercentageAmount(
    itemSubTotal,
    productInfo.taxPercentage
  );
  itemShippingAmount = (+productInfo.quantity) * (productInfo.shippingAmount);
  return {
    itemSubTotal, itemTaxAmount, itemShippingAmount
  }
}
module.exports = calculateProductCosting