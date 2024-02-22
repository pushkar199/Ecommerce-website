import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addToCart, removeFromCart } from "../Store/cartSlice";

const Product = () => {
  const [product, setproduct] = useState();
  const { id } = useParams();
  const [loading, setloading] = useState(true);
  const state = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      let res = await axios.get(
        `https://dummyjson.com/products/${id}`
      );
      setproduct(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
    setTimeout(() => {
      setloading(false);
    }, 500);
  }, []);

  return (
    <>
      

      {loading ? (
        <div className="absolute left-2/4 top-1/2">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid text-teal-600 border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      ) : (
        <>
          <div className="container px-5 py-24" style={{ cursor: "auto" }}>
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img
                alt="ecommerce"
                className="sm:w-1/3 w-4/5 object-cover object-center rounded"
                src={product ? product.images[0]: ""}
                style={{ cursor: "auto" }}
              />
              <div
                className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0"
                style={{ cursor: "auto" }}
              >
                <h2
                  className="text-sm title-font text-gray-500 tracking-widest"
                  style={{ cursor: "auto" }}
                >
                  ON SALE
                </h2>
                <h1
                  className="text-gray-900 text-3xl title-font font-medium mb-1"
                  style={{ cursor: "auto" }}
                >
                  {product ? product.title : ""}
                </h1>
                <p className="leading-relaxed">
                  {product ? product.description : ""}
                </p>
                <div className="mt-16 flex flex-wrap justify-between">
                  <span className="title-font font-semibold text-3xl text-gray-900">
                    $ {product ? product.price : ""}
                  </span>
                  {!state.find(
                    (stateproduct) => stateproduct.id === product.id
                  ) && (
                    <button
                      onClick={() => {
                        dispatch(
                          addToCart({
                            id: product.id,
                            title: product.title,
                            price: product.price,
                            image: product.images[1],
                          })
                        );
                      }}
                      className="ml-auto mr-2 flex text-white border-0 py-2 px-6 focus:outline-none bg-black rounded"
                    >
                      Add To Cart
                    </button>
                  )}
                  {state.find(
                    (stateproduct) => stateproduct.id === product.id
                  ) && (
                    <button
                      onClick={() => {
                        dispatch(removeFromCart(product.id));
                      }}
                      className="ml-auto mr-2 flex text-white border-0 py-2 px-6 focus:outline-none bg-red-500 hover:bg-red-600 rounded"
                    >
                      Remove From Cart
                    </button>
                  )}
                  
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Product;
