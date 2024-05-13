import {
  collection,
  deleteDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { Children, createContext, useEffect, useState } from "react";
import { db } from "../firebase/config";
import toast from "react-hot-toast";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [isLoding, setIsLoading] = useState(false);
  const [getAllProduct, setGetAllProduct] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [getAllUser, setGetAllUser] = useState([]);

  // get all Products
  const getAllProducts = async () => {
    setIsLoading(true);
    try {
      const q = query(collection(db, "products"), orderBy("time"));
      const data = onSnapshot(q, (querySnapshot) => {
        let allProduct = [];
        querySnapshot.forEach((doc) =>
          allProduct.push({ ...doc.data(), id: doc.id })
        );
        console.log(allProduct)
        setGetAllProduct(allProduct)
        setIsLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  console.log(getAllProduct)

  // get all Orders
  const getAllOrders = () => {
    setIsLoading(false);
    try {
      const q = query(collection(db, "Products"), orderBy("time"));
      const data = onSnapshot(q, (querySnapshot) => {
        let allOrders = [];
        querySnapshot.forEach((doc) =>
          allOrders.push({ ...doc.data(), id: doc.id })
        );
        setGetAllProduct(allOrders);
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
    getAllProducts();
    getAllOrders();
    getAllUserFunction();
  }, []);

  return (
    <AppContext.Provider
      value={{
        isLoding,
        setIsLoading,
        allOrders,
        setAllOrders,
        getAllProduct,
        getAllUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
