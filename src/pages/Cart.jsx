import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";

export default function Cart() {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);

  function checkout() {
    setLoading(true);
    axios
      .get("https://shop-co-backend.onrender.com/api/v1/checkout", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setTotal(res.data.totalAmt);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  function removeCart(id) {
    setLoading(true);
    axios
      .post(
        "https://shop-co-backend.onrender.com/api/v1/cart/remove",
        { productId: id },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        setCart([]);
        cartSummary();
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  function cartSummary() {
    checkout();
    axios
      .get("https://shop-co-backend.onrender.com/api/v1/cart/summary", {
        withCredentials: true,
      })
      .then(async (res) => {
        console.log(res.data);
        setCart(res.data.cart);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }
  useEffect(() => {
    return () => cartSummary();
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <NavBar />
          <h1 className="bungee text-3xl p-4 ml-16">Your Cart</h1>
            {cart.length != 0 &&  <div className=" flex justify-evenly m-auto w-[90%]">
            <div>
              {cart.length > 0 &&
                cart.map((product, id) => (
                  <div
                    key={id}
                    className="flex relative mb-4 m-auto items-center outline outline-1 outline-gray-300 p-3 w-[590px] rounded-lg"
                  >
                    <div>
                      <img width={100} src={product.imgs} alt="" />
                    </div>
                    <div className="poppins ml-3">
                      <h1 className="font-bold text-lg">{product.name}</h1>
                      <h1>
                        <span>Size:</span>
                        <span className="text-gray-600 ml-1">Large</span>
                      </h1>
                      <h1 className="font-black text-xl">
                        ${product.new_price}
                      </h1>
                      <h1 className="text-sm">Quantity : {product.count}</h1>
                    </div>
                    <MdDelete
                      onClick={() => removeCart(product._id)}
                      className="absolute right-4 top-4 cursor-pointer"
                      color="red"
                      size={25}
                    />
                  </div>
                ))}
            </div>
            <div className="outline outline-1 outline-gray-300 w-[550px] p-4 flex flex-col ">
              <h1 className="bungee text-xl ml-2">Cart Summary</h1>
              <div className="flex justify-between items-center">
                <span className="p-2 text-gray-500 poppins text-lg">
                  Subtotal {""}{" "}
                </span>
                <span className="p-2 text-black font-bold poppins text-lg">
                  ${total}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="p-2 text-gray-500 poppins text-lg">
                  Discount (-10%){""}{" "}
                </span>
                <span className="p-2 text-red-700 font-bold poppins text-lg">
                  - ${Math.round(total * 0.1)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="p-2 text-gray-500 poppins text-lg">
                  Delivery Fee {""}{" "}
                </span>
                <span className="p-2 text-black font-bold poppins text-lg">
                  ${10}
                </span>
              </div>

              <hr />
              <div className="flex justify-between items-center">
                <span className="p-2 text-gray-500 poppins text-lg">
                  Total {""}
                </span>
                <span className="p-2 text-black font-bold poppins text-lg">
                  ${Math.round(total - total * 0.1 + 10)}
                </span>
              </div>

              <div className="flex my-4 justify-between">
                <div>
                  <input
                    type="text"
                    className="bg-gray-200 w-[300px] px-6 py-2 focus-within:outline-none border rounded-full"
                    placeholder="  Apply coupon code"
                  />{" "}
                </div>
                <button className="bg-black text-white w-[150px] rounded-full  ">
                  Apply
                </button>
              </div>
              <button className="bg-black text-white w-full rounded-full py-2 flex justify-center items-center cursor-pointer ">
                Check out <FaArrowRight className="ml-2" />
              </button>
            </div>
          </div>
}
{cart.length == 0 &&  <div className="w-full flex justify-center items-center"><img src="./empty.png" alt="" className=" flex  justify-center items-center w-[350px] "/></div>}
          <Footer />
        </div>
      )}
    </>
  );
}
