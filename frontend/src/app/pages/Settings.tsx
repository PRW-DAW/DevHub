import { useState } from "react";
import { Settings, Shield, User, Trash2, Eye, EyeOff } from "lucide-react";
import Sidebar from "../components/Sidebar";
import AvatarDropdown from "../components/AvatarDropdown";

export default function SettingsPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [publicProfile, setPublicProfile] = useState(true);
  const [showProjects, setShowProjects] = useState(true);

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
              <h2 className="text-2xl font-bold" style={{ color: "#1A1A2E" }}>Ajustes</h2>
              <p className="mt-1" style={{ color: "#9B8EC4" }}>// Gestiona tu cuenta y privacidad</p>
            </div>
            <AvatarDropdown />
          </div>
        </div>

        {/* Contenido */}
        <div className="max-w-4xl mx-auto px-8 py-10 space-y-6">

          {/* Aviso beta */}
          <div className="bg-white rounded-xl p-4 border flex items-center gap-3"
            style={{ borderColor: "#EDE9FA", boxShadow: "0 2px 12px rgba(124,58,237,0.06)", borderLeft: "4px solid #7C3AED" }}>
            <Settings style={{ color: "#7C3AED", flexShrink: 0 }} size={20} />
            <p className="text-sm" style={{ color: "#6B6880" }}>
              <span className="font-semibold" style={{ color: "#1A1A2E" }}>Versión beta — </span>
              Los cambios en esta sección estarán disponibles en futuras versiones. Por ahora es una vista previa.
            </p>
          </div>

          {/* Cuenta */}
          <div className="bg-white rounded-xl p-6 border" style={{ borderColor: "#EDE9FA", boxShadow: "0 2px 12px rgba(124,58,237,0.06)" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg" style={{ backgroundColor: "#EDE9FA" }}>
                <User style={{ color: "#7C3AED" }} size={20} />
              </div>
              <h3 className="font-bold text-base" style={{ color: "#1A1A2E" }}>Cuenta</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: "#1A1A2E" }}>
                  NOMBRE
                </label>
                <input
                  type="text"
                  placeholder="Tu nombre completo"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-sm"
                  style={{ borderColor: "#EDE9FA", color: "#1A1A2E" }}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: "#1A1A2E" }}>
                  USERNAME
                </label>
                <input
                  type="text"
                  placeholder="Tu username"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-sm"
                  style={{ borderColor: "#EDE9FA", color: "#1A1A2E" }}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: "#1A1A2E" }}>
                  EMAIL
                </label>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-sm"
                  style={{ borderColor: "#EDE9FA", color: "#1A1A2E" }}
                />
              </div>
              <div className="pt-2">
                <button
                  className="px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: "#7C3AED" }}
                >
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>

          {/* Seguridad */}
          <div className="bg-white rounded-xl p-6 border" style={{ borderColor: "#EDE9FA", boxShadow: "0 2px 12px rgba(124,58,237,0.06)" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg" style={{ backgroundColor: "#EDE9FA" }}>
                <Shield style={{ color: "#7C3AED" }} size={20} />
              </div>
              <h3 className="font-bold text-base" style={{ color: "#1A1A2E" }}>Seguridad</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: "#1A1A2E" }}>
                  CONTRASEÑA ACTUAL
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-sm"
                    style={{ borderColor: "#EDE9FA" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ color: "#9B8EC4" }}
                  >
                    {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: "#1A1A2E" }}>
                  NUEVA CONTRASEÑA
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-sm"
                    style={{ borderColor: "#EDE9FA" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ color: "#9B8EC4" }}
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: "#1A1A2E" }}>
                  CONFIRMAR CONTRASEÑA
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent text-sm"
                    style={{ borderColor: "#EDE9FA" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ color: "#9B8EC4" }}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Doble factor */}
              <div className="flex items-center justify-between py-3 border-t" style={{ borderColor: "#EDE9FA" }}>
                <div>
                  <p className="font-semibold text-sm" style={{ color: "#1A1A2E" }}>Autenticación en dos pasos</p>
                  <p className="text-xs mt-0.5" style={{ color: "#9B8EC4" }}>Próximamente disponible</p>
                </div>
                <Toggle value={twoFactor} onChange={() => setTwoFactor(!twoFactor)} />
              </div>

              <div className="pt-2">
                <button
                  className="px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: "#7C3AED" }}
                >
                  Cambiar contraseña
                </button>
              </div>
            </div>
          </div>

          {/* Privacidad */}
          <div className="bg-white rounded-xl p-6 border" style={{ borderColor: "#EDE9FA", boxShadow: "0 2px 12px rgba(124,58,237,0.06)" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg" style={{ backgroundColor: "#EDE9FA" }}>
                <Eye style={{ color: "#7C3AED" }} size={20} />
              </div>
              <h3 className="font-bold text-base" style={{ color: "#1A1A2E" }}>Privacidad</h3>
            </div>

            <div className="space-y-4">
              {[
                { label: "Perfil público", desc: "Cualquier usuario registrado puede ver tu perfil", value: publicProfile, onChange: () => setPublicProfile(!publicProfile) },
                { label: "Mostrar mis proyectos", desc: "Tus proyectos aparecen en el feed general", value: showProjects, onChange: () => setShowProjects(!showProjects) },
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

          {/* Zona de peligro */}
          <div className="bg-white rounded-xl p-6 border" style={{ borderColor: "#FEE2E2", boxShadow: "0 2px 12px rgba(124,58,237,0.06)" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg" style={{ backgroundColor: "#FEE2E2" }}>
                <Trash2 style={{ color: "#DC2626" }} size={20} />
              </div>
              <h3 className="font-bold text-base" style={{ color: "#DC2626" }}>Zona de peligro</h3>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm" style={{ color: "#1A1A2E" }}>Eliminar cuenta</p>
                <p className="text-xs mt-0.5" style={{ color: "#9B8EC4" }}>Esta acción es irreversible. Todos tus datos serán eliminados.</p>
              </div>
              <button
                className="px-5 py-2.5 rounded-full text-sm font-semibold border transition-all hover:opacity-90"
                style={{ borderColor: "#DC2626", color: "#DC2626", backgroundColor: "white" }}
              >
                Eliminar cuenta
              </button>
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
