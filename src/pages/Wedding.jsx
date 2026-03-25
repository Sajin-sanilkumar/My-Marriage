import React from 'react';
import { motion } from 'framer-motion';
import WeddingMusicToggle from '../components/WeddingMusicToggle';
import WeddingHero from '../components/WeddingHero';
import WeddingTimeline from '../components/WeddingTimeline';
import WeddingGallery from '../components/WeddingGallery';
import WeddingWishes from '../components/WeddingWishes';
import WeddingFooter from '../components/WeddingFooter';

const Wedding = () => {
    return (
        <div className="relative min-h-screen bg-[var(--color-wedding-offwhite)] font-sans text-slate-800">
            <WeddingMusicToggle />
            <main>
                <WeddingHero />
                <WeddingTimeline />
                <WeddingGallery />
                <WeddingWishes />
            </main>
            <WeddingFooter />
        </div>
    );
};

export default Wedding;
