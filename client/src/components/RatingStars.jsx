import React from "react";

export default function RatingStars({ rating }) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const totalStars = 5;

    return (
        <div className="flex items-center">
            {Array.from({ length: totalStars }, (_, i) => {
                if (i < fullStars) {
                    return <span key={i} className="text-yellow-500 text-lg">★</span>;
                } else if (i === fullStars && hasHalfStar) {
                    return <span key={i} className="text-yellow-500 text-lg">☆</span>;
                } else {
                    return <span key={i} className="text-gray-300 text-lg">★</span>;
                }
            })}
        </div>
    );
}
