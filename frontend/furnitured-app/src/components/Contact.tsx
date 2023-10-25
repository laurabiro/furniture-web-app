import { useState } from "react";
import { Contact } from "./T";

const Contact = () => {

  const [nameValue, setNameValue] = useState("")
  const [emailValue, setEmailValue] = useState("")
  const [messageValue, setMessageValue] = useState("")

  const contacts:Contact[] = [{name: "William Lerning/Supervisor:", contact: "+42 666 28 28" },
    {name: "Amanda Dipesthol/Costumer Care:", contact: "+42 222 89 89" },
    {name: "Costumer service:", contact: "livingroom@living.room" },
  ]

  return (
    <div className="flex flex-col items-center gap-12 p-8">
      <div className="bg-[#43454E] flex flex-col gap-3 items-center p-4 w-11/12 rounded ">
        <div className="flex flex-col gap-1 p-2 rounded">
          <input type="text" className="border-2 border-black rounded placeholder:italic w-60 p-2" placeholder="Your lovely name" value={nameValue} onChange={((e) => setNameValue(e.target.value))} />
          <input type="text" className="border-2 border-black rounded p-2 placeholder:italic" placeholder="Your email adress" value={emailValue} onChange={((e) => setEmailValue(e.target.value))} />
        </div>
        <textarea rows={8} className="border-2 border-black rounded placeholder:italic w-60 p-2" placeholder="Your message..." value={messageValue} onChange={((e) => setMessageValue(e.target.value))} ></textarea>
        <button className="p-1 bg-slate-300 w-16 rounded-md text-base font-semibold">SEND</button>
      </div>
      <div>
        {
          contacts.map((contact) => (
            <p>{contact.name}<span className="font-semibold">{contact.contact}</span></p>
          ))
        }
      </div>
      <div className="flex justify-center w-full p-6 gap-3">
        <div className=" cursor-pointer flex-1 bg-white rounded-full p-3 flex justify-center border-[#43454E] border-2 border-solid shadow-sm shadow-[#43454E]">facebook</div>
        <div className="cursor-pointer flex-1 bg-white rounded-full p-3 flex justify-center border-[#43454E] border-2 border-solid shadow-sm shadow-[#43454E]">instagram</div>
        <div className="cursor-pointer flex-1 bg-white rounded-full p-3 flex justify-center  border-[#43454E] border-2 border-solid shadow-sm shadow-[#43454E]">pinterest</div>
      </div>
    </div>
  )
}

export default Contact