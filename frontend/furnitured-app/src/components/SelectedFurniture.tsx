import { useState, useEffect} from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Furniture } from './T';
import { loadFilteredFurnitures, loadFurnitures} from "./GetFurnitures";
import Loading  from "./Loading";
import NoServer from './NoServer';
import { useSelectedFurniture } from './SelectedFurnitureContext';


const SelectedFurniture = () => {

    const { addSelectedFurniture, orderSelectedFurniture, message } = useSelectedFurniture()

    const [ isLoading, setIsLoading ] = useState(true)
    const [ furniture, setFurniture ] = useState<Furniture | null>(null)
    
    const { id } = useParams()
    const [ length, setLength ] = useState<number | null>(null)
/* 
    const [message, setMessage] = useState<string | null>(null) */
    
    const navigate = useNavigate()

    useEffect(() => {
        const load = async () => {
          const result = await loadFilteredFurnitures(id)
          if(result.success){
            const data = result.data[0]

            setFurniture(data)
            await getLength()
          }
          setIsLoading(false)
  
        }
        load()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    const getLength = async () => {
        const result = await loadFurnitures()
        if(result.success){
            const ids = result.data.length
            setLength(ids)
            return ids
        } 
    }

    const handleNext = async () => {
        const result = await getLength()
        if(result){
            navigate(`/selected/${id ? ( +id < result ? +id+1 : result ) : null}`)
        }
    }
    
    const handlePrevious = () => {
        navigate(`/selected/${id ? ( +id > 1 ? +id-1 : 1) : null}`)
    }

    const handleAddToBasket = (furniture:Furniture) => {
        orderSelectedFurniture(furniture)
    }

    const handleAddToLivingroom = (furniture:Furniture) => {
        addSelectedFurniture(furniture)
    }
 
  return (
    <div className="flex justify-center">

        { isLoading ? ( 
            <Loading />
            ) : (
            <div className='flex flex-wrap gap-8 justify-center w-11/12 bg-[#43454E] pt-6 pb-2  dark:bg-gray-900'>

                {  furniture ?
                    
                    <div className='furni-cont flex flex-col gap-4 w-full'>
                        <div className=' bg-white rounded-xl flex flex-col justify-center p-4 pt-0 border-black border-solid border-2'>
                            <h1 className=' text-4xl text-center p-4 pt-0'>{furniture.name}</h1>
                            <div className='flex justify-center items-center'>
                                <img className='h-60 w-auto p-2' src={furniture.picture} alt={furniture.name} />
                            </div>
                        </div>
                        <div className='cont-for-details'>
                            <div className='text-[#DEDDE7] p-4'>
                                <h2 className='text-2xl pb-2 underline'>DESCRIPTION:</h2>
                                <p>-material: {furniture.material.join(", ")}</p>
                                <p>-size: {furniture.height} x {furniture.width} x {furniture.depth}</p>
                                <p>-color: {furniture.color.join(", ")}</p>
                            </div>
                            <div className='text-[#DEDDE7] p-4 pb-0'>
                                <h2 className='text-2xl pb-2 underline'>MORE ABOUT:</h2>
                                <p>{furniture.description}</p>
                            </div>
                        </div>
                        <div className='basket-livingroom'>
                            <div className='text-[#DEDDE7] pl-4 pt-2 flex'><span className={`${furniture.availability === false ? "text-red-600" :"text-lime-600"}`}>{furniture.availability === false ? "not available " : "avaliable " }</span>at the moment</div>
                            <div className='text-[#DEDDE7] p-4 flex'>
                                <div className='text-4xl'>{ furniture.price } $</div>
                            </div>
                            
                            <p className='addto pl-4 text-[#DEDDE7]'>Add to:</p>
                            <div className=' flex justify-center p-2 pt-0 gap-8'>
                                <button onClick={() => handleAddToBasket(furniture)} className='p-6 bg-[#DEDDE7] rounded-xl font-semibold'>BASKET</button>
                                <div className="flex justify-center items-center text-white w-60">{message}</div>
                                <Link className="pr-2" to="/livingroom"><button className='p-6 bg-[#DEDDE7] rounded-xl font-semibold' onClick={() => handleAddToLivingroom(furniture)}>LIVINGROOM</button></Link>   
                            </div>
                        </div>
                        <div className='flex justify-between p-2 pt-4 items-center'>
                            <Link to="/all"><div className='back-but rounded-full bg-white p-4 leading-loose border-black border-solid border-2'>back</div></Link>
                            <div className={`text-2xl p-2 ${furniture.id === 1 ? "text-[#43454E] dark:text-gray-900" : "text-[#DEDDE7]"} cursor-pointer`} onClick={ handlePrevious }>previous</div>
                            <div className={`text-2xl p-2 ${furniture.id === length ? "text-[#43454E] dark:text-gray-900 " : "text-[#DEDDE7] "} cursor-pointer`} onClick={ handleNext }>next</div>
                        </div>

                    </div>
                    
                : <NoServer/> }

            </div>
        )}
    </div>
  )
}

export default SelectedFurniture