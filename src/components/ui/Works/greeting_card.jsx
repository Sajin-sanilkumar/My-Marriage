import * as motion from "motion/react-client"


const Greeting_card=()=>{
    return(
      <motion.div
                whileHover={{
                    rotate:[-15,15,-15]
                }}
                transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                }}
      >
        
             <p className="text-[65px] text-center cursor-pointer">&#128075;</p>
     </motion.div>   
                               
    )
}

export default Greeting_card;
