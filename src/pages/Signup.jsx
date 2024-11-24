import React, {useState} from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [data, setData] = useState({
    username:"",
    email: "",
    pass: "",
    address:""
  });

  const navigate = useNavigate();
 
function registerhandler(){
  console.log(data);
  axios
    .post("https://shop-co-backend.onrender.com/api/v1/users/register", data, {
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
      <div className=" poppins text-xl p-10 px-20 flex flex-col justify-evenly items-center  bg-white rounded-xl">
        <h1 className="bungee text-7xl m-7">Shop.co</h1>
        <h2 className="text-3xl font-bold">Register Yourself!</h2>
        <h4 className="text-sm mb-4"> Please Enter Your Details</h4>
        <input
          type="text"
          placeholder="Username"
          className=" w-full py-3 px-4 mt-6 border-b-4 border-black m-2 focus-within:outline-none m-2"
         value={data.username}
         onChange={(e) => {
          setData({
            username:e.target.value,
            email: data.email,
            pass: data.pass,
            address: data.address
          });
        }}/>
        <input
          type="email"
          placeholder="Email"
          className=" w-full py-3 px-4 mt-6 border-b-4 border-black m-2 focus-within:outline-none m-2"
          value={data.email} onChange={(e) => {
            setData({
              email:e.target.value,
              username: data.username,
              pass: data.pass,
              address: data.address
            });
          }}/>
      
        <input
          type="password"
          placeholder="Password"
          className=" w-full py-3 px-4 mt-6 border-b-4 border-black m-2 focus-within:outline-none m-2"
          value={data.pass} onChange={(e) => {
            setData({
              pass:e.target.value,
              email: data.email,
              username: data.username,
              address: data.address
            });
          }}/>
        <input
          type="text"
          placeholder="Address"
          className=" w-full py-3 px-4 mt-6 border-b-4 border-black m-2 focus-within:outline-none m-2"
          value={data.address}  onChange={(e) => {
            setData({
              address:e.target.value,
              email: data.email,
              pass: data.pass,
              username: data.username
            });
          }}/>
        <button onClick={registerhandler} className="m-8 p-4 bg-black text-2xl text-white w-[50%] rounded-full">
          Register
        </button>

        <p className="text-xs w-full  flex justify-center">
          Already have an account?
          <p className="text-l font-bold text-black">Login</p>
        </p>
      </div>
    </div>
  );

}