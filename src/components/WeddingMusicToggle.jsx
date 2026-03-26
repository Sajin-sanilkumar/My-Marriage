import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Music, VolumeX } from 'lucide-react';

const WeddingMusicToggle = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const audioSrc = "/wedding-song.webm";

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.5;
        }
    }, []);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.log("Audio play failed", e));
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <motion.div
            className="fixed bottom-6 right-6 z-50"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
        >
            <audio ref={audioRef} src={audioSrc} loop />
            <button
                onClick={togglePlay}
                className="flex items-center justify-center w-12 h-12 rounded-full glass soft-shadow bg-white/60 hover:bg-white/90 transition-all duration-300 text-[var(--color-wedding-blue-800)]"
                aria-label="Toggle background music"
            >
                {isPlaying ? <Music size={20} className="animate-pulse" /> : <VolumeX size={20} />}
            </button>
        </motion.div>
    );
};

export default WeddingMusicToggle;
