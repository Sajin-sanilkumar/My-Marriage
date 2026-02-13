import Project1_ImageSlider from "../components/ui/Works/Project1_ImageSlider"
import Project2_ImageSlider from "../components/ui/Works/Project2_ImageSlider"
import { ProjectDetail } from "../components/ui/Works/Project_details"


export const OpenAnalytics_page=()=>{
            const title = "Open Analytics";
            const sub_title = "Track. Analyze. Improve.";
            const sub_title2 = "A real-time web session and event tracking platform for modern web applications.";

            const info = "Open Analytics is a real-time event and session tracking platform designed to help web developers and businesses understand user behavior on their websites. It captures page views, clicks, and session activities using Kafka and securely manages user data with Spring Security. The system supports live dashboards, user heatmaps, and customizable event streams.";
            
            const credit = `All backend development, core architecture, and project idea by my brother [Oswin Jerome]`;

            const tech_stack = [
            "Frontend: Next.js ,Tailwind and Shadcn",
            "Backend: Spring Boot",
            "Security: Spring Security",
            "Real-time Messaging: Apache Kafka",
            "Database: PostgreSQL",
            ];

            const my_role = [
                "Designed and implemented the user signup screen using Next.js and Tailwind CSS",
                "Built responsive and accessible UI components for signup form and Create project screen ",
                "Ensured mobile-first responsive design using Tailwind utility classes",
                "Optimized the layout for performance and visual consistency across devices"
                ];
            const features_stack = [
            "Real-time user session and event tracking",
            "Spring Security-based authentication and authorization",
            "Kafka pipeline for high-speed event ingestion",
            "Custom event mapping (clicks, scrolls, page views, etc.)",
            "Live dashboards and data visualization",
            "Role-based access for admins, developers, and viewers",
            "GDPR-friendly data anonymization and storage options"
            ];

            const code_link = "https://github.com/oswin-jerome/openAnalytics";
            const preview_link = "#";
    return (
        <ProjectDetail children={<Project2_ImageSlider/>} title={title} sub_title={sub_title} sub_title2={sub_title2}
         info={info} tech_stack={tech_stack} features_stack={features_stack}
         code_link={code_link} preview_link={preview_link} my_role={my_role} credits={credit}/>
    )
}