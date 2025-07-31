const calculatePercentageAmount = (amount, discoutPercentage) => {
  return Math.ceil(((amount * (discoutPercentage)) / 100) * 100) / 100;
};
module.exports = calculatePercentageAmount;
