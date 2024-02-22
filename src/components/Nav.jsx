import React, { useState, useEffect } from "react";
import {Link, NavLink } from "react-router-dom";
import {useDispatch, useSelector } from "react-redux";

const Nav = () => {
  const dispatch = useDispatch();
  const cartProduct = useSelector(state=>state.cart);
  const {loggedin} = useSelector(state=>state.user);

  const user = JSON.parse(localStorage.getItem("userdata"))

  
  return (
    <header className="bg-cyan-400 sticky z-10 top-0 left-0">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-1 sm:gap-8 px-4 sm:px-6 lg:px-8">
        <NavLink className={({isActive})=>`${isActive ? "text-gray-100":"text-gray-200"} font-medium text-white text-xl `} to="/">
        Thunder
        </NavLink>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block"></nav>
          <div className="flex items-center gap-4">
            <div className="flex gap-4">

              <NavLink
                className={({isActive})=>`${isActive?"bg-teal-600 text-white":"bg-gray-200 text-teal-600 hover:text-gray-100"} block rounded-md px-2 py-3 sm:px-5 sm:py-2.5 text-sm font-medium  transition hover:bg-teal-700`}
                to="/cart"
              >
                Cart ({cartProduct.length})
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Nav;
