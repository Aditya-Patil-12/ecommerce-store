import React from "react";
import { Link } from "react-router";
const ProductsComponent = ({products}) => {
  // console.log("give me", products);
  
  if( !products ){
    return <div>Loading ...</div>
  }
  // console.log(products);
  
  // console.log("Inside product components", products);
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8 ">
        {/* <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2> */}

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products.map((product) => (
            <Link to={"/product-detail"+`/${product.id}`} key={product.id}>
              <div key={product.id} className="group relative">
                <div>
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
                    <p className="mt-1 text-sm text-gray-500">
                      {product.category}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    ${product.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsComponent;
