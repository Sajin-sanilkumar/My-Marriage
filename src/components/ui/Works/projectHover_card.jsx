import * as motion from "motion/react-client"


const ProjectHover_card=({children})=>{
    return (
        <motion.div
                     initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{
                           type: "spring",
                           duration: 0.4,
                           bounce: 0,
                           delay:(0.3), 
                       }}
               >
                   {children}
                </motion.div>
    )
}

export default ProjectHover_card;