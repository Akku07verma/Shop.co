import React from 'react'
import { AiFillTwitterCircle, AiOutlineGithub } from 'react-icons/ai'
import { BiLogoFacebookCircle } from 'react-icons/bi'
import { RiInstagramFill } from 'react-icons/ri'

export default function Footer() {
  return (
    <footer className=" relative flex w-full flex-col mt-40">
    <div className="bg-black absolute top-[-37%] left-[50%] -translate-x-1/2 flex p-6 w-[85%] m-auto  rounded-xl">
      <h1 className="bungee text-3xl text-white relative  p-10">
        STAY UPTO DATE ABOUT <br />
        OUR LATEST OFFERS
      </h1>
      <p className="flex flex-col relative top-[5%] left-[35%] ">
        <input
          type="email"
          placeholder="Enter Your Email Address.."
          className="border rounded-full p-4 m-2  w-[120%]"
        />
        <button className="border border-2 rounded-full p-4  bg-white text-black text-lg w-[120%] m-2">
          Subscribe to Newsletter
        </button>
      </p>
    </div>
    <div className="bg-[#f0f0f0] flex w-full justify-evenly items-center ">
      <div className="flex flex-col p-10 pt-28 ">
        <h1 className="bungee text-2xl ">Shop.co</h1>
        <p>
          We have clothes that suits your <br />
          style and which you’re proud to <br />
          wear. From women to men.
        </p>
        <p className="flex p-4 ">
          <AiFillTwitterCircle /> <BiLogoFacebookCircle/>
          <RiInstagramFill />
          <AiOutlineGithub />
        </p>
      </div>
      <div className=" poppins flex flex-col text-gray-800 p-10 pt-28">
        <p className="text-black font-bold py-4">Company</p>
      
        <p className="text-gray-500">About</p>
       <p className="text-gray-500"> Features</p>
       <p className="text-gray-500"> Works </p>
       <p className="text-gray-500"> Career</p> 
      </div>
      <div className=" poppins flex flex-col text-grey-800 p-10 pt-28">
        <p className=" poppins text-black font-bold py-4">Help</p>
       <p className="text-gray-500">Customer Support</p>
       <p className="text-gray-500">Delivery Details</p>
       <p className="text-gray-500">Terms & Conditions</p>
       <p className="text-gray-500">Privacy Policy</p> 
      </div>
      <div className="poppins flex flex-col text-grey-800 p-10 pt-28">
        <p className="poppins text-black font-bold py-4">Resources</p>
       <p className="text-gray-500">Free eBooks</p>
       <p className="text-gray-500">Development Tutorial</p>
       <p className="text-gray-500">How to - Blog</p>
       <p className="text-gray-500">Youtube Playlist</p> 
      </div>
    </div>
    <hr />
  </footer>
  )
}
