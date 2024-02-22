import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../Store/productSlice";
import StatusCode from "../utils/StatusCode";

const Products = ({ limit }) => {
  const dispatch = useDispatch();
  const { data: products, status } = useSelector((state) => state.products);
  const url = `https://dummyjson.com/products/${limit ? "?&limit=8" : ""}`;
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    dispatch(getProducts(url));
  }, [dispatch, url]);

  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "priceLowToHigh") {
        return a.price - b.price;
      } else if (sortBy === "priceHighToLow") {
        return b.price - a.price;
      }
      return 0;
    });

  if (status === StatusCode.REJECTED) {
    return (
      <div role="alert" className="rounded border-s-4 border-red-500 bg-red-50 p-4">
        <div className="flex items-center gap-2 text-red-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
              clipRule="evenodd"
            />
          </svg>

          <strong className="block font-medium"> Error Fetching Data </strong>
        </div>

        <p className="mt-2 text-sm text-red-700">Products Couldn't Be Fetched</p>
      </div>
    );
  }

  return (
    <>
      {/* Search Bar */}
      <div className="text-center my-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded px-4 py-2 focus:outline-none focus:border-blue-500 transition duration-300 shadow-md text-gray-700 w-60"
        />
      </div>

      {/* Filter Options */}
      <div className="flex justify-center mb-4">
        <label className="mr-2 mt-2 text-gray-700">Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded px-4 py-2 focus:outline-none focus:border-blue-500 transition duration-300 shadow-md text-gray-700"
        >
          <option value="default">Default</option>
          <option value="priceLowToHigh">Price Low to High</option>
          <option value="priceHighToLow">Price High to Low</option>
        </select>
      </div>

      {/* Products Container */}
      <div className="container p-8 m-auto">
        <div className="flex justify-center items-center flex-wrap gap-4 ">
          {status === StatusCode.PENDING ? (
            <div className="flex justify-center items-center flex-wrap gap-4 ">
              {Array.from({ length: 20 }).map((_, index) => (
                <div
                  key={index}
                  className="group relative block overflow-hidden shadow-lg transition duration-500 transform hover:scale-105 bg-white rounded-md"
                >
                  <Skeleton height={288} width={288} count={1} />
                  <div className="relative border-2 border-gray-100 bg-white p-4">
                    <h3 className="mt-4 text-lg font-medium text-gray-900">
                      <Skeleton height={28} width={236} count={1} />
                    </h3>
                    <p className="mt-1.5 text-sm text-gray-700">
                      <Skeleton height={20} width={236} count={1} />
                    </p>
                    <SkeletonTheme color="#202020" highlightColor="#facc15">
                      <Skeleton height={54} width={236} count={1} />
                    </SkeletonTheme>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center flex-wrap gap-4 ">
              {filteredProducts.map((product, i) => (
                <div
                  key={i}
                  className="group w-80 h-[470px] relative block overflow-hidden shadow-lg transition duration-500 transform hover:scale-105 bg-white rounded-md"
                >
                  <img
                    src={product.thumbnail}
                    alt=""
                    className="object-cover m-auto transition duration-500 group-hover:opacity-80 sm:h-72 rounded-t-md"
                  />

                  <div className="relative border-2 border-gray-100 bg-white p-6 rounded-b-md">
                    <h3 className="mt-4 text-lg font-medium text-gray-900">
                      {product.title}
                    </h3>

                    <p className="my-1.5 text-sm text-gray-700">
                      $ {product.price}
                    </p>

                    <Link to={`/product/${product.id}`}>
                      <button className="block w-full rounded bg-black p-4 text-sm font-medium text-white">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
