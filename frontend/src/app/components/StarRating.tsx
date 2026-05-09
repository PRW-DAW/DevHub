import { Star } from "lucide-react";
import { useState } from "react";

interface StarRatingProps {
  initialRating?: number;
  size?: number;
  onRatingChange?: (rating: number) => void;
  interactive?: boolean;
}

export default function StarRating({
  initialRating = 0,
  size = 20,
  onRatingChange,
  interactive = true,
}: StarRatingProps) {
  const [rating, setRating] = useState(initialRating);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleClick = (selectedRating: number) => {
    if (!interactive) return;
    setRating(selectedRating);
    if (onRatingChange) {
      onRatingChange(selectedRating);
    }
  };

  const handleMouseEnter = (selectedRating: number) => {
    if (!interactive) return;
    setHoveredRating(selectedRating);
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    setHoveredRating(0);
  };

  const displayRating = hoveredRating || rating;

  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => {
        const starValue = i + 1;
        const filled = displayRating >= starValue;
        const partial = !filled && displayRating > i && displayRating < starValue;
        const fillPercent = partial ? Math.round((displayRating - i) * 100) : 0;
        const uniqueId = `star-gradient-${size}-${i}`;

        return (
          <button
            key={i}
            type="button"
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            className={`${interactive ? "cursor-pointer hover:scale-110" : "cursor-default"} transition-transform`}
            disabled={!interactive}
          >
            {partial ? (
              <svg width={size} height={size} viewBox="0 0 24 24">
                <defs>
                  <linearGradient id={uniqueId}>
                    <stop offset={`${fillPercent}%`} stopColor="#F5C518" />
                    <stop offset={`${fillPercent}%`} stopColor="none" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <polygon
                  points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                  fill={`url(#${uniqueId})`}
                  stroke="#F5C518"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <Star
                size={size}
                fill={filled ? "#F5C518" : "none"}
                stroke={filled ? "#F5C518" : "#D1D5DB"}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
