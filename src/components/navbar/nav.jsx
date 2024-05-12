import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../searchbar/search";
import ColorTheme from "../colorTheme/theme";

const nav = () => {
  const Navlinks = () => {
    return (
      <ul className="flex space-x-3 text-white font-medium text-md px-5 ">
        {/* Home */}
        <li>
          <Link to={"/"}>Home</Link>
        </li>

        {/* All Product */}
        <li>
          <Link to={"/allproduct"}>All Product</Link>
        </li>

        <li>
          <Link to={"/signup"}>Signup</Link>
        </li>

        {/* Signup */}
        {/* {!user ? (
          <li>
            <Link to={"/signup"}>Signup</Link>
          </li>
        ) : (
          ""
        )} */}

        {/* Signup */}
        {/* {!user ? (
          <li>
            <Link to={"/login"}>Login</Link>
          </li>
        ) : (
          ""
        )} */}

        {/* User */}
        {/* {user?.role === "user" && (
          <li>
            <Link to={"/user-dashboard"}>User</Link>
          </li>
        )} */}

        {/* Admin */}
        {/* {user?.role === "admin" && (
          <li>
            <Link to={"/admin-dashboard"}>Admin</Link>
          </li>
        )} */}

        {/* logout */}
        {/* {user && (
          <li className=" cursor-pointer" onClick={logout}>
            logout
          </li>
        )} */}

        {/* Cart */}
        <li>
          <Link to={"/cart"}>Cart(0)</Link>
        </li>
      </ul>
    );
  };

  return (
    <nav className="bg-pink-600 sticky top-0 z-30">
      <div className="lg:flex lg:justify-between items-center py-3 lg:px-3 ">
        {/* Logo */}
        <div className="left py-3 lg:py-0">
          <Link to={"/"}>
            <div className="flex items-center gap-2 ">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9gCQGr--4DsUIXGnWIzFhleeswmtiUCqiIlBHj2du0GGl0Jwy21eXb_vFTDUOpx95Kdk&usqp=CAU"
                alt="Logo"
                width={40}
                height={40}
              />
              <h2 className=" font-bold text-white text-2xl text-center">
                Myntra
              </h2>
            </div>
          </Link>
        </div>
        {/* Links */}
        <div className="right flex justify-center mb-4 lg:mb-0">
          <Navlinks />
        </div>
        {/* search Bar */}
        <SearchBar />

        {/* theme */}
        <ColorTheme/>
      </div>
    </nav>
  );
};

export default nav;
