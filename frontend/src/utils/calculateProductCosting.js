import calculateDiscountedAmount from "./calculateDiscountedAmount";
import calculatePercentageAmount from './calculatePercentageAmount'
export default function calculateProductCosting (productInfo){
    let   itemSubTotal=0,
    itemTaxAmount=0,
    itemShippingAmount=0;
    itemSubTotal =
      calculateDiscountedAmount(
        productInfo.price,
        productInfo.discountPercentage
      ) * productInfo.quantity;
    itemTaxAmount = calculatePercentageAmount(
      itemSubTotal,
      productInfo.taxPercentage
    );
    itemShippingAmount = (+productInfo.quantity) * (productInfo.shippingAmount);
    return {
      itemSubTotal,
      itemTaxAmount,
      itemShippingAmount,
    };
}