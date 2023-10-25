import { LivingroomFurniture } from "./T"

const Livingroom = () => {

    const livingroom:LivingroomFurniture[] = [{isPicked: false, type: "tables", content: "table.png"},
        {isPicked: false, type: "chairs", content: ""},
        {isPicked: false, type: "cabinets", content: ""},
        {isPicked: false, type: "lamps", content: ""},
        {isPicked: false, type: "carpets", content: ""},
        {isPicked: false, type: "frames", content: ""},
    ]
    
  return (
    <>
        {
            livingroom.map((item) => (
                item.isPicked ? <img className={item.type} src={item.content} /> : null
            ))
        }
    </>
  )
}

export default Livingroom