export default function calculateDiscountedAmount(amount, discoutPercentage) {
  return Math.ceil(((amount * (100 - discoutPercentage)) / 100) * 100) / 100;
};
