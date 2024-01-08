import { useState } from 'react';
import Hamburger from './Hamburger';
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const [hamburgerOpen, setHamburgerOpen] = useState(false)
    const navigate = useNavigate()

    const handleOpenAndCloseHamburger = () => {
        setHamburgerOpen(!hamburgerOpen)
    }
    const handleCloseHamburger = () => {
      setHamburgerOpen(false)
    }

    const handleBasketClick = () => {

      if (window.location.pathname === '/basket') {

        navigate(-1)
      } else {

        navigate("/basket")
      }
      handleCloseHamburger()
  }
    
  return (

    <div className="pl-4 pr-4 pt-4 bg-[#DEDDE7] dark:bg-gray-900 border-b-3 border-black border-solid flex justify-between z-50 w-full fixed top-0">
        { hamburgerOpen &&  <Hamburger onClose={() => setHamburgerOpen(false)} /> } 
        <p className='pr-20'></p>
        <p className="header-name text-5xl cursor-pointer dark:text-[#DEDDE7]" onClick={handleCloseHamburger}> <Link to="/">livingroom</Link> </p>
        <Link to="/basket">
          <div className="basket" onClick={handleBasketClick}>
            <svg className='w-10 h-10 dark:bg-[#DEDDE7] rounded-lg pt-1 pb-0 pr-1' viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">

            <g id="SVGRepo_bgCarrier" strokeWidth="0"/>

            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>

            <g id="SVGRepo_iconCarrier"> <g clipPath="url(#clip0_15_35)"> <path d="M5.33331 6H19.8672C20.4687 6 20.9341 6.52718 20.8595 7.12403L20.1095 13.124C20.0469 13.6245 19.6215 14 19.1172 14H16.5555H9.44442H7.99998" stroke="#000000" strokeLinejoin="round"/> <path d="M2 4H4.23362C4.68578 4 5.08169 4.30341 5.19924 4.74003L8.30076 16.26C8.41831 16.6966 8.81422 17 9.26638 17H19" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/> <circle cx="10" cy="20" r="1" stroke="#000000" strokeLinejoin="round"/> <circle cx="17.5" cy="20" r="1" stroke="#000000" strokeLinejoin="round"/> </g> <defs> <clipPath id="clip0_15_35"> <rect width="24" height="24" fill="white"/> </clipPath> </defs> </g>

            </svg>
          </div>
        </Link>
        <div className="drawer flex justify-center items-center w-32 h-12 bg-white rounded border-3 border-black border-solid cursor-pointer" onClick={handleOpenAndCloseHamburger}>   
            <div className="drawer-handle w-5 h-5 rounded-full border-2 dark:bg-[#DEDDE7] border-black border-solid bg-gray-300"></div>
        </div>
    </div>
  )
}

export default Header