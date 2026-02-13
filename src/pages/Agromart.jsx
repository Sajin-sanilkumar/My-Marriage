import Project1_ImageSlider from "../components/ui/Works/Project1_ImageSlider"
import { ProjectDetail } from "../components/ui/Works/Project_details"


export const Agromart_page=()=>{
    const title="FarmBuy"
    const sub_title="Fresh from Farm to Your Doorstep"
    const sub_title2="A mobile app to bridge the gap between local farmers and end consumers."
    const info="FarmBuy is a user-friendly mobile application designed to connect farmers directly with consumers,eliminating the middlemen and ensuring better prices and fresh produce.The app enables users to discover nearby farmers, browse available crops/products,and place orders with real-time availability and delivery scheduling"       
    const tech_stack=["Frontend: Flutter ","State managment: Bloc","Backend: Node.js + Express","Database: MongoDB","Authentication: JWT","Email Notifications:Nodemailer"]
    const features_stack = [
                    "Real-time crop availability & booking",
                    "Secure login/signup for users and farmers",
                    "OTP Verfication via email",
                    "Booking confirmation via email, and push notifications",
                    "Transaction and booking history",
                    "Search crops by category, freshness, or location",
                    ];
    const code_link="https://github.com/Manoj0012/Agromart-Mobile-Application";
    const preview_link="#"
    return (
        <ProjectDetail children={<Project1_ImageSlider/>} title={title} sub_title={sub_title} sub_title2={sub_title2}
         info={info} tech_stack={tech_stack} features_stack={features_stack}
         code_link={code_link} preview_link={preview_link} my_role={""} credits={""}/>
    )
}