import { useState } from "react";
import { X, Code } from "lucide-react";

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (project: {
    title: string;
    description: string;
    tags: string[];
    projectLink: string;
    githubLink: string;
  }) => void;
}

export default function AddProjectModal({ isOpen, onClose, onSubmit }: AddProjectModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [projectLink, setProjectLink] = useState("");
  const [githubLink, setGithubLink] = useState("");

  if (!isOpen) return null;

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      tags,
      projectLink,
      githubLink,
    });
    // Reset form
    setTitle("");
    setDescription("");
    setTags([]);
    setTagInput("");
    setProjectLink("");
    setGithubLink("");
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border"
        style={{ 
          borderColor: "#EDE9FA",
          boxShadow: "0 8px 32px rgba(124,58,237,0.15)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: "#EDE9FA" }}>
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "#EDE9FA" }}
            >
              <Code style={{ color: "#7C3AED" }} size={20} />
            </div>
            <h2 className="text-2xl font-bold" style={{ color: "#1A1A2E" }}>
              Publicar nuevo proyecto
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-all"
            style={{ color: "#6B6880" }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "#1A1A2E" }}>
              TÍTULO DEL PROYECTO *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Portfolio Personal v2"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
              style={{ 
                borderColor: "#EDE9FA",
                backgroundColor: "#FAFAFA"
              }}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "#1A1A2E" }}>
              DESCRIPCIÓN *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe tu proyecto, tecnologías usadas, características principales..."
              rows={4}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 resize-none"
              style={{ 
                borderColor: "#EDE9FA",
                backgroundColor: "#FAFAFA"
              }}
              required
            />
          </div>

          {/* Tech Stack */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "#1A1A2E" }}>
              TECH STACK
            </label>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="Escribe una tecnología y presiona Enter (ej: React, Node.js, TypeScript)"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
              style={{ 
                borderColor: "#EDE9FA",
                backgroundColor: "#FAFAFA"
              }}
            />
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2"
                    style={{
                      backgroundColor: "#EDE9FA",
                      color: "#7C3AED",
                    }}
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:opacity-70"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Project Link */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "#1A1A2E" }}>
              LINK DEL PROYECTO *
            </label>
            <input
              type="url"
              value={projectLink}
              onChange={(e) => setProjectLink(e.target.value)}
              placeholder="https://mi-proyecto.com"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
              style={{ 
                borderColor: "#EDE9FA",
                backgroundColor: "#FAFAFA"
              }}
              required
            />
          </div>

          {/* GitHub Link */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: "#1A1A2E" }}>
              LINK DE GITHUB (opcional)
            </label>
            <input
              type="url"
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
              placeholder="https://github.com/usuario/proyecto"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
              style={{ 
                borderColor: "#EDE9FA",
                backgroundColor: "#FAFAFA"
              }}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 py-3 rounded-full font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: "#7C3AED" }}
            >
              Publicar Proyecto
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-full font-semibold transition-all border-2"
              style={{ 
                borderColor: "#DDD6FE",
                color: "#6B6880",
                backgroundColor: "white"
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
