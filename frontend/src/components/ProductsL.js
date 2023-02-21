import React from 'react'
import Product from '../components/Product';
import { useState ,useEffect} from "react";
function ProductsL() {
   const [products,setProducts]=useState([]);
   useEffect(()=>{
    fetch('/api/products').then((res)=>{
      return res.json();
    }).then((products)=>{
      setProducts(products);

    })
   },[]);
     
   

  return (
    <div className='container mx-auto pb-24 px-16'>
      <h1 className='text-lg font-bold my-8'>Products</h1>
       <div className='grid grid-cols-5 my-8 gap-24'>
        
        {
          products.map(product=> <Product key={product._id} product={product}/>)

        }


        
      </div> 

    </div>
  )
}

export default ProductsL