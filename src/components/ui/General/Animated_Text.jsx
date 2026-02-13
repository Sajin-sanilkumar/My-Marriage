import { useEffect, useRef } from "react"
import { animate, stagger } from "motion"
import { splitText } from "motion-plus"

const animatedText = ({children}) => {
  const containerRef = useRef(null)

  useEffect(() => {
    document.fonts.ready.then(() => {
      const container = containerRef.current
      if (!container) return

      container.style.visibility = "visible"

      const { words } = splitText(container.querySelector(".anime-child"))

      animate(
        words,
        { opacity: [0, 1], y: [10, 0] },
        {
          type: "spring",
         duration: 2,
          bounce: 0,
          delay: stagger(0.07),
        }
      )
    })
  }, [])

  return (
    <div className=" " ref={containerRef}>
      {children}
    </div>
  )
}

export default animatedText;