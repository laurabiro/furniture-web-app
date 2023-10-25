import {useState} from "react";

const DarkMode = () => {

    const [onOrOff, setOnOrOff] = useState("On")

    const handle = () => {
        if(onOrOff === "On"){
            setOnOrOff("Off")
        }else{
            setOnOrOff("On")
        }
    }

  return (
    
    <div className="darmode h-screen flex justify-center items-center">
        <button className={` p-4 rounded-lg ${onOrOff === "On" ? "bg-black text-white" : "bg-white text-black border-black border-solid border-2"} `} onClick={ handle }> Turn { onOrOff } DarkMode</button>
    </div>
    
  )
}

export default DarkMode