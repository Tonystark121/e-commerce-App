import Password from "antd/es/input/Password";
import React, { useContext, useState } from "react";
import { Link, json } from "react-router-dom";
import { AppContext } from "../../context/context";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    Password: "",
  });
  const navigate = useNavigate();
  const { isLoading, setIsLoading } = useContext(AppContext);
  const handleSubmit = async () => {
    //  validation
    if (userData.name === "" || userData.email === "") {
      toast.error("All Fields are required");
    }
    setIsLoading(true);
    // const q = query(collection(db,'user'))
    try {
      await signInWithEmailAndPassword(auth, userData.email, userData.Password)
        .then((response) => {
          try {
            const q = query(
              collection(db, "user"),
              where("id", "==", response.user.uid)
            );
            console.log(q);
            const data = onSnapshot(q, (querySnapShot) => {
              let user;
              querySnapShot.forEach((doc) => {
                 user = doc.data()
              });
              localStorage.setItem("users", JSON.stringify(user));
              setUserData({
                email: "",
                Password: "",
              });
              toast.success("Logged in SuccessFull");
              setIsLoading(false);
              navigate("/");
            });

            return () => data;
          } catch (error) {
            console.log(error);
            throw new Error("Something went wrong");
          }
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          throw new Error("something went wrong!");
        });
    } catch (error) {
      console.log(error);
      throw Error;
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      {/* Login Form  */}
      <div className="login_Form bg-pink-50 px-1 lg:px-8 py-6 border border-pink-100 rounded-xl shadow-md">
        {/* Top Heading  */}
        <div className="mb-5">
          <h2 className="text-center text-2xl font-bold text-pink-500 ">
            Login
          </h2>
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
              setUserData({ ...userData, Password: e.target.value })
            }
          />
        </div>

        {/* Signup Button  */}
        <div className="mb-5">
          <button
            type="button"
            className="bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md "
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>

        <div>
          <h2 className="text-black">
            Don't Have an account{" "}
            <Link className=" text-pink-500 font-bold" to={"/signup"}>
              Signup
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Login;
