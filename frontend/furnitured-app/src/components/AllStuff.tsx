import {useState, useEffect} from 'react';
import { Furniture } from './T';
import { loadFurnitures } from "./GetFurnitures";
import Loading  from "./Loading";
import { Link } from 'react-router-dom';
import NoServer from './NoServer';

const AllStuff = () => {
  
  const [ isLoading, setIsLoading ] = useState(true)
  const [ furnitures, setFurnitures ] = useState<Furniture[]>([])

  useEffect(() => {
    const load = async () => {
      const result = await loadFurnitures()
      if(result.success){
        const data = result.data
        setFurnitures(data)
      }
      setIsLoading(false)
    }
    load()
  }, [])
  
  return (
    <div className=" pl-4 pr-4 flex justify-center dark:bg-gray-950">
      { isLoading ? ( 
          <Loading />
        ) : (
          <div className="flex flex-wrap gap-8 justify-center w-11/12 bg-[#43454E] dark:bg-slate-900 p-2 pt-6">
            { furnitures[0] !== undefined ?
              furnitures.map((furniture) => (

                <div key={furniture.id} className="flex justify-around w-full max-w-xl items-center bg-white p-2 rounded-lg gap-2">
                  
                  <Link className="flex-1 flex justify-center items-center" to={`/selected/${furniture.id}`}>
                    <div >
                      <img className=" h-36 w-auto rounded-lg" src={`https://furnitured-app8.onrender.com/api/furnitures/${furniture.picture}`} alt={furniture.name} />
                    </div>
                  </Link>

                  <div className="flex-2 w-1/2 pl-2 dark:bg-slate-950 dark:text-[#DEDDE7] rounded-lg pb-1">
                    <Link className="" to={`/selected/${furniture.id}`}>
                      <h1 className=" text-2xl font-semibold" >{furniture.name}</h1>
                    </Link>
                    <p className="text-2xl">{furniture.price} $</p>
                    <h2 className=" decoration-black underline dark:decoration-[#DEDDE7]" >DESCRIPTION:</h2>

                    <p className='pl-1 text-sm'>- {furniture.material.join(", ")}</p>
                    <p className='pl-1 text-sm'>- {furniture.height} x {furniture.width} x {furniture.depth}</p>
                    <p className='pl-1 text-sm'>- {furniture.color.join(", ")}</p>
                  </div>

                </div>
              ))
            : <NoServer/> }  
          </div>
        )
      }
    </div>
  )
}

export default AllStuff