import { ArrowUpNarrowWideIcon, MailPlus } from "lucide-react";
import * as motion from "motion/react-client"
import { Link } from 'react-scroll';
const  Navbar=()=>{
    const nav_data=[{title:"Works",path:"works"},{title:"About me",path:"aboutme"},{title:"Skills",path:"skills"},{title:"Contact",path:"contact"}]
    return (
       <nav className="w-full h-[75px] flex px-[30px] ">
        <div className="text-black text-sm w-[50%] flex justify-start items-center max-md:justify-end max-md:w-full  max-sm:hidden">
            <MailPlus className=' h-[27px] ' size={20}/>
            <a className="ml-1 font-medium hover:underline" href="#">manoj90800.dev@gmail.com</a>
        </div>
        <div className="text-black text-sm font-medium w-[50%] max-md:hidden">
            <ul className="h-full flex justify-end items-center ">
                {nav_data.map((data,index)=>{
                    return <li className="ml-[30px] lg:px-4 cursor-pointer hover:underline" key={index}>
                        <Link  to={data.path} smooth={true} >
                        {data.title}
                        </Link>
                    </li>
                })}
            </ul>
        </div>
        <div>
        </div>
        <Link  to="home" >
        <motion.div  className="outline-black outline-[2px]  
            hidden p-2 rounded-lg   right-[50px] bottom-[100px] fixed md:block z-40 "
        animate={{
                    y: [0, -15, 0],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                }}
        >
            <ArrowUpNarrowWideIcon size={20} className="text-black"/>
        </motion.div>
         </Link>
       </nav> 
    )
}
export default Navbar;