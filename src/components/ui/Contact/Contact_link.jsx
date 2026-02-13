
import { Code, Github, Instagram, Linkedin ,File} from "lucide-react";
import Link_component from "./link_component";
import Resume from "../../../assets/Manoj_resume.pdf"

const Contact_link=()=>{
    return(
            <div className="w-[50%] max-sm:w-full  max-md:mt-6 ">
                 <h2 className='text-2xl font-semibold  text-black max-lg:text-xl  mb-2'>Find me</h2>
                 <hr className="fade-text w-[70%]"/>
                    <div className="max-w-[70%] mt-8 max-md:mt-4 grid gap-4  max-lg:grid-cols-1 grid-cols-2 ">
                        <Link_component caption={"manoj@github.com"} link={"https://github.com/Manoj0012"}>
                        <Github size={40} className="p-2 outline-2 rounded-sm text-black"/>
                        </Link_component>

                         <a download="Manoj_resume.pdf" href={Resume} className="fade-text text-sm hover:underline mt-4 flex items-center gap-x-2">
                                <File size={40} className="p-2 outline-2 rounded-sm  text-black"/>
                                resume.cv
                         </a>
                        <Link_component caption={"manoj@linkedin.com"} link={"https://www.linkedin.com/in/manoj90800dev"}>
                        <Linkedin size={40} className="p-2 outline-2 rounded-sm  text-black"/>
                        </Link_component>
                        <Link_component caption={"manoj@leetcode.com"} link={"https://leetcode.com/u/Manoj_90800/"}>
                        <Code size={40} className="p-2 outline-2 rounded-sm text-black"/>
                        </Link_component>
                         <Link_component caption={"manoj@instagram.com"} link={"https://www.instagram.com/_an_oj?igsh=eWtnNGRyMXBnNDlx"}>
                        <Instagram size={40} className="p-2 outline-2 rounded-sm  text-black"/>
                        </Link_component>
                    </div>
            </div>
    )
}

export default Contact_link;