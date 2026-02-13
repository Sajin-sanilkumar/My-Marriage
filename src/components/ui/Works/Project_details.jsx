
import { ArrowLeft } from "lucide-react";
import { Custom_Button } from "../General/Button";
import { useNavigate } from "react-router-dom";
import Footer from "../../../pages/footer_page";

export const ProjectDetail=({children,title,sub_title,sub_title2,info,tech_stack,features_stack,code_link,preview_link,my_role,credits})=>{
    const navigate = useNavigate();
    return(
        <div>
        <div  className="w-full  md:px-[40px] md:py-4 p-4 ">
            <div className="w-full h-[50px] mb-4 relative text-center flex items-center justify-center">
                <ArrowLeft size={30} onClick={()=>navigate(-1)} className="p-1 outline text-black rounded-sm absolute lg:left-[17px]  left-0"/>
                        <h1 className="text-2xl font-semibold text-black  ">{title}</h1>
            </div>
            <div className="w-full    rounded-sm flex  flex-row-reverse mt-[10px] max-lg:flex-col">
                <div className="w-[50%] h-[400px]  max-lg:h-[350px] max-lg:w-full">
                    {children}
                </div>
                <div className="w-[50%] h-auto  max-lg:py-4 lg:px-4 max-lg:w-full ">
                    <h2 className="text-xl mb-2">{sub_title}</h2>
                    <p className="fade-text text-md max-md:text-sm mt-2">
                        {sub_title2}
                    </p>
                    <p className="fade-text text-md max-md:text-sm mt-2">
                    {info}
                    </p>
                    <h2 className="mt-4  text-xl max-lg:mt-6">Tech Stack</h2>
                    <ul className="list-disc pl-6 text-md max-md:text-sm">
                        {
                            tech_stack.map((data,index)=>{
                                return (
                                    <li key={index} className="fade-text mt-2">
                                        {data}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div>
                    
                </div>
            </div>
           {credits!==""? <div className="w-[60%] w-full max-md:w-full h-auto  max-md:text-sm  lg:px-4 mt-4">
                <h2 className="text-xl mt-2  mb-2">Credits</h2>
                <p className="fade-text inline mr-1">{credits}</p>
                <a href="https://oswinjerome.in/" className="text-sky-600">https://oswinjerome.in/</a>
            </div>:null}
            {my_role!==""?<div className="w-full h-auto  max-md:text-sm  lg:px-4 mt-4">
                        <h2 className="text-xl mt-2">My Role:</h2>
                         <ul className="list-disc pl-6 text-md max-md:text-sm">
                        {
                            my_role.map((data,index)=>{
                                return (
                                    <li key={index} className="fade-text mt-2">
                                        {data}
                                    </li>
                                )
                            })
                        }
                    </ul>
            </div>:null}
            <div className="w-full h-auto mt-6  max-md:text-sm  lg:px-4">
                        <h2 className="text-xl mt-2">Key Features:</h2>
                         <ul className="list-disc pl-6 text-md max-md:text-sm">
                        {
                            features_stack.map((data,index)=>{
                                return (
                                    <li key={index} className="fade-text mt-2">
                                        {data}
                                    </li>
                                )
                            })
                        }
                    </ul>
            </div>
            <div className="flex mb-6 lg:px-4  max-md:justify-center">
                        <a href={code_link} className="max-w-[150px] w-full" >
                        <Custom_Button content={"Code"} />
                        </a>
                        <a href={preview_link} className="max-w-[150px] w-full">
                        <Custom_Button content={"preview"} />
                        </a>
                        
            </div>
            
        </div>
        <Footer/>
        </div>
    )
}


