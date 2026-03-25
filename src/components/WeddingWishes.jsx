import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Send } from 'lucide-react';

const WeddingWishes = () => {
    const [formData, setFormData] = useState({
        name: '',
        wish: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const text = `*New Wedding Wish!* 💖%0A%0A*From:* ${formData.name}%0A*Message:* ${formData.wish}`;
        const whatsappUrl = `https://wa.me/919633331196?text=${text}`;

        // Open WhatsApp
        window.open(whatsappUrl, '_blank');

        setFormData({ name: '', wish: '' });
    };

    return (
        <section className="py-24 px-4 bg-[var(--color-wedding-blue-50)]" id="wishes">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    className="glass rounded-3xl p-8 md:p-12 soft-shadow"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="text-center mb-10">
                        <Heart className="mx-auto text-pink-500 mb-4 animate-pulse" size={40} />
                        <h2 className="font-serif text-4xl md:text-5xl text-[var(--color-wedding-blue-900)] mb-4">Send Us Your Wishes</h2>
                        <p className="text-slate-600 font-light text-lg">Your blessings mean the world to us. Drop a message to make our day even more special!</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Your Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/60 backdrop-blur-sm transition-all"
                                placeholder="e.g. John & Family"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Your Message</label>
                            <textarea
                                name="wish"
                                required
                                rows={4}
                                value={formData.wish}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/60 backdrop-blur-sm transition-all resize-none"
                                placeholder="Wishing you a lifetime of joy..."
                            />
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-4 rounded-xl font-medium tracking-wide transition-all duration-300 soft-shadow transform hover:-translate-y-1"
                            >
                                <Send size={20} />
                                Send Wish via WhatsApp
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default WeddingWishes;
