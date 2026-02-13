import Large_works from '../components/ui/Works/Large_works';
import Medium_screenWorks from '../components/ui/Works/Works_small';

const Works_Page=()=>{
    return (
        <div id='works' className=' w-full text-black p-4 mt-6 md:px-[30px]'>
          <h2 className=' text-2xl font-semibold  mb-2 max-md:text-xl'>
            RECENT WORKS</h2>
            <p className='fade-text  mb-4'> 
                Every line of code tells a story—
                here’s what I’ve crafted so far.</p>
            <Medium_screenWorks/>
            <Large_works/>
        </div>
    )
}

export default Works_Page;