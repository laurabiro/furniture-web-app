import { useState, useEffect} from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Furniture, Amount } from './T';
import { loadFilteredFurnitures, loadFurnitures} from "./GetFurnitures";
import Loading  from "./Loading";
import NoServer from './NoServer';
import { useSelectedFurniture } from './SelectedFurnitureContext';


const SelectedFurniture = () => {

    const { addSelectedFurniture, orderSelectedFurniture } = useSelectedFurniture()

    const [ isLoading, setIsLoading ] = useState(true)
    const [ furniture, setFurniture ] = useState<Furniture | null>(null)
    const [ inputAmountValue, setInputAmountValue ] = useState<Amount>(1)
    
    const { id } = useParams()
    const [ length, setLength ] = useState<number | null>(null)
    
    const navigate = useNavigate()

    useEffect(() => {
        const load = async () => {
          const result = await loadFilteredFurnitures(id)
          if(result.success){
            const data = result.data[0]

            setFurniture(data)
            addSelectedFurniture(data)
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

    const handleSelectFurniture = (furniture:Furniture) => {
        addSelectedFurniture(furniture);
        console.log(furniture)
    }

    const handleAddToBasket = (furniture:Furniture) => {
        orderSelectedFurniture(furniture)
    }
 
  return (
    <div className="flex justify-center">

        { isLoading ? ( 
            <Loading />
            ) : (
            <div className='flex flex-wrap gap-8 justify-center w-11/12 bg-[#43454E] pt-6 pb-2'>

                {  furniture ?
                    
                    <div className='furni-cont flex flex-col gap-4 w-full'>
                        <div className=' bg-white rounded-xl flex flex-col justify-center p-4 pt-0 border-black border-solid border-2'>
                            <h1 className=' text-4xl text-center p-4 pt-0'>{furniture.name}</h1>
                            <div className='flex justify-center items-center'>
                                <img className='h-60 w-auto p-2' src={furniture.picture} alt={furniture.name} />
                            </div>
                        </div>
                        <div className='text-[#DEDDE7] p-4'>
                            <h2 className='text-2xl pb-2 underline'>DESCRIPTION:</h2>
                            <p>-material: {furniture.material.join(", ")}</p>
                            <p>-size: {furniture.height} x {furniture.width} x {furniture.depth}</p>
                            <p>-color: {furniture.color.join(", ")}</p>
                        </div>
                        <div className='text-[#DEDDE7] p-4'>
                            <h2 className='text-2xl pb-2 underline'>MORE ABOUT:</h2>
                            <p>{furniture.description}</p>
                        </div>
                        <div className='text-[#DEDDE7] p-4 flex justify-between'>
                            <div className='text-4xl'>{ inputAmountValue && inputAmountValue > 0 ? furniture.price * inputAmountValue : furniture.price} $</div>
                            <input className='rounded-2xl text-center w-28 text-black' type="number" placeholder="1" value={inputAmountValue} min="1"  onChange={((e) => setInputAmountValue(+e.target.value))} />
                        </div>
                        <p className='pl-4 text-[#DEDDE7]'>Add to:</p>
                        <div className=' flex justify-around p-2 pt-0 gap-4'>
                            <Link to="/basket"><button onClick={() => handleAddToBasket(furniture)} className='p-4 bg-[#DEDDE7] rounded-xl flex-1 font-semibold '>BASKET</button></Link>
                            <Link to="/livingroom"><button className='p-4 bg-[#DEDDE7] rounded-xl flex-1 font-semibold'>LIVINGROOM</button></Link>
                        </div>
                        <div className='flex justify-between p-4 pt-8 items-center'>
                            <Link to="/all" onClick={() => handleSelectFurniture(furniture)}><div className='rounded-full bg-white p-10 border-black border-solid border-2'>back</div></Link>
                            <div className={`text-2xl p-2 ${furniture.id === 1 ? "text-[#43454E]" : "text-[#DEDDE7]"} `} onClick={ handlePrevious }>previous</div>
                            <div className={`text-2xl p-2 ${furniture.id === length ? "text-[#43454E]" : "text-[#DEDDE7]"}`} onClick={ handleNext }>next</div>
                        </div>

                    </div>
                    
                : <NoServer/> }

            </div>
        )}
    </div>
  )
}

export default SelectedFurniture