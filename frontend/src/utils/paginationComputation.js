import { productListLimit } from "../app/constants";
const calculateTotalPages = (totalItems) =>{
    return Math.ceil(totalItems / productListLimit);
};

const calculateItemsOnAPage = ({page, totalItems}) => {
    if( totalItems === 0 ){
        return {pageFirstItemNumber:(0) , pageLastItemNumber : (0) }
    }
    return { pageFirstItemNumber: ((page-1)*(productListLimit))+1, pageLastItemNumber: Math.min(totalItems,page*productListLimit) };
};

export default function calculatePaginationPageDisplay({ pageNumber, totalPages }) {

  if (totalPages <= 6) {
    if (totalPages === 0) {
      return [];
    }
    let pages = [];
    for (let page = 1; page <= totalPages; page++) {
      pages.push(page);
    }
    return pages;
  }
  if (pageNumber <= 3) {
    return ["1", "2", "3", "4", "...", `${totalPages}`];
  } else if (pageNumber >= totalPages - 2) {
    return [
      "1",
      "...",
      `${totalPages - 3}`,
      `${totalPages - 2}`,
      `${totalPages - 1}`,
      `${totalPages}`,
    ];
  } else {
    return [
      "1",
      "...",
      `${pageNumber}`,
      `${pageNumber + 1}`,
      "...",
      `${totalPages}`,
    ];
  }
}



export {
  calculateTotalPages,
  calculateItemsOnAPage,
  calculatePaginationPageDisplay,
};