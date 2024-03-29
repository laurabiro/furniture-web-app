import { Allfaq } from "./T"
import { useState } from 'react';

const FAQs = () => {

  const [openIndex, setOpenIndex] = useState<number>(-1);

  const handleQandA = (index: number) => {
    // Toggle the state for the clicked FAQ item
    setOpenIndex((prevOpenIndex) => (prevOpenIndex === index ? -1 : index));
  };

  const allfaqs: Allfaq[] = [
    {
      q: "What is FAQ?",
      a: "a: FAQ is short for: frequently asked question. Here you will find some explanations about the page flow, menu items etc.. Feel free to contact us if any other question occurs than this ones. To do this, please press menu and choose the contact button. Fill out the form and hit send button."
    },
    {
      q: "Why menu is not the usual 3 lines but a drawer?",
      a: "a: The idea is to open a drawer that have labelled files in it. Really hope you like it!"
    },
    {
      q: "What is my livingroom in the menu?",
      a: "a: Select an item and press my livingroom button. Selected items will be placed to your livingroom for you to see if they match together. You can replace the selected item anytime with another one. One type at a time will be visible in the showroom. To see your livingroom, go to menu / my livingroom. Enjoy!",
    },
    {
      q: "How does my basket work?",
      a: "a: edf"
    },
    {
      q: "Why should I sign up for the newsletter?",
      a: "a: Newsletter is designed for your interest. The idea is to send you only the information what you are interested in, no less or no more. To sign up for the newletter you can choose newletter in the menu or find the pencil on the main page, bottom right."
    },
    {
      q: "How can i navigate back to the main page?",
      a: "a: Simply press on \" livingroom \" in  the header, top left."
    },
  ]

  return (
    <div className="p-4 pt-8 h-screen dark:bg-slate-900 dark:text-[#DEDDE7]">
      { allfaqs.map((faq, index) => (
        <div className=" border-b-2 border-b-black dark:border-b-slate-500 flex justify-center">
          <div key={index} className="flex flex-col cursor-pointer items-start w-11/12">
            <div className=' flex justify-start pb-2 font-semibold' onClick={() => handleQandA(index)}> <span className=" font-normal pr-2">{index +1}</span> {faq.q}</div>
            { openIndex === index && <div className=' pb-2 text-slate-800 dark:text-slate-500'>{faq.a}</div> }
          </div>
        </div> 
      ))}

    </div>
  )
}

export default FAQs