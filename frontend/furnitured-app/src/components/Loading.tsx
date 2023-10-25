import { useCallback, useEffect, useMemo, useState } from "react";
import { Advice } from "./T";

const Loading = () => {

  const advices:Advice[] = useMemo(() => [
    "Rooms Should Be Functional, Not Perfect.",
    "B & W Combo Is Never Old, But Needs Some Gold.",
    "A Nice Painting Can Make A Room Feel Bigger.",
    "Using Warm Colors In A Room Can Really Make You Feel Warmer.",
    "Be Brave And Pick The Colors That Make You Happy.",
    "Living rooms Should Be Not Large, But Roomy.",
    "If Every Furniture Is Special In The Room, Then None Of Them Are.",
  ], [])

  const getRandomAdvice = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * advices.length)
    return advices[randomIndex]
  }, [advices])
  
  const [randomAdvice, setRandomAdvice] = useState(getRandomAdvice())

  useEffect(() => {
    setRandomAdvice(getRandomAdvice())
  }, [getRandomAdvice])

  return (   
    <>
        <div className="loading-cont">
          <div className="sk-cube-grid pb-6">
            <div className="sk-cube sk-cube1"></div>
            <div className="sk-cube sk-cube2"></div>
            <div className="sk-cube sk-cube3"></div>
            <div className="sk-cube sk-cube4"></div>
            <div className="sk-cube sk-cube5"></div>
            <div className="sk-cube sk-cube6"></div>
            <div className="sk-cube sk-cube7"></div>
            <div className="sk-cube sk-cube8"></div>
            <div className="sk-cube sk-cube9"></div>
          </div>
          <div className=" text-center text-xl"><span className=' font-semibold pb-2 text-2xl'>DID YOU KNOW?</span> <br/> { randomAdvice }</div>
        </div>
    </>
  )
}

export default Loading