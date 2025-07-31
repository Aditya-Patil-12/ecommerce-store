function calculateTotalOrderCosting(orderItems){
    let _total = 0,
      _subTotal = 0,
      _totalTaxAmount = 0,
      _totalShippingAmount = 0;

    for(let product of orderItems){
        _subTotal+=(product.netAmount);
        _totalTaxAmount+=(product.taxAmount);
        _totalShippingAmount += product.shippingAmount;
    }
    _total = _subTotal + _totalTaxAmount + _totalShippingAmount;
    return {
      _total,
      _subTotal,
      _totalTaxAmount,
      _totalShippingAmount,
    };
}
module.exports = calculateTotalOrderCosting;