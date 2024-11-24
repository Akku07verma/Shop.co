import React from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { LuShoppingCart } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'

export default function NavBar() {
const navigate = useNavigate()

  return (

    <nav className="bg-white flex justify-center py-8">
            <ul className="flex justify-evenly items-center w-[95%] cursor-pointer">
              <li className="bungee text-5xl mr-8" onClick={()=>navigate("/")}> Shop.co</li>
              <li className="cursor-pointer" onClick={()=>navigate("/allproducts")}>Shop</li>
              <li className="cursor-pointer">On Sale</li>
              <li className="cursor-pointer"><a href="/#new-arrivals">New Arrivals</a></li>
              <li className="cursor-pointer"> Brands</li>
              <li className="cursor-pointer">
                <input
                  type="text"
                  className="w-[500px] focus-within:outline-none p-2 bg-[#f0f0f0]  rounded-full py-2  px-7 text-md"
                  placeholder="Search for products..."
                />
              </li>
              <li className="cursor-pointer">
                <LuShoppingCart size={30} />
              </li>
              <li className="cursor-pointer">
                <FaRegUserCircle size={30} />
              </li>
            </ul>
          </nav>
  )
}
