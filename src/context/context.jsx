import {
  collection,
  deleteDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../firebase/config";
import toast from "react-hot-toast";
import { DiJsBadge } from "react-icons/di";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [isLoding, setIsLoading] = useState(false);
  const [getAllProduct, setGetAllProduct] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [getAllUser, setGetAllUser] = useState([]);

  // get all Products
  // const getAllProducts = async () => {
  //   setIsLoading(true);
  //   try {
  //     const q = query(collection(db, "products"), orderBy("time"));
  //     const data = onSnapshot(q, (QuerySnapshot) => {
  //       let allProduct = [];
  //       QuerySnapshot.forEach((doc) =>
  //         allProduct.push({ ...doc.data(), id: doc.id }),
  //         console.log(doc.data)
  //       );
  //       setGetAllProduct(allProduct);
  //       setIsLoading(false);
  //     });
  //     return () => data;
  //   } catch (error) {
  //     console.log(error);
  //     setIsLoading(false);
  //   }
  // };

  const getAllProducts = async () => {
    setIsLoading(true);
    try {
      const q = query(collection(db, "products"), orderBy("time"));
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productArray = [];
        QuerySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
        });
        setGetAllProduct(productArray);
        setIsLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  // get all Orders
  const getAllOrders = async () => {
    setIsLoading(false);
    try {
      const q = query(collection(db, "Products"), orderBy("time"));
      const data = onSnapshot(q, (QuerySnapshot) => {
        let allOrders = [];
        QuerySnapshot.forEach((doc) =>
          allOrders.push({ ...doc.data(), id: doc.id })
        );
        getAllOrders(allOrders);
        setIsLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const orderDelete = async () => {
    setIsLoading(false);
    try {
      await deleteDoc(doc(db), orderBy(id));
      toast.success("Order Deleted successfully");
      getAllProducts();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const getAllUserFunction = async () => {
    setIsLoading(true);
    try {
      const q = query(collection(db, "user"), orderBy("time"));
      const data = onSnapshot(q, (QuerySnapshot) => {
        let userArray = [];
        QuerySnapshot.forEach((doc) => {
          userArray.push({ ...doc.data(), id: doc.id });
        });
        setGetAllUser(userArray);
        setIsLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllUserFunction();
    getAllOrders();
    getAllUserFunction();
  }, []);

  // Add to Cart

  const addToCart = (id) => {};

  // console.log(getAllProduct, allOrders, getAllUser);

  return (
    <AppContext.Provider
      value={{
        isLoding,
        setIsLoading,
        allOrders,
        getAllProduct,
        getAllUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
