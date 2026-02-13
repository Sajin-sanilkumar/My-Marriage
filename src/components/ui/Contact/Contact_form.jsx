import { useRef } from "react";
import { toast } from 'react-toastify';
import { validate } from "../../../services/validation.js";

const Contact_form=()=>{
    const formRef = useRef(); 

        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                    await validate(formRef);
                    toast.success("Mail sented Successfuly!");
            } catch (error) {
                    toast.error(error.message);
            }
        };
    return(
        <div className="w-[50%] max-sm:w-full">
             <h2 className=' text-2xl font-semibold  text-black max-md:text-xl '>Contact me</h2>
             <p className="fade-text mt-2 ">Share your Queries and Feedback</p>
                <div className="w-full mt-4 ">
                    <form  ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-y-4 "  >
                            <label htmlFor="name" >Name:</label>
                            <input id="name" name="name" type="text"  className="outline  sm:w-full  md:max-w-[350px]  p-2 rounded-sm focus:outline-blue-500" placeholder="name" autoComplete="off"/>
                            <label htmlFor="email">Email:</label>
                            <input id="email" name="email" type="email"   className="outline sm:w-full md:max-w-[350px] p-2 rounded-sm focus:outline-blue-500" placeholder="email" autoComplete="off"/>
                            <label htmlFor="message" >Message:</label>
                            <textarea id="message" name="message" className="outline sm:w-full md:max-w-[350px] p-2 rounded-sm focus:outline-blue-500" placeholder="message" autoComplete="off"/>
                            <button type="submit" className="p-4 text-white bg-black sm:w-full md:max-w-[350px] rounded-sm hover:scale-105 transition-transform duration-300" >Send </button>
                    </form>
                </div>
         </div>
    )
}


export default Contact_form;