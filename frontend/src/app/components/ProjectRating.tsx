import { useState } from "react";
import StarRating from "./StarRating";

interface ProjectRatingProps {
  projectId: number;
  initialAvg: number | null;
  initialCount: number;
  initialUserRating: number | null;
  size?: number;
  showCount?: boolean;
}

export default function ProjectRating({
  projectId,
  initialAvg,
  initialCount,
  initialUserRating,
  size = 20,
  showCount = false,
}: ProjectRatingProps) {
  const [avg, setAvg] = useState<number>(Number(initialAvg) || 0);
  const [count, setCount] = useState<number>(initialCount);
  const [userRating, setUserRating] = useState<number>(initialUserRating ?? 0);

  const handleRate = async (stars: number) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://api.devhub.com/api/projects/${projectId}/rate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ stars }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setAvg(Number(data.rating_avg));
      setCount(data.rating_count);
      setUserRating(stars);
    } catch {
      console.error("Error al valorar el proyecto");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <StarRating
        initialRating={userRating || avg}
        size={size}
        onRatingChange={handleRate}
        interactive={true}
      />
      {showCount && count > 0 && (
        <span className="text-sm" style={{ color: "#6B6880" }}>
          {avg.toFixed(1)} ({count})
        </span>
      )}
    </div>
  );
}
