import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const storyItems = [
    {
        year: "2022",
        title: "First Met",
        content: "It started with a casual introduction by our families, and conversation flowed effortlessly into the night."
    },
    {
        year: "2023",
        title: "First Date",
        content: "A beautiful evening spent laughing over coffee, where we realized how much we had in common."
    },
    {
        year: "2024",
        title: "The Proposal",
        content: "Under a sky full of stars, amidst a setting of blue and white flowers, Sajin asked the magical question."
    },
    {
        year: "2026",
        title: "The Wedding",
        content: "Now we invite you to be a part of our biggest milestone as we tie the knot."
    }
];

const WeddingStory = () => {
    return (
        <section className="py-24 px-4 bg-[var(--color-wedding-blue-50)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/40 blur-3xl rounded-full" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--color-wedding-green-100)] opacity-50 blur-3xl rounded-full" />

            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <Heart className="mx-auto text-[var(--color-wedding-blue-500)] mb-4" size={32} />
                    <h2 className="font-serif text-4xl md:text-5xl text-[var(--color-wedding-blue-900)] mb-4">Our Story</h2>
                    <p className="text-slate-600 font-light text-lg">Every love story is beautiful, but ours is our favorite.</p>
                </motion.div>

                <div className="relative border-l-2 border-[var(--color-wedding-blue-100)] ml-4 md:mx-auto md:w-full md:max-w-3xl">
                    {storyItems.map((item, index) => (
                        <motion.div
                            key={index}
                            className="mb-12 ml-6 md:ml-0 md:flex items-center justify-between w-full"
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Timeline dot */}
                            <div className="absolute left-[-9px] md:left-1/2 md:ml-[-9px] w-4 h-4 bg-[var(--color-wedding-blue-500)] rounded-full border-4 border-[var(--color-wedding-blue-50)]" />

                            <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8 md:order-last'}`}>
                                <span className="text-sm font-bold text-[var(--color-wedding-blue-500)] tracking-widest">{item.year}</span>
                                <h3 className="font-serif text-2xl text-[var(--color-wedding-blue-900)] mt-1 mb-3">{item.title}</h3>
                                <p className="text-slate-600 leading-relaxed font-light">{item.content}</p>
                            </div>

                            <div className={`hidden md:block md:w-5/12 ${index % 2 === 0 ? 'md:order-last' : ''}`} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WeddingStory;
