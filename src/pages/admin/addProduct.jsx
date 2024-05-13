import React, { useContext, useState } from "react";
import { db } from "../../firebase/config";
import { AppContext } from "../../context/context";
import toast from "react-hot-toast";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const categoryList = [
  {
    name: "fashion",
  },
  {
    name: "shirt",
  },
  {
    name: "jacket",
  },
  {
    name: "mobile",
  },
  {
    name: "laptop",
  },
  {
    name: "shoes",
  },
  {
    name: "home",
  },
  {
    name: "books",
  },
];
const AddProductPage = () => {
  const [productDetail, setProductDetail] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
    description: "",
    quantity: 1,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    }),
  });
  const navigate = useNavigate()
  const { isLoading, setIsLoading } = useContext(AppContext);
  const handleClick = async() => {
    // validation
    if (
      productDetail.name == "" ||
      productDetail.price == "" ||
      productDetail.image == "" ||
      productDetail.category == "" ||
      productDetail.description == ""
    ) {
      return toast.error("all fields are required");
    }
    setIsLoading(true);
    try {
      const reference = collection(db, "products");
      await addDoc(reference, productDetail)
      toast.success("Add product successfully")
      navigate('/admin-dashboard')
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong, Try again");
      throw new Error("Something went Wrong, Try again");
    }
  };
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        {/* Login Form  */}
        <div className="login_Form bg-pink-50 px-8 py-6 border border-pink-100 rounded-xl shadow-md">
          {/* Top Heading  */}
          <div className="mb-5">
            <h2 className="text-center text-2xl font-bold text-pink-500 ">
              Add Product
            </h2>
          </div>

          {/* Input One  */}
          <div className="mb-3">
            <input
              type="text"
              name="title"
              placeholder="Product Title"
              className="bg-pink-50 text-pink-300 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
              onChange={(e) =>
                setProductDetail({ ...productDetail, name: e.target.value })
              }
            />
          </div>

          {/* Input Two  */}
          <div className="mb-3">
            <input
              type="number"
              placeholder="Product Price"
              className="bg-pink-50 text-pink-300 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
              onChange={(e) =>
                setProductDetail({ ...productDetail, price: e.target.value })
              }
            />
          </div>

          {/* Input Three  */}
          <div className="mb-3">
            <input
              type="text"
              placeholder="Product Image Url"
              className="bg-pink-50 text-pink-300 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
              onChange={(e) =>
                setProductDetail({ ...productDetail, image: e.target.value })
              }
            />
          </div>

          {/* Input Four  */}
          <div className="mb-3">
            <select
              className="w-full px-1 py-2 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none"
              onChange={(e) =>
                setProductDetail({ ...productDetail, category: e.target.value })
              }
            >
              <option disabled>Select Product Category</option>
              {categoryList.map((value, index) => {
                const { name } = value;
                return (
                  <option
                    className=" first-letter:uppercase"
                    key={index}
                    value={name}
                  >
                    {name}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Input Five  */}
          <div className="mb-3">
            <textarea
              name="description"
              placeholder="Product Description"
              rows="5"
              className=" w-full px-2 py-1 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none placeholder-pink-300 "
              onChange={(e) =>
                setProductDetail({
                  ...productDetail,
                  description: e.target.value,
                })
              }
            ></textarea>
          </div>

          {/* Add Product Button  */}
          <div className="mb-3">
            <button
              type="button"
              className="bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md"
              onClick={handleClick}
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
