import React, { useContext, useEffect, useState } from 'react'
import { Cartcontext } from './Cartcontext'

function Cart() {
  let total=0;
  const [products,setProducts]=useState([]);
  const {cart,setCart}= useContext(Cartcontext);

  const [priceFetched,togglePriceFetched]=useState(false);
  useEffect(()=>{
    if(!cart.items){
      return;
    }
    if(priceFetched){
      return;
    }
    fetch('/api/products/cart-items',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({ids:Object.keys(cart.items)})
    }).then(res=>res.json()).then(products=>{
      setProducts(products)
      togglePriceFetched(true);
      // console.log(products)
    })
  },[cart])

  const getQty=(productID)=>{
    return cart.items[productID]

  }

  const inCrement=(productID)=>{
    const oldQty=cart.items[productID];
    const _cart={...cart};
    _cart.items[productID]=oldQty+1;
    _cart.totalItem+=1;
    setCart(_cart)
  }
  const deCrement=(productID)=>{
    let oldQty=cart.items[productID];
    if (oldQty===1){
      return
    }
    const _cart={...cart};
    _cart.items[productID]=oldQty-1;
    _cart.totalItem-=1;
    setCart(_cart)
  }
  const getSum=(productID,price)=>{

    const sum =price*getQty(productID);
    total+=sum;
    return sum;

  }
  const handelDelete=(productID)=>{
    const _cart={...cart};
    const Qty=_cart.items[productID];
    delete _cart.items[productID];
    _cart.totalItem-=Qty;
    setCart(_cart);
    setProducts(products.filter((product)=>product._id !== productID))

  }
  const handelOrder=()=>{
    window.alert('Order Placed Succesfully!')
    setProducts([])
    setCart({})
  }
  return (
    
    products.length ?
    <div className='container mx-auto lg:w-1/2 w-full pd-24'>
      <h1 className='my-12 font-bold'>Cart items</h1>
      <ul>
        {
          products.map(product=>{
            return (
              <li className='mb-12' key={product._id}>
              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <img  className='h-16' src={product.image} alt="" />
                  <span className='font-bold ml-4 w-48'>{product.name}</span>
                </div>
                <div>
                  <button  onClick={()=>{deCrement(product._id)}}  className='bg-yellow-500 px-4 py-2 rounded-full leading-none'>-</button>
                  <b className='px-4'>{getQty(product._id)}</b>
                  <button onClick={()=>{inCrement(product._id)}} className='bg-yellow-500 px-4 py-2 rounded-full leading-none'>+</button>
                </div>
                <span >${getSum(product._id,product.price)}</span>
                <button className='bg-red-500 px-4 py-2 rounded-full leading-none text-white' onClick={()=>{handelDelete(product._id)}} >Delete</button>
              </div>
            </li>

            )
          })
        }
       
        
      </ul>
      <hr className='my-6' />
      <div className='text-right '>
       <b> Grand Total</b>:${total}
      </div>
      <div className='text-right mt-6'>
        <button className='bg-yellow-500 px-4 py-2 rounded-full leading-none' onClick={handelOrder} >Order Now</button>
      </div>
        
    </div>
    : 
    <img  className='mx-auto w-1/2 mt-12' src="/images/empty-cart.png" alt="" />
    
  )
}

export default Cart