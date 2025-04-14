import { ChevronLeftIcon , ChevronRightIcon } from "@heroicons/react/20/solid";
import { useDispatch } from "react-redux";
import { calculateTotalPages,calculateItemsOnAPage,calculatePaginationPageDisplay } from "../utils/paginationComputation";
export default function Pagination({ totalItems, page  , incrementPage , decrementPage, setPage }) {
  const dispatch = useDispatch();
  // console.log(totalItems, " :  ", page);

  const totalPages = +(calculateTotalPages(totalItems));
  const displayPages = calculatePaginationPageDisplay({
    pageNumber: page,
    totalPages: totalPages,
  });
  const itemNumberOnPage = calculateItemsOnAPage({ page, totalItems });
  console.log(totalItems," ",totalPages," ",displayPages," ",itemNumberOnPage);

  return (
    <div
      className="flex items-center justify-between  border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
      id="paginationOuter"
    >
      {/* // mobile Layout =================================== */}
      <div
        className="flex flex-1 justify-between sm:hidden"
        id="paginationInner"
      >
        <button
          type="button"
          onClick={() => dispatch(decrementPage())}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          id={"mobileLayoutPrevious"}
        >
          Previous
        </button>

        <button
          type="button"
          onClick={() => dispatch(incrementPage())}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          id={"mobileLayoutNext"}
        >
          Next
        </button>
      </div>

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {itemNumberOnPage.pageFirstItemNumber}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {itemNumberOnPage.pageLastItemNumber}{" "}
            </span>{" "}
            of <span className="font-medium">{totalItems}</span> results
          </p>
        </div>

        {/* Numbering Starts ===================== */}
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-xs"
            id="nav-Page"
          >
            {/* Left Move ================ */}
            <button
              type="button"
              onClick={() => {
                dispatch(decrementPage());
              }}
              id="desktopLayoutPrevious"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon aria-hidden="true" className="size-5 " />
            </button>

            {/* pages are setted ... */}
            {displayPages.map((displayPage, index) => {
              // here the index of  ... is 1 and 4 . those are same whenever displayed .....
              if (displayPage === "...") {
                return (
                  <button
                    type="button"
                    id={`ellipsis-${index}`}
                    key={`ellipsis-${index}`}
                    disabled
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-300 ring-inset focus:outline-offset-0"
                  >
                    ...
                  </button>
                );
              } else if (+displayPage === page) {
                return (
                  <button
                    type="button"
                    onClick={() => dispatch(setPage(Number(displayPage)))}
                    aria-current="page"
                    className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    key={`page-${displayPage}`}
                  >
                    {displayPage}
                  </button>
                );
              }
              return (
                <button
                  type="button"
                  onClick={() => dispatch(setPage(Number(displayPage)))}
                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  key={`page-${displayPage}`}
                >
                  {displayPage}
                </button>
              );
            })}
            {/* ==================  */}
            {/* Right Move ================== */}
            <button
              onClick={() => {
                dispatch(incrementPage());
              }}
              id="desktopLayoutNext"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 "
            >
              <span className="sr-only">Next</span>

              <ChevronRightIcon aria-hidden="true" className="size-5" />
            </button>
            {/* ======================  */}
          </nav>
        </div>
        {/* =============================== */}
      </div>
    </div>
  );
}
