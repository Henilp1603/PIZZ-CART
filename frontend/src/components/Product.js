import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Cartcontext } from '../pages/Cartcontext';

function Product(props) {
  const [isAdding,setIsAdding]=useState(false);
  const {cart,setCart}=useContext(Cartcontext);

  const addToCart=(event,product)=>{
    event.preventDefault();
    let _cart={...cart};
    if(!_cart.items){
      _cart.items={}
    }
    if(_cart.items[product._id]){
      _cart.items[product._id]+=1;

    }else{
      _cart.items[product._id]=1
    }
    if(!_cart.totalItem){
      _cart.totalItem=0;
    }
    _cart.totalItem+=1;
    setCart(_cart);
    setIsAdding(true);
    setTimeout(()=>{
      setIsAdding(false);


    },1000)
    // const cart={
    //   item:{
    //     '6abbcgdj6bsfh':2,
    //     '6abbcgdj5thoh':3,

    //   },
    //   totalItem:5
    // }

  }
  
  return (
    <Link to={`/products/${props.product._id}`}>
    <div>
    <img src={props.product.image} alt="peproni" className='object-contain h-48 w-96 ' />
    <div className='text-center'>
      <h2 className='text-lg font-bold py-2'>{props.product.name}</h2>
      <span className='bg-gray-200 py-1 rounded-full text-sm px-4'>{props.product.size}</span>
    </div>
    <div className='flex justify-between item-center mt-4'>
      <span>${props.product.price}</span>
      <button disabled={isAdding}  onClick={(e)=>{addToCart(e,props.product)}} className={`${isAdding?'bg-green-500':'bg-yellow-500'} py-1 px-4 rounded-full font-bold`}>ADD{isAdding?'ED':''}</button>
    </div>

  </div>
    </Link>
  )
}

export default Product