
import { useState} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-scroll";

export default function Menubar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { title: "Home", path: "home" },
    { title: "Works", path: "works" },
    { title: "About Me", path: "aboutme" },
    { title: "Skills", path: "skills" },
    { title: "Contact", path: "contact" },
  ];

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-5 left-5 z-50 secoundary-bg p-[15px] rounded-full "
      >
        <svg width="24" height="24"  fill="none" stroke="black" strokeWidth="1">
          {isOpen ? (
            <>
              <line x1="4" y1="4" x2="20" y2="20" />
              <line x1="4" y1="20" x2="20" y2="4" />
            </>
          ) : (
            <>
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </>
          )}
        </svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 w-[300px] h-screen  z-40 shadow-md p-6 secoundary-bg"
          >
            <ul className="space-y-6 mt-16">
              {navLinks.map((item, index) => (
                <motion.li
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="hover:underline"
                >
                  <Link
                    to={item.path}
                    smooth={true}
                    duration={500}
                    className="text-sm  text-black ml-[15px]  cursor-pointer"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.title}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}