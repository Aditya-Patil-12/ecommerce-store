import React from "react";
import { useState } from "react";
import { Link } from "react-router";
import { MdDelete } from "react-icons/md";
import { editProductAsync } from "../productList/productListSlice";
import { useDispatch } from "react-redux";
import ModalContainer from "../../commonComponents/ModalPage";
import RemoveProductNotification from "../cart/cartComponents/RemoveProductNotification";

import { toast } from "react-toastify";
const AdminProductComponent = ({ products }) => {
  const [open, setOpen] = useState(null);

  const dispatch = useDispatch();

  const deleteProductDispatcher = async (product) => { 
    const { deleted } = product;
    if (deleted) {
      await dispatch(editProductAsync({ ...product, deleted: false }));
    } else{
      
      await dispatch(editProductAsync({ ...product, deleted: true }));
    }
    toast.success(`${product?.title} Deleted Succesfully`);
  };

  if (!products) {
    return <div>Loading ...</div>;
  }
  console.log(products);
  // console.log("Inside product components", products);
  return (
    <div className="bg-white">
      <ModalContainer
        setOpen={setOpen}
        open={open}
        actionName={"Delete Product"}
        actionType={"Delete"}
        actionMethod={deleteProductDispatcher}
        payload={open}
        alertMessage={`${open?.title} Deleted Succesfully`}
      >
        <RemoveProductNotification itemTitle={open?.title} />
      </ModalContainer>
      <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
        {/* <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2> */}

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products.map((product) => (
            <div className="">
              <Link to={"/product-detail" + `/${product.id}`} key={product.id}>
                <div key={product.id} className="group relative ">
                  <div className="border-gray-400 border-1 rounded-md ">
                    <div className="">
                      <img
                        alt={`Product id image - ${product.title}`}
                        src={product.thumbnail}
                        className="aspect-square w-full h-full block rounded-md bg-gray-200  group-hover:opacity-75 lg:aspect-auto lg:h-80"
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          {/* <a href={product.href}>
                            <span aria-hidden="true" className="absolute inset-0" /> */}
                          {product.name}
                          {/* </a> */}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 ">
                          {product.category}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-gray-900 ">
                        ${product.price}
                      </p>
                    </div>
                  </div>
                  <div>{product.deleted ? "Product Deleted" : ""}</div>
                </div>
              </Link>
              <div className="flex flex-row justify-between items-center">
                <Link
                  to={`/admin/productForm/edit/${product.id}`}
                  className=" mt-2 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-2 text-base font-medium text-white shadow-xs hover:bg-indigo-700 cursor-pointer"
                >
                  Edit Product
                </Link>
                <button
                  className="border-2 h-2/3 rounded-4xl p-2"
                  onClick={() => setOpen(product)}
                >
                  {" "}
                  <MdDelete />{" "}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProductComponent;
