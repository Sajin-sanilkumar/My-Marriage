

import Header from '../components/ui/Header/Header.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OnloandingPage from './OnLandingPage.jsx';

const Homepage = () => {
  return (

    <div id='home' className='w-screen h-screen  main-bg '>
      <header>
      </header>
      <main>
        <OnloandingPage />
        <ToastContainer position="top-left" autoClose={3000} />
      </main>
      <footer>
      </footer>
    </div>
  )
}
export default Homepage;