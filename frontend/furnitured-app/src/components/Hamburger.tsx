import { Link } from "react-router-dom";
//TYPES
import { Burger } from "./T";

interface Props {
    onClose: () => void,
}

const Hamburger = ({ onClose }:Props) => {
    
    const menuList:Burger[] = [
        {id:1, name: "all stuff", link: "/all"}, 
        {id:2, name: "my basket", link: "/basket"}, 
        {id:3, name: "my livingroom", link: "/livingroom"}, 
        {id:4, name: "dark mode", link: "/darkMode"}, 
        {id:5, name: "newsletter", link: "/newsletter"},
        {id:6, name: "contact us", link: "contact"},
        {id:7, name: "FAQs", link:"/faq"}
    ]

  return (
    <div className="burger bg-[#DEDDE7] p-8 pb-10 h-full fixed flex flex-col gap-4">
        { menuList.map((item) => (
            <Link to={item.link}><div key={item.id} className="bg-white p-4 rounded-xl text-2xl flex justify-center items-center" onClick={onClose}>{item.name}</div></Link>
        ))}  
    </div>
  )
}

export default Hamburger