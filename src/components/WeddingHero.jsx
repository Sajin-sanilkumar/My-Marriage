import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AddToCalendar from './AddToCalendar';
import Wedding3DCouple from './Wedding3DCouple';

const calculateTimeLeft = () => {
    const difference = +new Date('2026-04-26T05:15:00+05:30') - +new Date();
    let timeLeft = {};

    if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
        };
    } else {
        timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeft;
};

const WeddingHero = () => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    return (
        <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=2000&auto=format&fit=crop')` }}
            />
            {/* Soft gradient overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-white/60 via-white/40 to-[var(--color-wedding-offwhite)]" />

            {/* Content */}
            <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
                <motion.p
                    className="text-[var(--color-wedding-blue-800)] uppercase tracking-[0.3em] text-sm md:text-base mb-6 font-semibold"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    Together with our families
                </motion.p>

                <motion.h1
                    className="font-serif text-5xl md:text-7xl lg:text-8xl text-slate-800 mb-6 drop-shadow-sm"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    Sajin <span className="text-[var(--color-wedding-blue-500)]">&</span> Keerthana
                </motion.h1>

                <motion.p
                    className="text-xl md:text-2xl text-slate-700 font-light mb-12 tracking-wide"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    April 26, 2026
                </motion.p>

                {/* Countdown Timer */}
                <motion.div
                    className="flex gap-4 md:gap-8 mb-4 relative z-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                >
                    {Object.keys(timeLeft).map((interval) => (
                        <div key={interval} className="flex flex-col items-center glass px-4 py-3 md:px-6 md:py-4 rounded-2xl soft-shadow min-w[80px] md:min-w-[100px]">
                            <span className="text-3xl md:text-5xl font-serif text-[var(--color-wedding-blue-800)]">{timeLeft[interval]}</span>
                            <span className="text-xs md:text-sm uppercase tracking-wider text-slate-500 mt-2">{interval}</span>
                        </div>
                    ))}
                </motion.div>

                {/* 3D Couple Model */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, delay: 1 }}
                    className="w-full relative z-30 pointer-events-auto"
                >
                    <Wedding3DCouple />
                </motion.div>

                <motion.div
                    className="relative z-40 mt-4 pointer-events-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                >
                    <AddToCalendar />
                </motion.div>
            </div>
        </section>
    );
};

export default WeddingHero;
