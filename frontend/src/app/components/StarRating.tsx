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
  interactive = true 
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
    <div className="flex gap-1">
      {Array.from({ length: 5 }, (_, i) => {
        const starValue = i + 1;
        return (
          <button
            key={i}
            type="button"
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
            disabled={!interactive}
          >
            <Star
              size={size}
              fill={starValue <= displayRating ? "#F5C518" : "none"}
              stroke={starValue <= displayRating ? "#F5C518" : "#D1D5DB"}
            />
          </button>
        );
      })}
    </div>
  );
}
