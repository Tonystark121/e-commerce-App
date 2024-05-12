/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/context";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/config";
import Loader from "../../components/loader/loader";
import toast from "react-hot-toast";
import { Timestamp, addDoc, collection } from "firebase/firestore";

const Signup = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const navigate = useNavigate()
  const { isLoading, setIsLoading } = useContext(AppContext);
  const handleSubmit = async () => {
    // validation
    if (
      userData.name === "" ||
      userData.email === "" ||
      userData.password === ""
    ) {
      toast.error("All Fields are required");
    }
    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      )
        .then((response) => {
           const user = {
             name:userData.name,
             email:response.user.email,
             id:response.user.uid,
             role:userData.role,
             time:Timestamp.now(),
             date: new Date().toLocaleString('en-US',{
              month:'short',
              day:'2-digit',
              year:'numeric'
             })
           }

          //  create User Reference
          const userRefence = collection(db, 'user')
          addDoc(userRefence, user)

          setUserData({...userData, email:'', name:'', password:''})

          toast.success('Signup Successfully')
          setIsLoading(false)
          navigate('/login')
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false)
          throw new Error("something went wrong!");
        });
    } catch (error) {
      console.log(error);
      throw Error;
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        {/* Login Form  */}
        {isLoading && <Loader />}
        <div className="login_Form bg-pink-50 px-1 lg:px-8 py-6 border border-pink-100 rounded-xl shadow-md">
          {/* Top Heading  */}
          <div className="mb-5">
            <h2 className="text-center text-2xl font-bold text-pink-500 ">
              Signup
            </h2>
          </div>

          {/* Input One  */}
          <div className="mb-3">
            <input
              type="text"
              placeholder="Full Name"
              className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200"
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
          </div>

          {/* Input Two  */}
          <div className="mb-3">
            <input
              type="email"
              placeholder="Email Address"
              className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200"
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </div>

          {/* Input Three  */}
          <div className="mb-5">
            <input
              type="password"
              placeholder="Password"
              className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200"
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </div>

          {/* Signup Button  */}
          <div className="mb-5">
            <button
              type="button"
              className="bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md"
              onClick={handleSubmit}
            >
              Signup
            </button>
          </div>

          <div>
            <h2 className="text-black">
              Have an account{" "}
              <Link className=" text-pink-500 font-bold" to={"/login"}>
                Login
              </Link>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
