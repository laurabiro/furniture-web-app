import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";
import { EffectCards } from "swiper/modules";
//Types
import { Slide } from "./T";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import "/src/index.css";



const Menu =() => {
  
  const slides: Slide[] = [
    {
      title: "my livingroom",
      content:
        "Place selected items to your livingroom and see if they match. You can replace the selected item anytime with another one. To do this, pick something from the lists and click on the livingroom button, right next to the basket button. Enjoy!",
      isImage: false,
    },
    {
      title: "my basket",
      content:
        "Go to your basket anytime you want to see your order so far, you can also change quantity or delete items. Once you ready, just follow the instructions underneath your order list. Please make sure to check everything twice, and contact us, if any issue accures.",
      isImage: false,
    },
    { title: "table", content: "/table.png", isImage: true },
    { title: "chair", content: "/chair.png", isImage: true },
    { title: "cabinet", content: "/cabinet.png", isImage: true },
    { title: "lamp", content: "/lamp.png", isImage: true },
    { title: "carpet", content: "/carpet.png", isImage: true },
    { title: "frame", content: "/frame.png", isImage: true },
    {
      title: "newsletter",
      content:
        "Do not worry if you could not find the right item for your livingroom! We are always after new designs, so sign up to our newsletter, and come back later! We will make sure you get updated about anything you choose to be so. Contact us, if you need help!",
      isImage: false,
    },
    { title: "all stuff", content: "/livingroom.jpg", isImage: true },
    {
      title: "FAQs",
      content:
        "Check out the questions, you might find informations about things that you could not find, we hope you can get along this page very easily, but if you have any question other than these, feel free to drop us a message! \n (menu - contact)",
      isImage: false,  
    },
  ];

  const furnitures = ["table", "chair", "lamp", "cabinet", "carpet", "frame"]

  const matches = useMediaQuery("(max-width: 1000px)")

  return (
    <div className="flex justify-center pt-28 dark:bg-slate-900">
      {matches ? (
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
        >
          
          {slides.map((slide, index) => (
            
            <SwiperSlide>
              <div key={index} className="cont z-10">

                <p className="title">{furnitures.includes(slide.title) ? (slide.title + "s") : slide.title}</p>
                <Link className="link" to={furnitures.includes(slide.title) ? `/types/${slide.title}` : ''}>
                  {furnitures.includes(slide.title) ? <p>see more</p> : ""}
                </Link>
                <Link to={slide.title.split(" ")[0] === "all" ? `/all` : ''}>
                { slide.title === "all stuff" ? <p>see more</p> : "" }
                </Link>

                <div className="cards" >
                  {slide.isImage ? (
                    <img className='img' src={slide.content} alt="" />
                  ) : (
                    <p className="text">{slide.content}</p>
                  )}
                </div>

              </div>   
            </SwiperSlide>
            
          ))}
        </Swiper>
      ) : (
        <div className="menu-grid-box">
          
          {furnitures.map((furniture, index) => (
            <div key={index} className={furniture + "s"}>
              <Link className="link" to={`/types/${furniture}`}>
                <div>
                  <img className={furniture + "-menu"} src={furniture + ".png"}  alt={furniture} />
                </div>
              </Link>
            </div>
          ))}
          
        </div>
      )}
    </div>
  )
}

export default Menu
