import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Home from "./pages/home/home";
import Error from "./components/default/default";
import ProductInfo from "./pages/productInfo/product";
import CartPage from "./pages/cart/cartPage";
import AllProduct from "./pages/allProducts/allProducts";
import Signup from "./pages/authentication/signup";
import Login from "./pages/authentication/login";
import UserDashboard from "./pages/user/userDashboard";
import AdminDashboard from "./pages/admin/adminDashboard";
import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import AdminOnlyRoutes from "./protectedRoutes/adminOnlyRoutes";
import UserOnlyRoutes from "./protectedRoutes/userOnlyRoutes";
import AddProductPage from "./pages/admin/addProduct";
import UpdateProductPage from "./pages/admin/updateProduct";
import { getCartItems } from "./redux/cartSlice.js";
import { useDispatch } from "react-redux";

function App() {
  const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 0);
    }, [pathname]);
    return null;
  };
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('users'))
  useEffect(()=>{
    console.log('dispatching get getItems function')
    dispatch(getCartItems({userId:user.userId}));
 },[])

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<Error />} />
        <Route path="/productinfo" element={<ProductInfo />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/productinfo" element={<ProductInfo />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/all-products" element={<AllProduct />} />
        <Route path="/addproduct" element={<AddProductPage />} />
        <Route path="/updateproduct/:id" element={<UpdateProductPage />} />

        <Route
          path="/user-dashboard"
          element={
            <UserOnlyRoutes>
              <UserDashboard />
            </UserOnlyRoutes>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <AdminOnlyRoutes>
              <AdminDashboard />
            </AdminOnlyRoutes>
          }
        />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
