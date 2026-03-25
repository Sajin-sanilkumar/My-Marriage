import React from 'react';

const WeddingFooter = () => {
    return (
        <footer className="bg-[var(--color-wedding-blue-900)] text-white py-12 px-4 text-center">
            <div className="max-w-4xl mx-auto flex flex-col items-center">
                <h2 className="font-serif text-3xl md:text-4xl mb-4 text-[var(--color-wedding-blue-50)]">Sajin & Keerthana</h2>
                <p className="font-light text-[var(--color-wedding-blue-100)] tracking-widest uppercase text-sm mb-8">April 26, 2026</p>

                <p className="italic font-serif text-lg md:text-xl text-[var(--color-wedding-blue-50)]/80 mb-8 max-w-md">
                    "Sharing our happiness with you"
                </p>

                <div className="w-full h-px bg-white/10 my-8" />

                <p className="text-sm text-white/50 font-light">
                    &copy; {new Date().getFullYear()} Sajin & Keerthana's Wedding. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default WeddingFooter;
