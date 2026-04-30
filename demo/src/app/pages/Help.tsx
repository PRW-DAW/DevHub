import { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, MessageCircle, BookOpen, ExternalLink } from "lucide-react";
import Sidebar from "../components/Sidebar";
import AvatarDropdown from "../components/AvatarDropdown";

const faqs = [
  {
    question: "¿Cómo publico un proyecto?",
    answer:
      "Desde el Feed, pulsa el botón '+' o el área 'Publica tu primer proyecto'. Se abrirá un modal donde puedes introducir el título, descripción, tecnologías usadas y el enlace a GitHub o a producción.",
  },
  {
    question: "¿Cómo sigo a otros desarrolladores?",
    answer:
      "Ve a la sección 'Conectar' en el menú lateral. Allí verás una lista de todos los usuarios registrados. Pulsa el botón 'Seguir' en la tarjeta del usuario que te interese.",
  },
  {
    question: "¿Puedo editar o borrar un proyecto?",
    answer:
      "Sí, desde tu perfil puedes ver todos tus proyectos publicados. En cada tarjeta encontrarás las opciones para editar o eliminar el proyecto. Solo puedes modificar tus propios proyectos.",
  },
  {
    question: "¿Qué es la fortaleza del perfil?",
    answer:
      "Es un indicador visual que muestra qué tan completo está tu perfil. Para mejorarla, añade una foto de perfil, una bio y publica al menos un proyecto. Actualmente es un indicador estático en fase beta.",
  },
  {
    question: "¿Cómo funciona el sistema de valoraciones?",
    answer:
      "Cada proyecto tiene un sistema de estrellas (1-5) que permite valorarlo. Esta funcionalidad está en desarrollo en la versión actual beta y las valoraciones aún no se persisten en la base de datos.",
  },
  {
    question: "¿Por qué no puedo acceder al perfil de otro usuario?",
    answer:
      "Esta funcionalidad está siendo mejorada en la versión actual. Asegúrate de estar autenticado. Si el problema persiste, prueba a cerrar sesión y volver a entrar.",
  },
  {
    question: "¿Mis datos están seguros?",
    answer:
      "Sí. Las contraseñas se almacenan cifradas con bcrypt y nunca en texto plano. No compartimos tus datos con terceros. Puedes consultar nuestros Términos de Uso para más información.",
  },
  {
    question: "¿Cómo cierro sesión?",
    answer:
      "Pulsa en tu avatar en la esquina superior derecha y selecciona 'Cerrar Sesión' en el menú desplegable. Tu token de sesión será eliminado de forma segura.",
  },
];

const resources = [
  {
    icon: BookOpen,
    title: "Documentación",
    description: "Consulta la memoria técnica del proyecto con toda la arquitectura y decisiones de diseño.",
    link: "#",
    label: "Ver documentación",
  },
  {
    icon: ExternalLink,
    title: "Repositorio GitHub",
    description: "Accede al código fuente completo del proyecto, reporta bugs o contribuye al desarrollo.",
    link: "https://github.com/PRW-DAW/DevHub",
    label: "Ver en GitHub",
  },
  {
    icon: MessageCircle,
    title: "Reportar un problema",
    description: "¿Encontraste un bug? Abre un issue en GitHub y lo revisaremos lo antes posible.",
    link: "https://github.com/PRW-DAW/DevHub/issues",
    label: "Abrir issue",
  },
];

export default function Help() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
              <h2 className="text-2xl font-bold" style={{ color: "#1A1A2E" }}>Ayuda</h2>
              <p className="mt-1" style={{ color: "#9B8EC4" }}>// Preguntas frecuentes y recursos</p>
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
              <HelpCircle style={{ color: "#7C3AED" }} size={24} />
            </div>
            <div>
              <p className="font-semibold mb-1" style={{ color: "#1A1A2E" }}>¿En qué podemos ayudarte?</p>
              <p className="text-sm leading-relaxed" style={{ color: "#6B6880" }}>
                Aquí encontrarás las respuestas a las preguntas más frecuentes sobre DevHub.
                Si no encuentras lo que buscas, puedes reportarlo directamente en GitHub.
              </p>
            </div>
          </div>

          {/* FAQ */}
          <h3 className="text-lg font-bold mb-4" style={{ color: "#1A1A2E" }}>
            Preguntas frecuentes
          </h3>
          <div className="space-y-3 mb-10">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border overflow-hidden transition-all"
                style={{ borderColor: openIndex === index ? "#7C3AED" : "#EDE9FA", boxShadow: "0 2px 12px rgba(124,58,237,0.06)" }}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <span className="font-semibold text-sm" style={{ color: "#1A1A2E" }}>{faq.question}</span>
                  {openIndex === index
                    ? <ChevronUp size={18} style={{ color: "#7C3AED", flexShrink: 0 }} />
                    : <ChevronDown size={18} style={{ color: "#9B8EC4", flexShrink: 0 }} />
                  }
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4 border-t" style={{ borderColor: "#EDE9FA" }}>
                    <p className="text-sm leading-relaxed pt-3" style={{ color: "#6B6880" }}>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Recursos */}
          <h3 className="text-lg font-bold mb-4" style={{ color: "#1A1A2E" }}>
            Recursos útiles
          </h3>
          <div className="grid grid-cols-3 gap-4 mb-10">
            {resources.map((resource) => (
              <div
                key={resource.title}
                className="bg-white rounded-xl p-6 border flex flex-col gap-3"
                style={{ borderColor: "#EDE9FA", boxShadow: "0 2px 12px rgba(124,58,237,0.06)" }}
              >
                <div className="p-3 rounded-lg w-fit" style={{ backgroundColor: "#EDE9FA" }}>
                  <resource.icon style={{ color: "#7C3AED" }} size={22} />
                </div>
                <p className="font-semibold text-sm" style={{ color: "#1A1A2E" }}>{resource.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: "#6B6880" }}>{resource.description}</p>
                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold mt-auto"
                  style={{ color: "#7C3AED" }}
                >
                  {resource.label} →
                </a>
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
