import Profile_img from '../../../assets/profile.png'
import AnimatedHeading from './Animated_Heading.jsx'
import AnimatedText from '../General/Animated_Text.jsx'
import Animated_component from '../General/Animated_Component.jsx'
const profile=()=>{
return(
     <div className=' max-md:full h-auto flex flex-col items-center   '>
          <Animated_component >
               <img className='max-sm:h-[170px] max-sm:w-[170px] h-[200px] w-[200px]  ' src={Profile_img} alt='profile-image'/>
          </Animated_component>
            <AnimatedHeading/>
            <AnimatedText>
               <p className='anime-child fade-text mt-1'>Software Developer</p>
            </AnimatedText>
            <AnimatedText>
               <p className='anime-child fade-text mt-1'>based in <span className='text-black'>kanyakumari,Tamil Nadu</span></p>
            </AnimatedText>
     </div>
)
}
export default profile;