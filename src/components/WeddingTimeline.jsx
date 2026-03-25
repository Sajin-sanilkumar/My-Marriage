import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, CalendarDays, Map } from 'lucide-react';
import WeddingMaps from './WeddingMaps';

const timelineEvents = [
    {
        id: 1,
        title: "Wedding Ceremony",
        date: "April 26, 2026",
        time: "05:15 AM – 06:15 AM",
        location: "Sree Krishna Temple, Guruvayoor",
        mapQuery: "Sree Krishna Temple, Guruvayoor",
        mapLink: "https://maps.app.goo.gl/uBdpwuNveSmt3SVJ6",
        icon: <CalendarDays size={24} />
    },
    {
        id: 2,
        title: "Groom Side Reception",
        date: "April 27, 2026",
        time: "3:00 PM – 9:00 PM",
        location: "Groom Residence",
        mapQuery: "8.698355, 76.885037",
        mapLink: "https://maps.app.goo.gl/n2k3z9pAEKGVo5X78",
        icon: <MapPin size={24} />
    },
    {
        id: 3,
        title: "Bride Side Reception",
        date: "May 2, 2026",
        time: "Time to be decided",
        location: "Athafy Auditorium",
        mapQuery: "Athafy Auditorium",
        mapLink: "https://maps.app.goo.gl/As3ALXYUQkwDBBHA6",
        icon: <Clock size={24} />
    }
];

const WeddingTimeline = () => {
    return (
        <section className="py-24 px-4 bg-white" id="timeline">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="font-serif text-4xl md:text-5xl text-[var(--color-wedding-blue-800)] mb-4">Wedding Events</h2>
                    <div className="w-24 h-1 bg-[var(--color-wedding-green-500)] mx-auto rounded-full" />
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {timelineEvents.map((event, index) => (
                        <motion.div
                            key={event.id}
                            className="glass rounded-2xl p-8 soft-shadow flex flex-col items-center text-center relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            {/* Decorative top corner */}
                            <div className="absolute top-0 right-0 w-16 h-16 bg-[var(--color-wedding-blue-50)] rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-500" />

                            <div className="w-16 h-16 rounded-full bg-[var(--color-wedding-blue-100)] text-[var(--color-wedding-blue-800)] flex items-center justify-center mb-6">
                                {event.icon}
                            </div>

                            <h3 className="font-serif text-2xl mb-4 text-slate-800">{event.title}</h3>

                            <div className="flex flex-col gap-3 text-slate-600 mb-8 w-full font-light">
                                <div className="flex items-center justify-center gap-2">
                                    <span className="font-medium text-[var(--color-wedding-blue-500)]">{event.date}</span>
                                </div>
                                <div className="flex justify-center border-t border-slate-100 pt-3">
                                    {event.time}
                                </div>
                                <div className="flex justify-center border-t border-slate-100 pt-3">
                                    {event.location}
                                </div>
                            </div>

                            <WeddingMaps query={event.mapQuery} />

                            <a
                                href={event.mapLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-6 inline-flex items-center gap-2 px-6 py-2 rounded-full border border-[var(--color-wedding-blue-200)] text-[var(--color-wedding-blue-600)] hover:bg-[var(--color-wedding-blue-50)] transition-colors text-sm font-medium"
                            >
                                <Map size={16} />
                                Get Directions
                            </a>

                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WeddingTimeline;
