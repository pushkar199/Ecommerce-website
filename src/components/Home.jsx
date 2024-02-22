import React from "react";
import Products from "./Products";

const Home = () => {
  return (
    <>
      <section>
        <h2 className="text-3xl text-center my-8 font-bold text-gray-900 sm:text-3xl">
          Thunder Shop 
        </h2>
        <Products />

      </section>
    </>
  );
};

export default Home;
