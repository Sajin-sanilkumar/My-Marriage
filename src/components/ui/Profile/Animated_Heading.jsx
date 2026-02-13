import { useEffect, useRef } from "react"
import { animate, stagger } from "motion"
import { splitText } from "motion-plus"

const AnimatedHeading = () => {
  const nameRef = useRef(null)
  const greetingRef = useRef(null)

  useEffect(() => {
    document.fonts.ready.then(() => {
      if (!nameRef.current) return

      const { chars } = splitText(nameRef.current, { by: "chars" })
      const { words: greetWords } = splitText(greetingRef.current)
      chars.forEach((el) => {
        el.classList.add("fancy-text")
      })

      animate(
        greetWords,
        { opacity: [0, 1], y: [10, 0] },
        {
            type: "spring",
            duration: 2,
            bounce: 0,
            delay: stagger(0.07),
        }
        )
      animate(
        chars,
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
    <div className="text-center mt-2 flex items-center">
      <p ref={greetingRef}  className="text-lg text-gray-700">hey, i'm</p>
      <span ref={nameRef} className="text-2xl text-black ml-1">
        Manoj
      </span>
    </div>
  )
}

export default AnimatedHeading