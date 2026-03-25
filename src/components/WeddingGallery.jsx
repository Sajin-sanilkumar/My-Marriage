import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const images = [
    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1583939008709-a78c18ec59a0?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop"
];

const WeddingGallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <section className="py-24 px-4 bg-white" id="gallery">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="font-serif text-4xl md:text-5xl text-[var(--color-wedding-blue-800)] mb-4">Capturing Moments</h2>
                    <div className="w-24 h-1 bg-[var(--color-wedding-blue-500)] mx-auto rounded-full" />
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                    {images.map((src, index) => (
                        <motion.div
                            key={index}
                            className="relative aspect-square overflow-hidden rounded-xl cursor-pointer"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            onClick={() => setSelectedImage(src)}
                        >
                            <img
                                src={src}
                                alt={`Gallery ${index + 1}`}
                                className="object-cover w-full h-full hover:scale-110 transition-transform duration-700 pointer-events-none"
                            />
                            <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors duration-300" />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-6 right-6 text-white hover:text-slate-300 transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X size={32} />
                        </button>
                        <motion.img
                            src={selectedImage}
                            alt="Selected"
                            className="max-w-full max-h-[90vh] object-contain rounded-lg soft-shadow"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()} // Prevent click from closing
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default WeddingGallery;
