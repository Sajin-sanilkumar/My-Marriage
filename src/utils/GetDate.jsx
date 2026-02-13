import { useState,useEffect } from "react";

export default function GetDate() {
  const [date, setDate] = useState("");
  const month=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"]
  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const current_month=now.getMonth();
      const current_date=now.getDate()
        setDate(`${month[current_month]} ${current_date}`)
    };
    updateDate(); 
    const timer = setInterval(updateDate,1000);
    return () => clearInterval(timer); 
  }, []);

  return <p className="text-md pl-2">{date}</p>;
}