
import {  SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Agromart from "../../../assets/agromart.png"
import Agromart1 from "../../../assets/Agromart1.png"
import Agromart2 from "../../../assets/agromart2.png"
import Agromart3 from "../../../assets/Agromart3.png"
import Agromart4 from "../../../assets/Agromart4.png"
import Agromart5 from "../../../assets/Agromart5.png"
import Agromart6 from "../../../assets/Agromart6.png"

import ImageSlider from '../General/Image_Slider';
export default function Project1_ImageSlider() {
  const Image_stack=[Agromart1,Agromart2,Agromart3,Agromart,Agromart4,Agromart5,Agromart6]
  return (
      <ImageSlider>
          {
            Image_stack.map((source,index)=>{
               return(
                   <SwiperSlide key={index} className='w-full p-4 h-full  !flex !justify-center !items-center gap-x-6'>
                       <img src={source} className='h-full rounded-lg shadow-md' alt="project-screen shots"/>
                   </SwiperSlide>
           )
           })}
      </ImageSlider>
  );
}
