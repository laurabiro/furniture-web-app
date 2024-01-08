import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { loadFurnitures } from "./GetFurnitures";
import Loading from "./Loading";
import { useParams } from "react-router-dom";
import { Furniture } from "./T";
import FilterForTypes from "./FilterForTypes";
import { Option } from "./T";
import NoServer from "./NoServer";

const FurnitureTypes = () => {

  const options: Option[] = [
    { opt: "price from low to high", type: "price", order:"asc" },
    { opt: "price from high to low", type: "price", order:"desc"  },
    { opt: "size from small to big", type: "size", order:"asc"   },
    { opt: "size from big to small", type: "size", order:"desc"   },
    { opt: "color from light to dark", type: "color", order:"asc"   },
    { opt: "color from dark to light", type: "color", order:"desc"   },
  ]

  const { type } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [furnitures, setFurnitures] = useState<Furniture[]>([])

  const [sortOrder, setSortOrder] = useState<string>(options[0].opt)

  useEffect(() => {
    const load = async () => {
      const result = await loadFurnitures(type)
      if (result.success) {
        const filteredData = result.data.filter((furniture) => {
          console.log(type)
          return furniture.type === type
        })
        setFurnitures(filteredData)
      }
      setIsLoading(false)
    }
    load()
  }, [type])

  const sortedFurnitures = [...furnitures]

  options.forEach((option) => {
    if (option.opt === sortOrder) {
      if (option.order === "asc") {
        if (option.type === "price") {
          sortedFurnitures.sort((a, b) => a.price - b.price);
        } else if (option.type === "size") {
          sortedFurnitures.sort((a, b) => {
            const sizeA = a.height * a.width * a.depth
            const sizeB = b.height * b.width * b.depth
            return sizeA - sizeB
          })
        } else if (option.type === "color") {
          sortedFurnitures.sort((a, b) => b.luminosity - a.luminosity);
        }
      } else {
        if (option.type === "price") {
          sortedFurnitures.sort((a, b) => b.price - a.price);
        } else if (option.type === "size") {
          sortedFurnitures.sort((a, b) => {
            const sizeA = a.height * a.width * a.depth
            const sizeB = b.height * b.width * b.depth
            return sizeB - sizeA
          });
        } else if (option.type === "color") {
          sortedFurnitures.sort((a, b) => a.luminosity - b.luminosity);
        }
      }
    }
  })

  const handleFilterChange = (selectedOption: string) => {
    setSortOrder(selectedOption)
  } 

  return (
    <div className=" pl-4 pr-4 flex justify-center">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col w-11/12 bg-[#43454E] p-2 pt-6 h-screen">
          <div className=" flex justify-center p-10 ">
            <FilterForTypes onFilterChange={ handleFilterChange } options={ options } />
          </div>
          <div className="cardsoftypes flex flex-wrap gap-8 justify-center p-8">
          
          { furnitures[0] !== undefined ?
          sortedFurnitures.map((furniture) => (
            <div
              key={furniture.id}
              className="flex justify-around w-80 max-w-xl items-center bg-white p-2 rounded-lg gap-2"
            >

              <Link to={`/selected/${furniture.id}`}>
                <div className="flex-1 flex justify-center items-center">
                  <img
                    className=" h-36 w-auto"
                    src={furniture.picture}
                    alt={furniture.name}
                  />
                </div>
              </Link>

              <div className="flex-2 w-1/2 pl-2">
                <h1 className=" text-2xl font-semibold">{furniture.name}</h1>
                <p className="text-2xl">{furniture.price} $</p>
                <h2 className=" decoration-black underline">DESCRIPTION:</h2>

                <p className="pl-1 text-sm">
                  - {furniture.material.join(", ")}
                </p>
                <p className="pl-1 text-sm">
                  - {furniture.height} x {furniture.width} x {furniture.depth}
                </p>
                <p className="pl-1 text-sm">- {furniture.color.join(", ")}</p>
              </div>
              

            </div>
            
          )) : <NoServer/> }

          <div className="flex justify-between w-full p-6 items-center">
            <Link to="/">
              <div className="bg-white w-20 h-20 rounded-full flex justify-center items-center">back</div>
            </Link>

            <Link to="/all">
              <div className=" allsuff text-[#DEDDE7] text-2xl text-center">
                AllStuff
              </div>
            </Link>
          </div>
        </div>
        </div>
      )}
    </div>
  )
}

export default FurnitureTypes
