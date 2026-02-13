import { useNavigate } from "react-router-dom";


const Project_card=({children,statekey})=>{
    const navigate=useNavigate();
return(
    <div onClick={()=>{
        navigate(`/project/${statekey}`) 
        window.scrollTo(0,0)
    }}  className='w-[100%] md:flex-1  h-[450px] flex justify-center items-center secoundary-bg rounded-md p-2 relative pb-4'>
        {children}
    </div>
)
}
export default Project_card;