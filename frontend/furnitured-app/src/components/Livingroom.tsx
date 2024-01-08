import { useState, useEffect } from "react";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { useSelectedFurniture } from './SelectedFurnitureContext';

const Livingroom = () => {
    
  const { selectedFurniture } = useSelectedFurniture()
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(false);
  }, [])

  const handleBack = () => {

    if (window.location.pathname === '/livingroom') {

      navigate(-1)
    }
  }
 
  return (
    <div className="flex justify-center">
        <div className="grid-box">
            { isLoading ? <Loading/> :
                
                selectedFurniture.map((furniture, index) => (
                        
                  <div key={index} className={furniture.type + "s"}>

                    <img className={furniture.type} src={furniture.picture} />

                  </div>

                ))
            }
            <div className=" back-button">
                <button onClick={ handleBack } >back</button>
            </div>
        </div>    
    </div>
  )
}

export default Livingroom