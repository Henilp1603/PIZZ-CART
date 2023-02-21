
import React, { useEffect, useState } from 'react';
import Home from './pages/Home'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";
import Nav from './components/Nav';
import Products from './pages/Products';
import Cart from './pages/Cart';
import SingleProduct from './pages/SingleProduct';
import { Cartcontext } from './pages/Cartcontext';


function App() {
  const [cart,setCart]=useState({});

  useEffect(()=>{
   const cart = window.localStorage.getItem('cart');
   setCart(JSON.parse(cart));

  },[])

  useEffect(()=>{
    window.localStorage.setItem('cart',JSON.stringify(cart));

  },[cart]);
  return (
    
    <>
    
     <Router>
      <Cartcontext.Provider value={{cart,setCart}}>
          <Nav/>
          <Routes>
              <Route path='/' element={<Home></Home> } exact={true}></Route>
              {/* <Route path='/about' element={<About></About>}></Route> */}
              <Route path='/products' element={<Products/>} exact={true}></Route>
              <Route path='/products/:_id' element={<SingleProduct/>} exact={true}></Route>

              <Route path='/cart' element={<Cart/>}></Route>


          </Routes>
      </Cartcontext.Provider>
     </Router>
      
     
     
    </>
  );
}

export default App;
