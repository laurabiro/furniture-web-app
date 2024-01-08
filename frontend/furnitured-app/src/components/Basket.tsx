import { useSelectedFurniture } from './SelectedFurnitureContext';
import { Link } from 'react-router-dom';

const Basket = () => {

  const { orderFurniture, deleteItem, calculatePrice, amounts, updateAmount, total } = useSelectedFurniture()
 
  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-2 w-11/12 bg-[#DEDDE7] dark:bg-gray-900 pt-6 p-2">
        <h1 className="text-center dark:text-slate-50">CHECKOUT</h1>

        { orderFurniture.map((item) => (
          <div key={item.id} className='flex flex-col items-stretch '>

            <div className='flex justify-between gap4 '>

              <div className='flex '>
                
                <div className="flex w-36 bg-white rounded-lg border-2 border-black border-solid">
                  <p className='p-1'><Link to={`/selected/${item.id}`}>{item.name}</Link></p>
                </div>

                <div className='flex w-24 items-center justify-center'>
                  <input className="w-12 rounded-xl placeholder:text-center text-center border-2 border-black border-solid" type="number" name={item.name} placeholder="1" min={1} value={amounts[item.id] || ""} onChange={(e) => updateAmount(item.id, parseInt(e.target.value))}/>
                </div>

              </div>
      
              <div className="flex flex-2 items-center gap-4  dark:text-slate-50">
                  <label htmlFor={item.name} className="pr-4"> {calculatePrice(item, amounts[item.id])} </label>
                  <button onClick={ () => deleteItem(item.id) }>x</button>
              </div>

            </div>

          </div>
        ))}

        <div className='flex justify-between p-4 pt-0 border-t-2 border-t-black border-solid  dark:text-slate-50'>
          <div className="">TOTAL</div>
          <div className="pr-6">{total + " $"}</div>
        </div>
          
        <h2 className="pl-4">delivery</h2>
        <div className="flex gap-4 pl-4">
          <input type="checkbox" />
          <div className=' dark:text-slate-50'>icon
            <i></i>
          </div>
          <div className="position-basket bg-white rounded-lg p-1 text-xs">we deliver</div>
        </div>
        <div className="flex gap-4 pl-4">
          <input type="checkbox" />
          <div className=" dark:text-slate-50">icon
            <i></i>
          </div>
          <div className="position-basket bg-white rounded-lg p-1 text-xs">you deliver</div>
        </div>
        <p className=" text-justify text-sm pl-8 pr-8 pt-2  dark:text-slate-50"> asdf afsg afa scipit ipsam ut dicta et modi commodi quidem magni provident, culpa unde quos, sit rerum libero?</p>
        
        <h2 className="pl-4">payment</h2>
        <div className="flex gap-4 pl-4">
          <input type="checkbox" />
          <div className=' dark:text-slate-50'>icon
            <i></i>
          </div>
          <div className="position-basket bg-white rounded-lg p-1 text-xs">card</div>
        </div>
        <div className="flex gap-4 pl-4">
          <input type="checkbox" />
          <div className=' dark:text-slate-50'>icon
            <i></i>
          </div>
          <div className="position-basket bg-white rounded-lg p-1 text-xs">cash</div>
        </div>
        <p className=" text-justify text-sm pl-8 pr-8 pt-2 pb-8  dark:text-slate-50"> asdf afsg afa scipit ipsam ut dicta et modi commodi quidem magni provident, culpa unde quos, sit rerum libero?</p>

        <div className="flex justify-center pb-4">
          <input className="rounded-lg w-40 placeholder:text-center text-center" type="text" placeholder="ZIP code"/>
        </div>
        <div className="flex justify-center gap-4 pb-4">
          <input className="rounded-lg w-40 placeholder:text-center text-center" type="text" placeholder="firstname"/>
          <input className="rounded-lg w-40 placeholder:text-center" type="text" placeholder="lastname"/>
        </div>
        <div className="flex justify-center pb-4">
          <input className="rounded-lg w-64 placeholder:text-center text-center" type="text" placeholder="address eg. Livingroom street 1"/>
        </div>
        <div className="flex justify-center pb-4 gap-4">
          <input className="rounded-lg w-14 placeholder:text-center text-center" type="text" placeholder="+44"/>
          <input className="rounded-lg w-50 placeholder:text-center text-center" type="text" placeholder="phone number"/>
        </div>
        <div className="flex justify-center pb-8">
          <input className="rounded-lg w-64 placeholder:text-center text-center" type="text" placeholder="email address"/>
        </div>
        <div className="flex gap-4 pl-4">
          <input type="checkbox" />
          <div className=" dark:text-slate-50">billing address is same as delivery address</div>
        </div>
        <div className="flex gap-4 pl-4">
          <input type="checkbox" />
          <div className=" dark:text-slate-50">my details are correct and real</div>
        </div>
        <div className="flex gap-4 pl-4 pb-8">
          <input type="checkbox" />
          <div className=" dark:text-slate-50">agree to terms and conditions</div>
        </div>
        <div className="flex justify-center pb-4">
          <button className="bg-white border-3 border-black border-solid rounded-xl w-1/2 text-4xl p-2">CONFIRM</button>
        </div>
      </div>
      
    </div>
  )
}

export default Basket