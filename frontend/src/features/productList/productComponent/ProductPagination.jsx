import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useDispatch } from "react-redux";
import paginationDisplay from "../../../utils/paginationDisplay";
import { productListLimit } from "../../../app/constants";
import { incrementPage, decrementPage, setPage } from "../productListSlice";

export default function ProductPagination({totalItems,page}) {
  const dispatch = useDispatch();
  // console.log(totalItems, " :  ", page);

  const totalPages = Math.ceil(totalItems / productListLimit);
  const displayPages = paginationDisplay({
    pageNumber: page,
    totalPages: totalPages,
  });

  // console.log(
  //   "Here is the output for Pagination ",
  //   page,
  //   "  ",
  //   totalPages,
  //   " ",
  //   displayPages
  // );
  return (
    // mobile Layout ===================================
    <div
      className="flex items-center justify-between  border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
      id="paginationOuter"
    >
      <div
        className="flex flex-1 justify-between sm:hidden"
        id="paginationInner"
      >
        <button
          type="button"
          onClick={() => dispatch(decrementPage())}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          id={"button-1"}
        >
          Previous
        </button>

        <button
          type="button"
          onClick={() => dispatch(incrementPage())}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          id={"button-2"}
        >
          Next
        </button>
      </div>

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(page - 1) * productListLimit + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(totalItems, page * productListLimit)}
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
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              id="0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon aria-hidden="true" className="size-5 " />
            </button>
            {/* Right Move ============== */}

            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}

            {/* pages are setted ... */}
            {displayPages.map((displayPage, index) => {
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
                    // id={`${index + 1}`}
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
                    // id={`${index + 1}`}
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
              type="button"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 "
              id="7"
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

/*
// default pages ....
            <a
              href="#"
              aria-current="page"
              className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              1
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              2
            </a>
            <a
              href="#"
              className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
            >
              3
            </a>
            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-300 ring-inset focus:outline-offset-0">
              ...
            </span>
            <a
              href="#"
              className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
            >
              8
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              9
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              10
            </a>
*/
