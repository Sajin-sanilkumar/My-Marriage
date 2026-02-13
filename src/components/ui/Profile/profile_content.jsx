import { Github,Instagram,Linkedin,Code } from "lucide-react";
import AnimatedText from "../General/Animated_Text.jsx";
import Animated_component from "../General/Animated_Component.jsx";
import { Link } from 'react-scroll';


const Profile_content=()=>{
    return(
        <div className='h-auto  mt-6 flex flex-col items-center text-black font-bold  '>
            <AnimatedText>
              <h1 className='anime-child max-md:text-[30px] text-[45px]'>I DON’T COPY CODE,</h1>
            </AnimatedText>
          <AnimatedText>
            <h1 className='anime-child max-md:text-[30px] text-[45px]'>I CRAFT IT</h1>
          </AnimatedText>
          <Link to={"contact"} className="w-full" smooth="true">
          <Animated_component  >   
            <button  className='w-full max-w-[200px] h-[65px] mt-[40px] bg-black rounded-md text-white font-medium hover:scale-105 transition-transform duration-300 shadow-lg'>Contact me</button>
          </Animated_component>
          </Link>
          <Animated_component>
            <div className='mt-[20px] mb-[20px] flex items-center justify-center'>
            <a href='https://github.com/Manoj0012'>
              <Github size={25} className=" mr-4 hover:scale-110 transition-transform duration-300" />
            </a>
             <a href='https://www.linkedin.com/in/manoj90800dev'>
              <Linkedin className=" mr-4 hover:scale-110 transition-transform duration-300"/>
            </a>
             <a href='https://www.instagram.com/_an_oj?igsh=eWtnNGRyMXBnNDlx'>
              <Instagram  className="mr-4 hover:scale-110 transition-transform duration-300"/>
            </a>
             <a href='https://leetcode.com/u/Manoj_90800/'>
              <Code className="hover:scale-110 transition-transform duration-300" />
            </a>
          </div>
          </Animated_component>
        </div>
    )
}

export default Profile_content;