import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import axios from "axios";
import { MdDelete } from "react-icons/md";

export default function Cart() {
  const [loading, setLoading] = useState(true);
//   const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

function getDetails(res){
    const temp = [];
    res.data.cart.forEach(element => {
        axios.post("https://shop-co-backend.onrender.com/api/v1/products/details", {productId: element.id}, {withCredentials: true})
        .then((res) => {
            temp.push(res.data.details);
        })
        .catch(err => {
            console.log(err.response)
        })
    });
    return temp;
  }

  function cartSummary() {
    axios
      .get("https://shop-co-backend.onrender.com/api/v1/cart/summary", {
        withCredentials: true,
      })
      .then(async(res) => {
        console.log(res.data);
        // setCart(res.data.cart);
        const details = getDetails(res);
        console.log(details)
        setProducts(details);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }
  useEffect(() => {
     cartSummary();
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <NavBar />
          <h1 className="bungee text-3xl p-4 ml-16">Your Cart</h1>
          <div>
            {products.length > 0 && products.map((product, id) => (
                <div key={id} className="flex relative mb-4 m-auto items-center outline outline-1 outline-gray-300 p-3 w-[590px] rounded-lg">
                <div>
                  <img width={100} src={product.imgs} alt="" />
                </div>
                <div className="poppins ml-3">
                  <h1 className="font-bold text-lg">{product.name}</h1>
                  <h1>
                    <span>Size:</span>
                    <span className="text-gray-600 ml-1">Large</span>
                  </h1>
                  <h1 className="font-black text-xl">${product.new_price}</h1>
                </div>
                <MdDelete className="absolute right-4 top-4 cursor-pointer" color="red" size={25}/>
              </div>
            ))}
          </div>
          <div></div>
          <Footer />
        </div>
      )}
    </>
  );
}
