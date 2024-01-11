import { useState } from 'react';
//TYPES
import { Checkbox, Email } from './T';

const Newsletter = () => {

  const [nameValue, setNameValue] = useState("")
  const [emailValue, setEmailValue] = useState<Email>("")

  const [checkboxes, setCheckboxes] = useState<Checkbox[]>([
    { name: "tables", isClicked: false },
    { name: "chairs", isClicked: false },
    { name: "cabinets", isClicked: false },
    { name: "lamps", isClicked: false },
    { name: "carpets", isClicked: false },
    { name: "frames", isClicked: false },
  ])

  const handleCheckboxChange = (name:string) => {
    setCheckboxes((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) =>
        checkbox.name === name
          ? { ...checkbox, isClicked: !checkbox.isClicked }
        : checkbox
      )
    )
  }

  return (
    <div className='flex flex-col items-center justify-center text-xl pb-4 dark:bg-[#DEDDE7]'>
     
      <div className='text-lg pr-24 pt-10'>
        <p className='italic font-bold text-xl'>Do not worry,</p>
        <p>if you could not find</p>
        <p className='italic font-bold text-xl'>the right one!</p>
        <p>Get a message any time</p>
        <p className='pb-2'>a new item <span className=' decoration-black decoration-solid underline text-xl'>arrives</span>:</p>
      </div>

      <div className='bg-[#43454E] p-2 pr-6 pl-6 rounded flex flex-col gap-3 pb-4 dark:bg-gray-900'>
        <div className='flex flex-col gap-2 pt-3'>
          <input type="text" placeholder="your lovely name" className=' border-2 border-black rounded p-1' value={nameValue} onChange={((e) => setNameValue(e.target.value))}/>
          <input type="text" placeholder="your email address" className=' border-2 border-black rounded p-1' value={emailValue} onChange={((e) => setEmailValue(e.target.value))}/>
        </div>
        <p className='pt-6 pb-2 text-[#DEDDE7] text-lg'>you wish to get news of ...</p>

        <div className='flex flex-col gap-1'>
          {checkboxes.map((check) => (
            <div className='flex justify-between text-[#DEDDE7]'>
              <input type="checkbox" checked={check.isClicked} className="checkbox" onChange={() => handleCheckboxChange(check.name)}/>
              <label htmlFor="checkbox">{check.name}</label>
            </div>
          ))}
          
        </div>
        <div className='flex justify-center pt-2'>
          <button className=' p-1 bg-slate-300 w-16 rounded-md text-base font-semibold'>SEND</button>
        </div>
      </div>
      
    </div> 
  )
}

export default Newsletter