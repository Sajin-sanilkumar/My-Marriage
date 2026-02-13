import Contact_form from "../components/ui/Contact/Contact_form.jsx";
import Contact_link from "../components/ui/Contact/Contact_link.jsx";

const Contact_page=()=>{
    return(
        <div id="contact" className="w-full h-auto p-4 mb-6 md:px-[30px] gap-x-4 flex max-md:flex-col">
            <Contact_form/>
            <Contact_link/>
        </div>
    )
}

export default Contact_page;