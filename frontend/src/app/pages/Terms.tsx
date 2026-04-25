import { FileText } from "lucide-react";
import Sidebar from "../components/Sidebar";
import AvatarDropdown from "../components/AvatarDropdown";

const sections = [
  {
    title: "1. Aceptación de los términos",
    content:
      "Al acceder y utilizar DevHub, aceptas quedar vinculado por estos Términos de Uso. Si no estás de acuerdo con alguna parte de estos términos, no podrás acceder al servicio. DevHub es una plataforma beta desarrollada como proyecto de fin de ciclo del Grado Superior de Desarrollo de Aplicaciones Web (DAW).",
  },
  {
    title: "2. Descripción del servicio",
    content:
      "DevHub es una red social para desarrolladores que permite publicar proyectos, conectar con otros profesionales del sector y recibir feedback de la comunidad. El servicio se ofrece de forma gratuita y puede estar sujeto a cambios, interrupciones o discontinuaciones sin previo aviso al tratarse de una versión beta.",
  },
  {
    title: "3. Registro y cuenta de usuario",
    content:
      "Para utilizar DevHub debes registrarte con un email válido y un nombre de usuario único. Eres responsable de mantener la confidencialidad de tu contraseña y de todas las actividades que ocurran bajo tu cuenta. Debes notificarnos inmediatamente si sospechas de cualquier uso no autorizado de tu cuenta.",
  },
  {
    title: "4. Contenido del usuario",
    content:
      "Al publicar proyectos o contenido en DevHub, garantizas que tienes los derechos necesarios sobre dicho contenido. No está permitido publicar contenido ilegal, ofensivo, que infrinja derechos de terceros o que contenga malware. DevHub se reserva el derecho de eliminar cualquier contenido que viole estas normas.",
  },
  {
    title: "5. Propiedad intelectual",
    content:
      "El código, diseño e identidad visual de DevHub son propiedad de sus creadores. Los proyectos publicados por los usuarios mantienen la propiedad intelectual de sus autores. DevHub no reclama ningún derecho de propiedad sobre el contenido que publicas en la plataforma.",
  },
  {
    title: "6. Privacidad y datos",
    content:
      "DevHub almacena únicamente los datos necesarios para el funcionamiento de la plataforma: nombre, username, email y contraseña cifrada. No vendemos ni compartimos tus datos con terceros. Las contraseñas se almacenan cifradas mediante bcrypt y nunca en texto plano.",
  },
  {
    title: "7. Limitación de responsabilidad",
    content:
      "DevHub se proporciona 'tal cual', sin garantías de ningún tipo. No somos responsables de pérdidas de datos, interrupciones del servicio o daños derivados del uso de la plataforma. Al ser un proyecto beta educativo, pueden existir errores o comportamientos inesperados.",
  },
  {
    title: "8. Modificaciones",
    content:
      "Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor en el momento de su publicación. El uso continuado de DevHub tras la publicación de cambios implica la aceptación de los nuevos términos.",
  },
  {
    title: "9. Contacto",
    content:
      "Si tienes alguna pregunta sobre estos Términos de Uso puedes contactarnos a través del repositorio oficial del proyecto en GitHub: github.com/PRW-DAW/DevHub.",
  },
];

export default function Terms() {
  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#F0EEFA" }}>
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        {/* Barra de color superior */}
        <div style={{ height: "2px", background: "linear-gradient(90deg, #7C3AED 0%, #A78BFA 100%)" }} />

        {/* Header */}
        <div className="bg-white shadow-sm border-b sticky top-0 z-10" style={{ borderColor: "#EDE9FA" }}>
          <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold" style={{ color: "#1A1A2E" }}>Términos de Uso</h2>
              <p className="mt-1" style={{ color: "#9B8EC4" }}>// Última actualización: abril 2026</p>
            </div>
            <AvatarDropdown />
          </div>
        </div>

        {/* Contenido */}
        <div className="max-w-4xl mx-auto px-8 py-10">

          {/* Intro card */}
          <div className="bg-white rounded-xl p-6 border mb-8 flex items-start gap-4"
            style={{ borderColor: "#EDE9FA", boxShadow: "0 2px 12px rgba(124,58,237,0.06)", borderLeft: "4px solid #7C3AED" }}>
            <div className="p-3 rounded-lg flex-shrink-0" style={{ backgroundColor: "#EDE9FA" }}>
              <FileText style={{ color: "#7C3AED" }} size={24} />
            </div>
            <div>
              <p className="font-semibold mb-1" style={{ color: "#1A1A2E" }}>Bienvenido a DevHub</p>
              <p className="text-sm leading-relaxed" style={{ color: "#6B6880" }}>
                Por favor, lee atentamente estos términos antes de utilizar la plataforma.
                Al registrarte o acceder a DevHub, aceptas los términos y condiciones descritos a continuación.
              </p>
            </div>
          </div>

          {/* Secciones */}
          <div className="space-y-4">
            {sections.map((section) => (
              <div
                key={section.title}
                className="bg-white rounded-xl p-6 border"
                style={{ borderColor: "#EDE9FA", boxShadow: "0 2px 12px rgba(124,58,237,0.06)" }}
              >
                <h3 className="text-base font-bold mb-3" style={{ color: "#7C3AED" }}>
                  {section.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6B6880" }}>
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs" style={{ color: "#9B8EC4" }}>
              // DevHub β — Proyecto de fin de ciclo DAW 2025/2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
