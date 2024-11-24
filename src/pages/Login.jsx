import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    pass: "",
  });

  const navigate = useNavigate();

  function loginHandler() {
    console.log(data);
    axios
      .post("https://shop-co-backend.onrender.com/api/v1/users/login", data, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        navigate("/")
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
      });
  }

  return (
    <div className="flex w-full h-screen justify-evenly items-center bg-[#E9E9E9]">
      <div className="">
        <img src="./shop.png" alt="" />
      </div>
      <div className=" poppins text-xl p-16 flex flex-col justify-evenly items-center  bg-white rounded-xl">
        <h1 className="bungee text-7xl m-10">Shop.co</h1>
        <h2 className="text-3xl font-bold ">Welcome!</h2>
        <h4 className="text-xl mb-10"> Please Enter Your Details</h4>
        <input
          type="email"
          placeholder="Email"
          className=" w-full py-3 px-4 mt-10 border-b-4 border-black m-2 focus-within:outline-none m-2"
          value={data.email}
          onChange={(e) => {
            setData({
              email: e.target.value,
              pass: data.pass,
            });
          }}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          className="w-full py-3 px-4 border-b-4 border-black m-2 focus-within:outline-none m-2"
          value={data.pass}
          onChange={(e) => {
            setData({
              pass: e.target.value,
              email: data.email,
            });
          }}
        />
        <p className="text-xs w-full text-right">forget password?</p>
        <button
          onClick={loginHandler}
          className="m-8 p-4 bg-black text-2xl text-white w-[50%] rounded-full"
        >
          Login
        </button>
      </div>
    </div>
  );
}
