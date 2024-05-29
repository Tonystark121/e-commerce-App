import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase/config";
import {
  collection,
  addDoc,
  getDoc,
  query,
  where,
  orderBy,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

const storedItems = localStorage?.getItem("cart");
const initialState = {
  items: [],
  orders: [],
};

const color = [
  "red",
  "yellow",
  "green",
  "gray",
  "brown",
  "orange",
  "black",
  "white",
  "voilet",
  "pink",
];

export const addItemsToCart = createAsyncThunk(
  "cart/addItemsToCart",
  async ({ userId, item }) => {
    const newItem = {
      ...item,
      color: color[Math.floor(Math.random() * color.length)],
      originalPrice: item.price * Math.floor(Math.random() * 10),
      discount: Math.floor(Math.random() * 10),
      size: `${Math.floor(Math.random() * 100)}cm`,
    };
    try {
      const cartRef = collection(db, `user/${userId}/cart`);
      const queryRef = query(cartRef, where("id", "==", newItem.id));
      const snapshot = await getDocs(queryRef);
      if (!snapshot.empty) {
        console.log("Item already exists in the cart.");
        return null;
      }
      const docRef = await addDoc(cartRef, newItem);
      console.log(docRef);
      return { docId: docRef.id, ...newItem };
    } catch (error) {
      console.log(error, "something went wrong!");
      throw error;
    }
  }
);

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (userId) => {
    try {
      const cartRef = query(
        collection(db, `user/${userId}/cart`),
        orderBy("time")
      );
      const snapshot = await getDocs(cartRef);
      console.log(snapshot.size);
      let allItems = [];
      snapshot.forEach((doc) => {
        allItems.push({ ...doc.data(), docId: doc.id });
      });
      return allItems;
    } catch (error) {
      console.log(error, "something went wrong");
      throw error;
    }
  }
);

export const deleteItemFromcart = createAsyncThunk(
  "cart/deleteItemFromcart",
  async ({userId, id}) => {
    console.log('I am here')
    try {
      const cartDocRef = doc(db, `user/${userId}/cart/${id}`);
      console.log(cartDocRef)
      await deleteDoc(cartDocRef);
      console.log("Document deleted successfully.");
      return id;
    } catch (error) {
      console.log(error, "Something went wrong");
      throw error;
    }
  }
);

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log(action);
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    },
    deleteFromCart: (state, action) => {
      return {
        ...state,
        items: state.items.filter((ele) => ele.id !== action.payload.id),
      };
    },
    incrementQuantity: (state, action) => {
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        }),
      };
    },
    decrementQuantity: (state, action) => {
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        }),
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addItemsToCart.fulfilled, (state, action) => {
      console.log(action);
      if (action.payload !== null) {
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      }
      return state;
    });
    builder.addCase(getCartItems.fulfilled, (state, action) => {
      console.log(action.payload);
      return {
        ...state,
        items: [...action.payload],
      };
    });
    builder.addCase(deleteItemFromcart.fulfilled, (state, action) => {
      console.log(action.payload);
      return state;
    });
  },
});

export const {
  addToCart,
  deleteFromCart,
  decrementQuantity,
  incrementQuantity,
} = CartSlice.actions;

export default CartSlice.reducer;
