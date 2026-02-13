import { sendEmail } from "./email_service";



export const validate=async(formRef)=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const formData = new FormData(formRef.current);
    const name=formData.get("name");
    const email=formData.get("email");
    const message=formData.get("message");

    if(!name||name.trim()===""){
        throw new Error("name is empty") 
    }
    if(!emailRegex.test(email.trim().toLowerCase())){
         throw new Error("email is invalid") 
    }
     if(!message||message.trim()===""){
       throw new Error("message is empty") 
    }
         await sendEmail(formRef);
}
