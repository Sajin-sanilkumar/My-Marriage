import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';

const WeddingContact = () => {
    return (
        <section className="py-24 px-4 bg-white" id="contact">
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="font-serif text-4xl md:text-5xl text-[var(--color-wedding-blue-800)] mb-4">Get In Touch</h2>
                    <div className="w-24 h-1 bg-[var(--color-wedding-green-500)] mx-auto rounded-full mb-12" />
                    <p className="text-slate-600 font-light mb-12 text-lg">If you have any questions or need assistance, feel free to reach out to us.</p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                    <motion.div
                        className="flex flex-col items-center p-8 glass rounded-2xl soft-shadow hover:-translate-y-2 transition-transform duration-300"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="w-16 h-16 rounded-full bg-[var(--color-wedding-blue-50)] text-[var(--color-wedding-blue-800)] flex items-center justify-center mb-6">
                            <Phone size={28} />
                        </div>
                        <h3 className="font-serif text-2xl mb-4 text-slate-800">Call Us</h3>
                        <a href="tel:+919446444466" className="text-slate-600 hover:text-[var(--color-wedding-blue-500)] transition-colors mb-2 text-lg">+91 94464 44466</a>
                        <a href="tel:+919495444466" className="text-slate-600 hover:text-[var(--color-wedding-blue-500)] transition-colors text-lg">+91 94954 44466</a>
                    </motion.div>

                    <motion.div
                        className="flex flex-col items-center p-8 glass rounded-2xl soft-shadow hover:-translate-y-2 transition-transform duration-300"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <div className="w-16 h-16 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-6">
                            <MessageCircle size={28} />
                        </div>
                        <h3 className="font-serif text-2xl mb-4 text-slate-800">WhatsApp</h3>
                        <p className="text-slate-600 mb-6 text-center">Chat with us directly on WhatsApp for quick responses.</p>
                        <a
                            href="https://wa.me/919446444466"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-medium transition-colors soft-shadow flex items-center gap-2"
                        >
                            <MessageCircle size={20} />
                            Message Us
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default WeddingContact;
