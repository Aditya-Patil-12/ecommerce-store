import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductsComponent from "../productList/ProductsComponent";
import ProductPagination from "../productList/ProductPagination";

import {
  fetchProductListAsync,
  fetchProductByFiltersAsync,
  fetchProductsFiltersAsync,
  setPage,
} from "../productList/productListSlice";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";

import { XMarkIcon } from "@heroicons/react/24/outline";

import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";

const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "asc", current: false },
  { name: "Price: Low to High", sort: "price", order: "asc", current: false },
  { name: "Price: High to Low", sort: "price", order: "desc", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminProductList() {
  const products = useSelector((state) => state.product.products);
  const filters = useSelector((state) => state.product.filters);
  const page = useSelector((state) => state.product.page);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filterQuery, setFilterQuery] = useState({});
  const [sortQuery, setSortQuery] = useState({});
  const dispatch = useDispatch();
  const totalItems = useSelector((state) => state.product.totalItems);

  useEffect(() => {
    const fetchData = async () => {
      // console.log("******************Fetching for Products");

      await dispatch(
        fetchProductByFiltersAsync({ filterQuery, sortQuery, page })
      );
    };
    fetchData();
  }, [dispatch, filterQuery, sortQuery, page]);

  useEffect(() => {
    const fetchData = async () => {
      // console.log("******************Fetching for Filters");
      await dispatch(fetchProductsFiltersAsync());
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    // console.log("check for page())()()()()(",page);
    // const change= async ()=.
    if (page != 1) dispatch(setPage(1));
  }, [filterQuery, sortQuery]);

  const handleFilters = ({ filterType, value, checked }) => {
    // console.log(filterType, " ", value);

    const newFilters = { ...filterQuery };

    if (checked) {
      if (newFilters[`${filterType}`]) {
        newFilters[`${filterType}`].push(value);
      } else {
        newFilters[`${filterType}`] = [value];
      }
      // console.log(newFilters);
      setFilterQuery(newFilters);
      dispatch(fetchProductByFiltersAsync(newFilters, sortQuery));
    } else {
      // for object deletion .....
      // delete newFilters[`${filterType}`];
      let index = newFilters[`${filterType}`].findIndex(
        (reqValue) => reqValue === value
      );
      newFilters[`${filterType}`].splice(index, 1);
      // console.log("*&%& IOverHere",newFilters);
      setFilterQuery(newFilters);
      dispatch(fetchProductByFiltersAsync(newFilters, sortQuery));
    }
    return;
  };

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <MobileComponent
          filters={filters}
          handleFilters={handleFilters}
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
        />
        {/* Desktop Component */}
        <DesktopComponent
          products={products}
          totalItems={totalItems}
          filters={filters}
          handleFilters={handleFilters}
          setMobileFiltersOpen={setMobileFiltersOpen}
          setSortQuery={setSortQuery}
          page={page}
        />
      </div>
    </div>
  );
}

