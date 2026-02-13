
import {  SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import OpenAi from "../../../assets/openAi.png"
import OpenAi1 from "../../../assets/OpenAi1.png"
import OpenAi2 from "../../../assets/openAi3.png"
import OpenAi3 from "../../../assets/openAi4.png"
import ImageSlider from '../General/Image_Slider';
export default function Project2_ImageSlider() {
  const Image_stack=[OpenAi,OpenAi1,OpenAi2,OpenAi3]
  return (
      <ImageSlider>
          {
            Image_stack.map((source,index)=>{
               return(
                   <SwiperSlide key={index} className='w-full p-4 h-full  !flex !justify-center !items-center gap-x-6'>
                       <img src={source} className='rounded-lg shadow-md' alt="project-screen shots"/>
                   </SwiperSlide>
           )
           })}
      </ImageSlider>
  );
}
