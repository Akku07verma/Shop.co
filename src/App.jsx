
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProductDetails from './pages/ProductDetails'
import AllProducts from './pages/AllProducts'
import Cart from './pages/Cart'
export default function App() {
  return (
   <Router>
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route exact path="/login" element={<Login/>} />
      <Route exact path="/signup" element={<Signup/>} />
      <Route exact path="/productdetails" element={<ProductDetails/>} />
      <Route exact path="/allproducts" element={<AllProducts/>} />
      <Route exact path="/cart" element={<Cart/>} />
    </Routes>
   </Router>
  )
}
