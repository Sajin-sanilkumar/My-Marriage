import { useEffect, useState } from "react";

export default function GetTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12 || 12;
      if(minutes<10){
        setTime(`${hours}:0${minutes} ${ampm}`);
      }
      else{
        setTime(`${hours}:${minutes} ${ampm}`);
      }  
    };
    updateTime(); 
    const timer = setInterval(updateTime,1000);
    return () => clearInterval(timer); 
  }, []);

  return <p className="text-md pr-2">{time}</p>;
}


