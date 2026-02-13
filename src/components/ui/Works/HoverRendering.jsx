import Greeting_card from "./greeting_card";
import ProjectHover_card from "./projectHover_card";
import IphoneMockup from "../../mockup/iphone_mockup"
import Agromart from "../../../assets/agromart.png"
import OpenAi from "../../../assets/OpenAi2.png"
const HoverRendering =({HoverState})=>{
        switch(HoverState){
            case "P0":
                return <Greeting_card/>;
            case "P1":
                return(
                    <ProjectHover_card>
                        <img src={OpenAi} className=" h-[370px] lg:h-[300px]"/>
                    </ProjectHover_card>
                )
             case "P2":
                return(
                    <ProjectHover_card>
                      
                       <IphoneMockup source={Agromart} />
                    </ProjectHover_card>
                )
        }
}

export default HoverRendering;