
const Basket = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-2 w-11/12 bg-[#DEDDE7] pt-6 p-2">
        <h1 className="text-center">CHECKOUT</h1>
        <div className='flex justify-between gap-8 border-b-2 border-b-black border-solid p-4'>
          <div className="flex gap-4">
            <div>name</div>
            <input className="w-20 rounded-xl placeholder:text-center text-center" type="number" placeholder="1"/>
          </div>
          <div className="flex">
            <div className="pr-4">price</div>
            <button>x</button>
          </div>
        </div>
        <div className='flex justify-between p-4 pt-0'>
          <div className="">TOTAL</div>
          <div className="pr-6">price</div>
        </div>
        <h2 className="pl-4">delivery</h2>
        <div className="flex gap-4 pl-4">
          <input type="checkbox" />
          <div>icon
            <i></i>
          </div>
          <div className="bg-white rounded-lg p-1 text-xs">we deliver</div>
        </div>
        <div className="flex gap-4 pl-4">
          <input type="checkbox" />
          <div>icon
            <i></i>
          </div>
          <div className="bg-white rounded-lg p-1 text-xs">you deliver</div>
        </div>
        <p className=" text-justify text-sm pl-8 pr-8 pt-2"> asdf afsg afa scipit ipsam ut dicta et modi commodi quidem magni provident, culpa unde quos, sit rerum libero?</p>
        
        <h2 className="pl-4">payment</h2>
        <div className="flex gap-4 pl-4">
          <input type="checkbox" />
          <div>icon
            <i></i>
          </div>
          <div className="bg-white rounded-lg p-1 text-xs">card</div>
        </div>
        <div className="flex gap-4 pl-4">
          <input type="checkbox" />
          <div>icon
            <i></i>
          </div>
          <div className="bg-white rounded-lg p-1 text-xs">cash</div>
        </div>
        <p className=" text-justify text-sm pl-8 pr-8 pt-2 pb-8"> asdf afsg afa scipit ipsam ut dicta et modi commodi quidem magni provident, culpa unde quos, sit rerum libero?</p>

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
          <div className="">billing address is same as delivery address</div>
        </div>
        <div className="flex gap-4 pl-4">
          <input type="checkbox" />
          <div className="">my details are correct and real</div>
        </div>
        <div className="flex gap-4 pl-4 pb-8">
          <input type="checkbox" />
          <div className="">agree to terms and conditions</div>
        </div>
        <div className="flex justify-center pb-4">
          <button className="bg-white border-3 border-black border-solid rounded-xl w-1/2 text-4xl p-2">CONFIRM</button>
        </div>
      </div>
      

    </div>
  )
}

export default Basket