import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function SingleProduct() {
    const [product,setProduct]=useState({});
    const params=useParams();
    const navigate=useNavigate()
    useEffect(()=>{
        fetch(`/api/products/${params._id}`).then((res)=>{
            return res.json()
        }).then((data)=>{
            setProduct(data);
        })
    },[params._id]);





  return (
    <div className='container mx-auto mt-12 px-16'>
        <button className='mb-12 font-bold' onClick={()=>{navigate(-1)}}>Back</button>
        <div className='flex'>
            <img src={product.image} alt="pizza" className='object-fill h-48 w-90'/>
            <div className='ml-8 pt-5'>
                <h1 className='text-xl font-bold'>{product.name}</h1>
                <div className='text-md'>{product.size}</div>
                <div className='font-bold mt-2'>${product.price}</div>
                <button className='bg-yellow-500 py-1 px-8 rounded-full font-bold mt-4'>Add to Cart</button>
                
            </div>
        </div>



    </div>
  )
}

export default SingleProduct