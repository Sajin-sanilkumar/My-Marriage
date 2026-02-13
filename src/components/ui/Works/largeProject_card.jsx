import { Link } from 'react-scroll';
import { useState } from "react"
import { MoveRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const LargeProject_card=({statekey,title,year,desc,setHover,current_state})=>{
    const[isHovered,setIsHovered]=useState(false)
    const isblur=(current_state!=="P0" && current_state!==statekey);
    const navigate = useNavigate();
    return (
        <div id={statekey} onClick={()=>{navigate(`/project/${statekey}`)}} className={`w-full  secoundary-bg   rounded-sm  p-4  hover:scale-105 transition-transform duration-300 project cursor-pointer shadow-md ${ isblur?'blur-sm ':'blur-none'}`}
        onMouseEnter={()=>{setHover(statekey); setIsHovered(true)}} 
        onMouseLeave={()=>{setHover("P0");setIsHovered(false)}}>
                            <div className="flex justify-between items-center "> 
                                 <p className="pr-3">{title}</p>
                                {!isHovered?<hr className="fade-bg flex-1 "/>:null}
                                {isHovered?<MoveRight size={27} />:<p className="pl-3">{year}</p> }
                            </div>
                         <p className="fade-text text-sm mt-2 ">{desc}</p>
        </div>     
    )
}

export default LargeProject_card;