import { stagger } from "motion";
import * as motion from "motion/react-client"

function Animated_component({children}) {
    return (
        <motion.div
              initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    type: "spring",
                    duration: 1.7,
                    bounce: 0,
                    delay:(0.3), 
                }}
                className="w-full display flex justify-center"
        >
            {children}
         </motion.div>
    )
}

export default  Animated_component;