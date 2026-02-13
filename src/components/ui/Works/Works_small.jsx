import Project_card from "./projectcard.jsx";
import Agromart from "../../../assets/agromart.png"
import OpenAi from "../../../assets/OpenAi2.png"
import IphoneMockup from "../../mockup/iphone_mockup.jsx";

const Medium_screenWorks=()=>{
    return (
          <div className='w-[full] flex flex-col items-center gap-2  lg:hidden md:gap-4 md:flex-row md:flex-wrap'>
                <Project_card statekey={"P1"}>
                    <img src={OpenAi} alt="project-1"  />
                    <p className="absolute bottom-2 fade-text">Open Analytics</p>
                </Project_card>
              <Project_card statekey={"P2"}>
                 <IphoneMockup source={Agromart}/>
                 <p className="absolute bottom-1  fade-text ">FarmBuy</p>
              </Project_card>
          </div>
    )
}

export default Medium_screenWorks;