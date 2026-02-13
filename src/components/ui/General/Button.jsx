

export const Custom_Button=({content})=>{
    return  (
    <button  
     className='w-full max-w-[140px] h-[45px] 
                mt-[40px] bg-black
                rounded-md text-white font-normal
                text-sm
                 hover:scale-105 transition-transform duration-300 shadow-lg'>
        {content}
        </button>)
}