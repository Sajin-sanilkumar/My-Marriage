import React from 'react';
import { CalendarPlus } from 'lucide-react';

const AddToCalendar = () => {
    const event = {
        title: "Sajin & Keerthana's Wedding",
        description: "Join us to celebrate the wedding of Sajin Sanil Kumar and Keerthana.",
        location: "Sree Krishna Temple, Guruvayoor",
        startTime: "20260426T234500Z", // 05:15 AM IST is 23:45 UTC prev day
        endTime: "20260427T004500Z" // 06:15 AM IST
    };

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.startTime}/${event.endTime}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;

    return (
        <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[var(--color-wedding-blue-800)] text-white px-6 py-3 rounded-full hover:bg-[var(--color-wedding-blue-900)] transition-colors duration-300 soft-shadow text-sm md:text-base uppercase tracking-wider font-medium"
        >
            <CalendarPlus size={20} />
            Add to Calendar
        </a>
    );
};

export default AddToCalendar;
