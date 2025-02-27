import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { useLocation } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import Loader from "../components/Loader";
import { AiFillTwitterCircle, AiOutlineGithub } from "react-icons/ai";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { RiInstagramFill } from "react-icons/ri";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { orbit } from "ldrs";
import { toast } from "sonner";

orbit.register()

export default function ProductDetails() {

  const [data, setData] = useState({
    rating: 0
  });
  const location = useLocation();
  const [count, setCount] = useState(1);
  const [loading, setLoading]=useState(true);
  const [btnLoad, setBtnLoad] =useState(false);
  function increment() {
    setCount(count + 1);
  }
  function decrement() {
    if (count == 1) {
      setCount(1);
    } else {
      setCount(count - 1);
    }
  }

  function addToCart(id){
    setBtnLoad(true);
    axios.post("https://shop-co-backend.onrender.com/api/v1/cart/add", {
      "productId": id
    }, {withCredentials: true})
    .then((res) => {
      console.log(res.data)
      setBtnLoad(false);
      toast.success("Added to cart")
    }).catch(err => {
      console.log(err.response)
      setBtnLoad(false);
      toast.error("Something went wrong")
    })
  }

  function details() {
    axios
      .post(
        "https://shop-co-backend.onrender.com/api/v1/products/details",
        { productId: location.state.id },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data.details);
        setData(res.data.details);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  useEffect(() => {
    console.log(location.state.id);
     details();
  }, []);

  return (
    <>
    {loading? <Loader/>:
    <div className="poppins ">
      <div className="bg-black text-white text-lg py-1 pt-2 ">
        <marquee behavior="" direction="">
          Sign up and get 20% off to your first order.{" "}
          <a href="">Sign Up Now</a>
        </marquee>
      </div>
     <NavBar/>
      <div className="flex p-10 justify-evenly items-center">
        <img src={data.imgs} alt="" className="mx-20" />

        <div>
          <h1 className="bungee text-3xl ">{data.name}</h1>
          {data.rating != 0 && <ReactStars value={data.rating} size={25} edit={false} />}
          <span className="font-bold">${data.new_price}</span>
          <span className="line-through font-light text-sm ml-2">
            ${data.old_price}
          </span>
          {data.old_price != data.new_price && (
            <span className="p-2 bg-[#FF3333] bg-opacity-10 rounded-full ml-3 text-red-500 text-sm">
              {
                -Math.round(
                  ((data.old_price - data.new_price) / data.old_price) * 100
                )
              }
              %
            </span>
          )}
          <br />
          <span className=" poppins text-sm text-gray-600 py-2">
            {data.desc}
          </span>
          <div className="h-0.5 my-2 w-full bg-gray-300"></div>
          <p>
            Choose size <br />
            <button className="border bg-gray-200 w-[20%] text-md poppins text-black rounded-full hover:text-white hover:bg-black rounded-full p-2 m-2">
              Small
            </button>
            <button className="border bg-gray-200 w-[20%] text-md poppins text-black rounded-full hover:text-white hover:bg-black rounded-full p-2 m-2">
              Medium
            </button>
            <button className="border bg-gray-200 w-[20%] text-md poppins text-black rounded-full hover:text-white hover:bg-black rounded-full p-2 m-2">
              Large
            </button>
            <button className="border bg-gray-200 w-[20%] text-md poppins text-black rounded-full hover:text-white hover:bg-black rounded-full p-2 m-2">
              X-Large
            </button>
          </p>
          <br />
          <div className="flex">
            <div className="text-xl bg-gray-200 border rounded-full cursor-pointer text-gray-600 font-bold w-[30%] flex justify-evenly items-center py-2 m-2">
              <button onClick={decrement}>-</button>
              <span>{count}</span>
              <button onClick={increment}>+</button>
            </div>{" "}
            <button disabled={btnLoad} onClick={() => addToCart(location.state.id)} className="border  w-full text-md poppins text-white rounded-full  bg-black rounded-full p-2 m-2">
              {btnLoad ? <span>Adding{" "}<l-orbit color={"white"}></l-orbit></span>:"Add to Cart"}
            </button>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
}</>
  );
}
