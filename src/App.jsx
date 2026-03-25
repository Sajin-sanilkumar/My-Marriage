import { Agromart_page } from "./pages/Agromart";
import Homepage from "./pages/Home_page";
import Wedding from "./pages/Wedding";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { OpenAnalytics_page } from "./pages/openAnalytics";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Wedding />} />
        <Route path="/old-home" element={<Homepage />} />
        <Route path="/project/P2" element={<Agromart_page />} />
        <Route path="/project/P1" element={<OpenAnalytics_page />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;