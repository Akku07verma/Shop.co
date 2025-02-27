import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillTwitterCircle, AiOutlineGithub } from "react-icons/ai";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { LuShoppingCart } from "react-icons/lu";
import { RiInstagramFill } from "react-icons/ri";
import ReactStars from "react-rating-stars-component";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [top, setTop] = useState([]);
  const navigate = useNavigate();

  function navigateToProductDetails(id){
    navigate("/productdetails", {state: {id: id}})
  }

  function getTopSelling() {
    axios
      .get("https://shop-co-backend.onrender.com/api/v1/products/topselling", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setTop(res.data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        navigate("/login")
        setLoading(false);
      });
  }
  useEffect(() => {
     getTopSelling();
  }, []);

  function getNewArrivals() {
    axios
      .get("https://shop-co-backend.onrender.com/api/v1/products/newarrivals", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        navigate("/login")
        setLoading(false);
      });
  }

  useEffect(() => {
     getNewArrivals();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="poppins ">
          <div className="bg-black text-white text-lg py-1 pt-2 ">
            <marquee behavior="" direction="">
              Sign up and get 20% off to your first order.{" "}
              <a href="">Sign Up Now</a>
            </marquee>
          </div>
          <NavBar/>
          <div className="bg-[#f0f0f0] relative">
            <img src="./Rectangle 4.png" alt="sdg" />
            <img
              className="absolute top-8 right-16"
              src="./Vector.svg"
              alt=""
            />
            <img
              className="absolute top-[30%] right-[45%]"
              src="./Vector (1).svg"
              alt="fdsv"
            />
            <span className="bungee text-6xl absolute top-[15%] left-[5%]">
              FIND CLOTHES <br />
              THAT MATCHES <br />
              YOUR STYLE
            </span>
            <p className="w-[30%] absolute top-[45%] left-[6%]">
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense
              of style.
            </p>
            <button className="m-8 p-4 bg-black text-2xl text-white w-[20%] rounded-full absolute top-[60%] left-[5%]">
              Shop
            </button>
          </div>
          <marquee behavior="scroll" direction="" className="bg-black">
          <div className="bg-black p-6 flex justify-evenly items-center">
            <img src="./Group.svg" alt="" />
            <img src="./gucci-logo-1 1.svg" alt="" />
            <img src="./prada-logo-1 1.svg" alt="" />
            <img src="./zara-logo-1 1.svg" alt="" />
            <img src="./Group (1).svg" alt="" />
          </div>
          </marquee>
          <div id="new-arrivals" className="flex  flex-col justify-evenly items-center">
            <h1 className="bungee text-3xl flex justify-center py-16">
              {" "}
              New Arrivals
            </h1>
            <div className="flex justify-evenly items-center p-4">
              {data.length != 0 &&
                data.map((product, id) => (
                  <div key={id} className="cursor-pointer" onClick={() => navigateToProductDetails(product._id)}>
                    <img
                      src={product.imgs[0]}
                      alt=""
                      className="w-[300px] m-2"
                    />
                    <p className="font-bold text-md">
                      {product.name} <br />{" "}
                    </p>
                    <ReactStars value={product.rating} size={25} edit={false} />
                    <span className="font-bold">${product.new_price}</span>
                    <span className="line-through font-light text-sm ml-2">
                      ${product.old_price}
                    </span>
                    {product.old_price != product.new_price && (
                      <span className="p-2 bg-[#FF3333] bg-opacity-10 rounded-full ml-3 text-red-500 text-sm">
                        {
                          -Math.round(
                            ((product.old_price - product.new_price) /
                              product.old_price) *
                              100
                          )
                        }
                        %
                      </span>
                    )}
                  </div>
                ))}
            </div>
            <br />
            <button className="flex justify-evenly border border-gray-300 bg-white rounded-full w-[20%] p-4 pt-4 text-xl border-2">
              View All
            </button>

            <h1 className="bungee text-3xl flex justify-center py-16">
              {" "}
              Top Selling
            </h1>
            <div className="flex justify-evenly items-center p-4">
              {top.length != 0 &&
                top.map((product, id) => (
                  <div key={id}  className="cursor-pointer" onClick={() => navigateToProductDetails(product._id)} >
                    <img src={product.imgs[0]} alt=""  className="w-[300px] m-2" />
                    <p className="font-bold text-md">
                    {product.name}
                     
                    </p>
                    <ReactStars value={product.rating} size={25} edit={false} />
                   
                    <span className="font-bold">${product.new_price}</span>
                    <span className="line-through font-light text-sm ml-2">
                      ${product.old_price}
                    </span>
                    {product.old_price != product.new_price && (
                      <span className="p-2 bg-[#FF3333] bg-opacity-10 rounded-full ml-3 text-red-500 text-sm">
                        {
                          -Math.round(
                            ((product.old_price - product.new_price) /
                              product.old_price) *
                              100
                          )
                        }
                        %
                      </span>
                    )}
                  </div>
                ))}
            </div>
            <button className="flex justify-evenly border border-gray-300 bg-white rounded-full w-[20%] p-4 pt-4 my-8 text-xl border-2">
              View All
            </button>

            <hr />
           <Footer/>
          </div>
        </div>
      )}
    </>
  );
}
