import React, {useState} from 'react'
import { Outlet } from 'react-router-dom'
import { HeaderComponent, FooterComponent } from '../utils/resource/ComponentsProvider.util'
import Basket from "../components/customer_components/customer_cart/Basket";
import {cartItems} from "../utils/resource/DataProvider.util"


const CustomerLayout = () => {
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  return (
    <div className="bg-[#efefef]">
      {/* Header Section */}
      <header
        id="header"
        className="h-[11vh] w-full bg-white flex items-center justify-between px-[7vw] relative"
      >
        <HeaderComponent toggleBasket={()=>{setIsBasketOpen(!isBasketOpen)}} />
      </header>

      <main>
        {<Outlet/>}
      </main>

      {/* footer section */}
      <footer className="w-full h-fit bg-black px-[7vw] py-[7vh]">
        <FooterComponent />
      </footer>

      
      <Basket isOpen={isBasketOpen} onClose={()=>setIsBasketOpen(false)} cartItems={cartItems} finalPrice="Rs. 500"/>
    </div>
  )
}

export default CustomerLayout