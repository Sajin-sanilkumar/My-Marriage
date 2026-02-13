import Menubar from './menubar'
import Navbar from './navbar';

const Header=()=>{
    return(
        <div className='w-full'>
        <Menubar/>
         <Navbar/>
        </div>
    )
}

export default Header;