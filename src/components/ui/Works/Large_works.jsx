import { useState } from "react";
import LargeProject_card from "./largeProject_card";
import HoverRendering from "./HoverRendering";
import GetTime from "../../../utils/GetTime";
import GetDate from "../../../utils/GetDate";

const Large_works=()=>{
    const[hoverstate,setHoverstate]=useState("P0");
    return (
            <div className='w-full h-[600px] flex gap-4  hidden lg:flex relative'>
                <div className='flex-1 secoundary-bg rounded-md p-4 flex flex-col'>
                        <div className='w-full h-auto flex justify-between mb-2 fade-text'>
                            <GetDate/>
                            <GetTime/>
                        </div>
                        <div className='w-full  flex-1  flex justify-center items-center'>
                             <div className="w-full h-full flex justify-center items-center ">
                                <HoverRendering HoverState={hoverstate}/>
                             </div>
                        </div>
                </div>
                <div  className='w-[40%] h-[full]  flex flex-col gap-y-4 '>
                    <LargeProject_card  statekey={"P1"} title={"Open Analytics"} year={"2025"} desc={"Developed Web Application to Analyze Website Users and sessions"} setHover={setHoverstate} current_state={hoverstate}/>
                    <LargeProject_card  statekey={"P2"} title={"FarmBuy"} year={"2024"} desc={"Developed Mobile Application to connect  Farmers and Users"} setHover={setHoverstate} current_state={hoverstate}/>
                </div>
            </div>
    )
}

export default Large_works;