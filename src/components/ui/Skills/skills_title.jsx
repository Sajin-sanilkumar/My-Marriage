
import * as motion from "motion/react-client"
import c_icon from '../../../assets/c.svg'
import java_icon from '../../../assets/java.svg'
import js_icon from '../../../assets/javascript.svg'
import react_icon from '../../../assets/react.svg'
import nodejs_icon from '../../../assets/nodejs.svg'
import tailwind_icon from '../../../assets/tailwind.svg'
import mysql_icon from '../../../assets/mysql.svg'
import flutter_icon from '../../../assets/flutter.svg'






const Skills_tile=()=>{
    const icon_path=[c_icon,java_icon,js_icon,react_icon,nodejs_icon,flutter_icon,tailwind_icon,mysql_icon]
return(
    <div className='w-full h-full flex  flex-wrap  '>
         {icon_path.map((path,index)=>{
            return  <motion.div
                 animate={{
                    y: [0, -5, 0],
                    rotate: [-3, 3, -3], 
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                }}
                key={index}
            >   
            <img className="max-sm:h-[60px] h-[70px] mt-6 ml-2 mr-2" src={path} alt="icon"/>
            </motion.div>
         })}
    </div>
)
}
export default Skills_tile; 
