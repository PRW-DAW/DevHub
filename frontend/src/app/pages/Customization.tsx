import { useState } from "react";
import { Palette, Monitor, Bell, Layout } from "lucide-react";
import Sidebar from "../components/Sidebar";
import AvatarDropdown from "../components/AvatarDropdown";

const accentColors = [
  { name: "Violeta", value: "#7C3AED", selected: true },
  { name: "Azul", value: "#2563EB" },
  { name: "Rosa", value: "#DB2777" },
  { name: "Verde", value: "#059669" },
  { name: "Naranja", value: "#EA580C" },
];

const fontSizes = ["Pequeño", "Medio", "Grande"];
const languages = ["Español", "English", "Français", "Deutsch"];

export default function Customization() {
  const [selectedColor, setSelectedColor] = useState("#7C3AED");
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState("Medio");
  const [language, setLanguage] = useState("Español");
  const [emailNotif, setEmailNotif] = useState(true);
  const [followNotif, setFollowNotif] = useState(true);
  const [projectNotif, setProjectNotif] = useState(false);
  const [compactView, setCompactView] = useState(false);
  const [showTech, setShowTech] = useState(true);

  const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className="relative w-11 h-6 rounded-full transition-all flex-shrink-0"
      style={{ backgroundColor: value ? "#7C3AED" : "#DDD6FE" }}
    >
      <span
        className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all"
        style={{ left: value ? "calc(100% - 20px)" : "4px" }}
      />
    </button>
  );

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#F0EEFA" }}>
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        {/* Barra superior */}
        <div style={{ height: "2px", background: "linear-gradient(90deg, #7C3AED 0%, #A78BFA 100%)" }} />

        {/* Header */}
        <div className="bg-white shadow-sm border-b sticky top-0 z-10" style={{ borderColor: "#EDE9FA" }}>
          <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold" style={{ color: "#1A1A2E" }}>Personalización</h2>
              <p className="mt-1" style={{ color: "#9B8EC4" }}>// Ajusta la apariencia de DevHub</p>
            </div>
            <AvatarDropdown />
          </div>
        </div>

        {/* Contenido */}
        <div className="max-w-4xl mx-auto px-8 py-10 space-y-6">

          {/* Aviso beta */}
          <div className="bg-white rounded-xl p-4 border flex items-center gap-3"
            style={{ borderColor: "#EDE9FA", boxShadow: "0 2px 12px rgba(124,58,237,0.06)", borderLeft: "4px solid #7C3AED" }}>
            <Palette style={{ color: "#7C3AED", flexShrink: 0 }} size={20} />
            <p className="text-sm" style={{ color: "#6B6880" }}>
              <span className="font-semibold" style={{ color: "#1A1A2E" }}>Versión beta — </span>
              Las preferencias de personalización se guardarán en futuras versiones. Por ahora son solo una vista previa.
            </p>
          </div>

          {/* Apariencia */}
          <div className="bg-white rounded-xl p-6 border" style={{ borderColor: "#EDE9FA", boxShadow: "0 2px 12px rgba(124,58,237,0.06)" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg" style={{ backgroundColor: "#EDE9FA" }}>
                <Monitor style={{ color: "#7C3AED" }} size={20} />
              </div>
              <h3 className="font-bold text-base" style={{ color: "#1A1A2E" }}>Apariencia</h3>
            </div>

            {/* Modo oscuro */}
            <div className="flex items-center justify-between py-4 border-b" style={{ borderColor: "#EDE9FA" }}>
              <div>
                <p className="font-semibold text-sm" style={{ color: "#1A1A2E" }}>Modo oscuro</p>
                <p className="text-xs mt-0.5" style={{ color: "#9B8EC4" }}>Próximamente disponible</p>
              </div>
              <Toggle value={darkMode} onChange={() => setDarkMode(!darkMode)} />
            </div>

            {/* Color de acento */}
            <div className="py-4 border-b" style={{ borderColor: "#EDE9FA" }}>
              <p className="font-semibold text-sm mb-3" style={{ color: "#1A1A2E" }}>Color de acento</p>
              <div className="flex gap-3">
                {accentColors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    title={color.name}
                    className="w-8 h-8 rounded-full transition-all"
                    style={{
                      backgroundColor: color.value,
                      outline: selectedColor === color.value ? `3px solid ${color.value}` : "none",
                      outlineOffset: "2px",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Tamaño de fuente */}
            <div className="py-4 border-b" style={{ borderColor: "#EDE9FA" }}>
              <p className="font-semibold text-sm mb-3" style={{ color: "#1A1A2E" }}>Tamaño de fuente</p>
              <div className="flex gap-2">
                {fontSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setFontSize(size)}
                    className="px-4 py-2 rounded-full text-sm font-medium border transition-all"
                    style={{
                      backgroundColor: fontSize === size ? "#7C3AED" : "white",
                      color: fontSize === size ? "white" : "#6B6880",
                      borderColor: fontSize === size ? "#7C3AED" : "#EDE9FA",
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Idioma */}
            <div className="pt-4">
              <p className="font-semibold text-sm mb-3" style={{ color: "#1A1A2E" }}>Idioma</p>
              <div className="flex gap-2 flex-wrap">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className="px-4 py-2 rounded-full text-sm font-medium border transition-all"
                    style={{
                      backgroundColor: language === lang ? "#7C3AED" : "white",
                      color: language === lang ? "white" : "#6B6880",
                      borderColor: language === lang ? "#7C3AED" : "#EDE9FA",
                    }}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Notificaciones */}
          <div className="bg-white rounded-xl p-6 border" style={{ borderColor: "#EDE9FA", boxShadow: "0 2px 12px rgba(124,58,237,0.06)" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg" style={{ backgroundColor: "#EDE9FA" }}>
                <Bell style={{ color: "#7C3AED" }} size={20} />
              </div>
              <h3 className="font-bold text-base" style={{ color: "#1A1A2E" }}>Notificaciones</h3>
            </div>

            <div className="space-y-4">
              {[
                { label: "Notificaciones por email", desc: "Recibe un email cuando alguien interactúa contigo", value: emailNotif, onChange: () => setEmailNotif(!emailNotif) },
                { label: "Nuevos seguidores", desc: "Notificación cuando alguien empieza a seguirte", value: followNotif, onChange: () => setFollowNotif(!followNotif) },
                { label: "Comentarios en proyectos", desc: "Notificación cuando alguien comenta tu proyecto", value: projectNotif, onChange: () => setProjectNotif(!projectNotif) },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-3 border-b last:border-0" style={{ borderColor: "#EDE9FA" }}>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: "#1A1A2E" }}>{item.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#9B8EC4" }}>{item.desc}</p>
                  </div>
                  <Toggle value={item.value} onChange={item.onChange} />
                </div>
              ))}
            </div>
          </div>

          {/* Layout */}
          <div className="bg-white rounded-xl p-6 border" style={{ borderColor: "#EDE9FA", boxShadow: "0 2px 12px rgba(124,58,237,0.06)" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg" style={{ backgroundColor: "#EDE9FA" }}>
                <Layout style={{ color: "#7C3AED" }} size={20} />
              </div>
              <h3 className="font-bold text-base" style={{ color: "#1A1A2E" }}>Layout del Feed</h3>
            </div>

            <div className="space-y-4">
              {[
                { label: "Vista compacta", desc: "Muestra más proyectos reduciendo el tamaño de las tarjetas", value: compactView, onChange: () => setCompactView(!compactView) },
                { label: "Mostrar tecnologías", desc: "Muestra las etiquetas de tecnologías en las tarjetas del feed", value: showTech, onChange: () => setShowTech(!showTech) },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-3 border-b last:border-0" style={{ borderColor: "#EDE9FA" }}>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: "#1A1A2E" }}>{item.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#9B8EC4" }}>{item.desc}</p>
                  </div>
                  <Toggle value={item.value} onChange={item.onChange} />
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pb-4">
            <p className="text-xs" style={{ color: "#9B8EC4" }}>
              // DevHub β — Proyecto de fin de ciclo DAW 2025/2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
