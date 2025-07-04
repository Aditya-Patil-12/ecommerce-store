const Brand = require('./models/Brand');

const data = [
  {
    value: "Essence",
    label: "Essence",
    checked: false,
  },
  {
    value: "Glamour Beauty",
    label: "Glamour Beauty",
    checked: false,
  },
  {
    value: "Velvet Touch",
    label: "Velvet Touch",
    checked: false,
  },
  {
    value: "Chic Cosmetics",
    label: "Chic Cosmetics",
    checked: false,
  },
  {
    value: "Nail Couture",
    label: "Nail Couture",
    checked: false,
  },
  {
    value: "Calvin Klein",
    label: "Calvin Klein",
    checked: false,
  },
  {
    value: "Chanel",
    label: "Chanel",
    checked: false,
  },
  {
    value: "Dior",
    label: "Dior",
    checked: false,
  },
  {
    value: "Dolce & Gabbana",
    label: "Dolce & Gabbana",
    checked: false,
  },
  {
    value: "Gucci",
    label: "Gucci",
    checked: false,
  },
  {
    value: "Annibale Colombo",
    label: "Annibale Colombo",
    checked: false,
  },
  {
    value: "Furniture Co.",
    label: "Furniture Co.",
    checked: false,
  },
  {
    value: "Knoll",
    label: "Knoll",
    checked: false,
  },
  {
    value: "Bath Trends",
    label: "Bath Trends",
    checked: false,
  },
  {
    value: "Apple",
    label: "Apple",
    checked: false,
  },
  {
    value: "Asus",
    label: "Asus",
    checked: false,
  },
  {
    value: "Huawei",
    label: "Huawei",
    checked: false,
  },
  {
    value: "Lenovo",
    label: "Lenovo",
    checked: false,
  },
  {
    value: "Dell",
    label: "Dell",
    checked: false,
  },
  {
    value: "Fashion Trends",
    label: "Fashion Trends",
    checked: false,
  },
  {
    value: "Gigabyte",
    label: "Gigabyte",
    checked: false,
  },
  {
    value: "Classic Wear",
    label: "Classic Wear",
    checked: false,
  },
  {
    value: "Casual Comfort",
    label: "Casual Comfort",
    checked: false,
  },
  {
    value: "Urban Chic",
    label: "Urban Chic",
    checked: false,
  },
  {
    value: "Nike",
    label: "Nike",
    checked: false,
  },
  {
    value: "Puma",
    label: "Puma",
    checked: false,
  },
  {
    value: "Off White",
    label: "Off White",
    checked: false,
  },
  {
    value: "Fashion Timepieces",
    label: "Fashion Timepieces",
    checked: false,
  },
  {
    value: "Longines",
    label: "Longines",
    checked: false,
  },
  {
    value: "Rolex",
    label: "Rolex",
    checked: false,
  },
  {
    value: "Amazon",
    label: "Amazon",
    checked: false,
  },
];
const act =  async (data) =>{
    let category = await Brand.create(data);
    // console.log(category.title);
};

module.exports =act;