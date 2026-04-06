// Utility function for consistent tech tag colors across the entire app

export const getTechTagColors = (tag: string): { backgroundColor: string; color: string } => {
  const techColors: { [key: string]: { backgroundColor: string; color: string } } = {
    "React": { backgroundColor: "#E8F4FD", color: "#0EA5E9" },
    "TypeScript": { backgroundColor: "#EEF2FF", color: "#6366F1" },
    "JavaScript": { backgroundColor: "#FEFCE8", color: "#CA8A04" },
    "Node.js": { backgroundColor: "#F0FDF4", color: "#16A34A" },
    "Python": { backgroundColor: "#FFF7ED", color: "#EA580C" },
    "Vue": { backgroundColor: "#F0FDF4", color: "#059669" },
    "CSS": { backgroundColor: "#FDF4FF", color: "#A855F7" },
    "MongoDB": { backgroundColor: "#F0FDF4", color: "#15803D" },
    "TailwindCSS": { backgroundColor: "#EFF6FF", color: "#2563EB" },
    "Django": { backgroundColor: "#ECFDF5", color: "#065F46" },
    "API": { backgroundColor: "#FFF1F2", color: "#E11D48" },
    "Docker": { backgroundColor: "#EFF6FF", color: "#1D4ED8" },
    "Next.js": { backgroundColor: "#E8F4FD", color: "#0EA5E9" },
    "Chart.js": { backgroundColor: "#FFF7ED", color: "#EA580C" },
    "Firebase": { backgroundColor: "#FFF7ED", color: "#EA580C" },
    "Sass": { backgroundColor: "#FDF4FF", color: "#A855F7" },
    "Socket.io": { backgroundColor: "#F0FDF4", color: "#16A34A" },
    "Express": { backgroundColor: "#F0FDF4", color: "#16A34A" },
    "Three.js": { backgroundColor: "#FEFCE8", color: "#CA8A04" },
    "AWS": { backgroundColor: "#FFF7ED", color: "#EA580C" },
    "Mobile": { backgroundColor: "#FDF4FF", color: "#A855F7" },
    "React Native": { backgroundColor: "#E8F4FD", color: "#0EA5E9" },
    "Flutter": { backgroundColor: "#EFF6FF", color: "#2563EB" },
    "Figma": { backgroundColor: "#FDF4FF", color: "#A855F7" },
    "K8s": { backgroundColor: "#EFF6FF", color: "#1D4ED8" },
  };

  return techColors[tag] || { backgroundColor: "#F3F4F6", color: "#6B7280" };
};
