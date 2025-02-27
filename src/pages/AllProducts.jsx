import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

export default function AllProducts() {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  function navigateToProductDetails(id){
    navigate("/productdetails", {state: {id: id}})
  }

  function viewAllProducts() {
    axios
      .get("https://shop-co-backend.onrender.com/api/v1/products/all", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setProduct(res.data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setLoading(false);
      });
  }

  useEffect(() => {
     viewAllProducts();
  }, []);

  return (
    <>
  {
    loading?<Loader/>: <div className="poppins ">
    <div className="bg-black text-white text-lg py-1 pt-2 ">
      <marquee behavior="" direction="">
        Sign up and get 20% off to your first order.{" "}
        <a href="">Sign Up Now</a>
      </marquee>
    </div>
   <NavBar/>
    <div className="flex flex-wrap justify-evenly items-center mx-20">
      {product.length != 0 &&
        product.map((product, id) => (
          <div key={id} className="my-8 cursor-pointer" onClick={() => navigateToProductDetails(product._id)}>
            <img src={product.imgs} alt="" className="w-[300px]  " />
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
    <Footer/>

  </div>
 } </>
  );

}
