import Skills_tile from "../components/ui/Skills/skills_title.jsx"

const Skills_Page=()=>{
    return (
        <div id="skills" className='p-4 mt-6 md:px-[30px] '>
        <h2 className='text-2xl  text-black font-semibold max-md:text-xl'>SKILLS</h2> 
         <p className="fade-text mt-2">
          These skills define my craft,
          shaping ideas into real-world solutions.</p>
        <Skills_tile/>
      </div> 
    )
}

export default Skills_Page;