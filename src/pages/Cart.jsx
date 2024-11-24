import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Loader from '../components/Loader';
import axios from 'axios';



export default function Cart() {

    const[loading,setLoading]=useState(true);
const [cart, setCart]=useState([]);

function cartSummary(){
    axios.get("https://shop-co-backend.onrender.com/api/v1/cart/summary",{withCredentials:true})
    .then((res)=>{
        console.log(res.data);
        setCart(res.data.cart);
        setLoading(false);
    }).catch(err =>{
        console.log(err.response);
        setLoading(false);
    })
}
useEffect(()=>{
return ()=>cartSummary()
},[])
  return (
    <>
    {
        loading?<Loader/>:
        <div>
              <NavBar/>
              <div>
                
              </div>
              <Footer/>
        </div>
    }
    </>
 
  )
}
