import React from 'react';

const WeddingMaps = ({ query }) => {
    const encQuery = encodeURIComponent(query);
    const embedUrl = `https://maps.google.com/maps?q=${encQuery}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

    return (
        <div className="w-full flex justify-center mt-4">
            <div className="w-full h-48 overflow-hidden rounded-xl bg-slate-100 relative group">
                {/* Placeholder overlay to click through or show styling */}
                <iframe
                    title={`Map for ${query}`}
                    src={embedUrl}
                    className="absolute inset-0 w-full h-full border-0"
                    loading="lazy"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};

export default WeddingMaps;
