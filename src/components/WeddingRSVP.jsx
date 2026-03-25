import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WeddingRSVP = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        guests: '1',
        event: 'Wedding Ceremony',
        attendance: 'Yes'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const text = `*RSVP Details:*
Name: ${formData.name}
Phone: ${formData.phone}
Guests: ${formData.guests}
Event: ${formData.event}
Attending: ${formData.attendance}`;

        const whatsappUrl = `https://wa.me/919633331196?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, '_blank');

        setTimeout(() => {
            setIsSubmitting(false);
            toast.success("Opening WhatsApp to send your RSVP!", {
                position: "bottom-center",
                theme: "light",
            });
            setFormData({
                name: '',
                phone: '',
                guests: '1',
                event: 'Wedding Ceremony',
                attendance: 'Yes'
            });
        }, 1000);
    };

    return (
        <section className="py-24 px-4 bg-[var(--color-wedding-blue-50)]" id="rsvp">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    className="glass rounded-3xl p-8 md:p-12 soft-shadow"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="text-center mb-10">
                        <h2 className="font-serif text-4xl md:text-5xl text-[var(--color-wedding-blue-900)] mb-4">RSVP</h2>
                        <p className="text-slate-600 font-light">We would love to celebrate with you! Please let us know if you can make it.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-wedding-blue-500)] bg-white/50 backdrop-blur-sm transition-all"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-wedding-blue-500)] bg-white/50 backdrop-blur-sm transition-all"
                                    placeholder="+91 98765 43210"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Number of Guests</label>
                                <select
                                    name="guests"
                                    value={formData.guests}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-wedding-blue-500)] bg-white/50 backdrop-blur-sm transition-all"
                                >
                                    {[1, 2, 3, 4, 5].map(num => (
                                        <option key={num} value={num}>{num}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Which Event?</label>
                                <select
                                    name="event"
                                    value={formData.event}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-wedding-blue-500)] bg-white/50 backdrop-blur-sm transition-all"
                                >
                                    <option value="Wedding Ceremony">Wedding Ceremony</option>
                                    <option value="Groom Reception">Groom Side Reception</option>
                                    <option value="Bride Reception">Bride Side Reception</option>
                                    <option value="Multiple">Multiple Events</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-3 pt-4 border-t border-slate-200/50">
                            <label className="text-sm font-medium text-slate-700 block text-center">Will you be attending?</label>
                            <div className="flex justify-center gap-8">
                                <label className="flex items-center gap-2 cursor-pointer font-light">
                                    <input
                                        type="radio"
                                        name="attendance"
                                        value="Yes"
                                        checked={formData.attendance === 'Yes'}
                                        onChange={handleChange}
                                        className="w-4 h-4 text-[var(--color-wedding-blue-500)] focus:ring-[var(--color-wedding-blue-500)]"
                                    />
                                    Joyfully Accept
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer font-light">
                                    <input
                                        type="radio"
                                        name="attendance"
                                        value="No"
                                        checked={formData.attendance === 'No'}
                                        onChange={handleChange}
                                        className="w-4 h-4 text-[var(--color-wedding-blue-500)] focus:ring-[var(--color-wedding-blue-500)]"
                                    />
                                    Regretfully Decline
                                </label>
                            </div>
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[var(--color-wedding-blue-800)] hover:bg-[var(--color-wedding-blue-900)] text-white py-4 rounded-xl font-medium tracking-wide transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed soft-shadow"
                            >
                                {isSubmitting ? "Sending..." : "Send RSVP"}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
            <ToastContainer />
        </section>
    );
};

export default WeddingRSVP;