function Filters({ filters, handleFilters }) {
  // console.log(filters);

  if (!filters) {
    return <h1>Check for this</h1>;
  }
  // console.log(filters[0].options.map((value)=>(value["label"]))," asdfjasf");
  // console.log("printing filter :",category, ' ',brand);

  return (
    <form className="hidden lg:block" key={`DesktopComponentFilters`}>
      <h3 className="sr-only">Categories</h3>

      {filters.map((section) => (
        <Disclosure
          key={section.id}
          as="div"
          className="border-b border-gray-200 py-6"
        >
          <h3 className="-my-3 flow-root">
            <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
              <span className="font-medium text-gray-900">{section.name}</span>
              <span className="ml-6 flex items-center">
                <PlusIcon
                  aria-hidden="true"
                  className="size-5 group-data-open:hidden"
                />
                <MinusIcon
                  aria-hidden="true"
                  className="size-5 group-not-data-open:hidden"
                />
              </span>
            </DisclosureButton>
          </h3>
          <DisclosurePanel className="pt-6">
            <div className="space-y-4">
              {section.options.map((option, optionIdx) => (
                <div key={option.value} className="flex gap-3">
                  <div className="flex h-5 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                      <input
                        defaultValue={option.value}
                        // defaultChecked={option["checked"]}
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        onChange={(e) => {
                          // console.log(e.target.checked ,"  ",{
                          //   filterType: section.id,
                          //   value: e.target.value,
                          // });
                          handleFilters({
                            filterType: section.id,
                            value: e.target.value,
                            checked: e.target.checked,
                          });
                        }}
                        type="checkbox"
                        className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                      />
                      <svg
                        fill="none"
                        viewBox="0 0 14 14"
                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                      >
                        <path
                          d="M3 8L6 11L11 3.5"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-checked:opacity-100"
                        />
                        <path
                          d="M3 7H11"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-indeterminate:opacity-100"
                        />
                      </svg>
                    </div>
                  </div>
                  <label
                    htmlFor={`filter-${section.id}-${optionIdx}`}
                    className="text-sm text-gray-600 border-8"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </DisclosurePanel>
        </Disclosure>
      ))}
    </form>
  );
}

function MobileComponent({
  filters,
  mobileFiltersOpen,
  setMobileFiltersOpen,
  handleFilters,
}) {
  // console.log("in mobile comp", filters);

  // console.log(mobileFiltersOpen);
  if (!filters) {
    return <>Loading...</>;
  }
  // console.log(filters);

  return (
    <div>
      <Dialog
        open={mobileFiltersOpen}
        onClose={setMobileFiltersOpen}
        className="relative z-40 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full"
          >
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Filters */}
            <form className="mt-4 border-t border-gray-200 ">
              <h3 className="sr-only">Categories</h3>

              {filters.map((section) => (
                <Disclosure
                  key={section.id}
                  as="div"
                  className="border-t border-gray-200 px-4 py-6"
                >
                  <h3 className="-mx-2 -my-3 flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                      <span className="font-medium text-gray-900">
                        {section.name}
                      </span>
                      <span className="ml-6 flex items-center">
                        <PlusIcon
                          aria-hidden="true"
                          className="size-5 group-data-open:hidden"
                        />
                        <MinusIcon
                          aria-hidden="true"
                          className="size-5 group-not-data-open:hidden"
                        />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className="pt-6">
                    <div className="space-y-6">
                      {section.options.map((option, optionIdx) => (
                        <div key={option.value} className="flex gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                              <input
                                defaultValue={option.value}
                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                type="checkbox"
                                onChange={(e) =>
                                  handleFilters({
                                    filterType: section.id,
                                    value: e.target.value,
                                    checked: e.target.checked,
                                  })
                                }
                                className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                              />
                              <svg
                                fill="none"
                                viewBox="0 0 14 14"
                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                              >
                                <path
                                  d="M3 8L6 11L11 3.5"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="opacity-0 group-has-checked:opacity-100"
                                />
                                <path
                                  d="M3 7H11"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="opacity-0 group-has-indeterminate:opacity-100"
                                />
                              </svg>
                            </div>
                          </div>
                          <label
                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                            className="min-w-0 flex-1 text-gray-500"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              ))}
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
function DesktopComponent({
  products,
  totalItems,
  filters,
  setMobileFiltersOpen,
  handleFilters,
  setSortQuery,
  page,
}) {
  const handleSort = (e, options) => {
    let value = options.sort;
    if (options.order === "desc") value = "-" + value;
    // console.log(options);
    setSortQuery({ filterType: "_sort", value: value });
  };
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* heading part  with sort and mobile...... */}
      <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6 ">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          All Products
        </h1>

        <div className="flex items-center ">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                Sort
                <ChevronDownIcon
                  aria-hidden="true"
                  className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                />
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white ring-1 shadow-2xl ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
              <div className="py-1">
                {sortOptions.map((option) => (
                  <MenuItem key={option.name}>
                    <p
                      onClick={(e) => handleSort(e, option)}
                      className={classNames(
                        option.current
                          ? "font-medium text-gray-900"
                          : "text-gray-500",
                        "block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden"
                      )}
                    >
                      {option.name}
                    </p>
                  </MenuItem>
                ))}
              </div>
            </MenuItems>
          </Menu>

          <button
            type="button"
            className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
          >
            <span className="sr-only">View grid</span>
            <Squares2X2Icon aria-hidden="true" className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
          >
            <span className="sr-only">Filters</span>
            <FunnelIcon aria-hidden="true" className="size-5" />
          </button>
        </div>
      </div>
      {/* ========================== sort section ends here  */}

      {/*  Product Component and Filter section Starts  */}
      <section aria-labelledby="products-heading" className="pt-6 pb-24">
        <h2 id="products-heading" className="sr-only">
          Products
        </h2>
        <div className="grid grid-cols-1 gap-x-0 gap-y-10 lg:grid-cols-6">
          {/* Filters ===================== */}
          {/* <div className="border-8"> */}
          <Filters filters={filters} handleFilters={handleFilters} />
          {/* </div> */}
          {/* Filters end ============ */}

          {/* Product grid */}
          <div className="lg:col-span-5">
            {<ProductsComponent products={products} />}
          </div>
        </div>
      </section>

      {/*========================== here the complete Product Component and Filter section end*/}

      {/* Section of Pagination */}
      <div className="ok">
        <ProductPagination totalItems={totalItems} page={page} />
      </div>
    </main>
  );
}
