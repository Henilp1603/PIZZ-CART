import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { Cartcontext } from '../pages/Cartcontext';

function Nav() {
    const cartStyle={
        background:"#F59E0D",
        display:"flex",
        padding:"6px 12px",
        borderRadius:"50px"
    }
    const{cart}=useContext(Cartcontext);
  return (
    <>
        <nav className='container mx-auto flex item-center justify-between py-4 px-16' >
            
                <Link to="/">
                <img  style={{height:45}} src="/images/logo.png" alt="logo" />
                </Link>
                <ul className='flex item-center'>
                    <li ><Link to="/">Home</Link></li>
                    <li className='ml-6'><Link to="/products">Products</Link></li>
                    <li className='ml-6'>
                        <Link to="/cart">
                            <div style={cartStyle}>
                                <span className='text-black'>{cart.totalItem?cart.totalItem:0}</span>
                                <img  className='ml-2 text' src="/images/cart.png" alt="cart"/>
                            </div>

                        </Link>
                    </li>

                </ul>


            

        </nav>
    </>
  )
}

export default Nav