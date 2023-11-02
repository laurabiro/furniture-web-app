import { useState, useEffect } from "react";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { useSelectedFurniture } from './SelectedFurnitureContext';

const Livingroom = () => {
    
    const { selectedFurniture } = useSelectedFurniture()
/*     const [ furniture, setFurniture ] = useState<Furniture[]>([]) */

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      setIsLoading(false);
    }, [])
    console.log(selectedFurniture)
 

/*     const [contentchairs, setContentchairs] = useState("") */
  /*   const [contentcabinets, setContentcabinets] = useState("")
    const [contentlamps, setContentlamps] = useState("")
    const [contentcarpets, setContentcarpets] = useState("")
    const [contentframes, setContentframes] = useState("")  */ 

/*     const livingroom:LivingroomFurniture[] = [{status: true, type: "tables", content: "contenttables"},
        {status: true, type: "chairs", content: "contentchairs"},
        {status: true, type: "cabinets", content: "contentcabinets"},
        {status: true, type: "lamps", content: "contentlamps"},
        {status: true, type: "carpets", content: "contentcarpets"},
        {status: true, type: "frames", content: "contentframes"},
    ]

    useEffect(() => {
        const load = async () => {
          const result = await loadFurnitures()
          if(result.success){
            const data = result.data
            const selected = data.filter((selected) => selected.id === +location.state)
            setFurniture(selected)
        
            setContentchairs(furniture[0].picture)

          }
          setIsLoading(false)
        }
        load()
    }, [location.state, furniture]) */
 
  return (
    <div className="flex justify-center">
        <div className="grid-box">
            { isLoading ? <Loading/> :
                
                selectedFurniture.map((furniture) => (
                        
                    <div key={furniture.id} className={furniture.type + "s"}>

                        <img className={furniture.type} src={furniture.picture} />

                    </div>

                ))
            }
            <div className=" back-button">
                <Link to="/all"><button >back</button></Link>
            </div>
        </div>    
    </div>
  )
}

export default Livingroom