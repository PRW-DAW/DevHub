import { useState } from "react";
import { useNavigate } from "react-router";
import { Code, Star, Users } from "lucide-react";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/feed");
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#F0EEFA" }}>
      {/* Left Side */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden bg-white">
        
        <div className="relative z-10 max-w-2xl px-12">
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-5xl font-bold mb-2" style={{ color: "#7C3AED" }}>
              &lt; / &gt; DEVHUB
            </h1>
          </div>

          {/* Title */}
          <h2 className="text-5xl font-bold mb-4" style={{ color: "#1A1A2E" }}>
            Tu portafolio{" "}
            <span style={{ color: "#7C3AED" }}>profesional</span>
          </h2>

          {/* Subtitle */}
          <p className="text-xl mb-12" style={{ color: "#6B6880" }}>
            Conecta, comparte y crece con otros developers
          </p>

          {/* Features */}
          <div className="space-y-6 mb-16">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg" style={{ backgroundColor: "#EDE9FA" }}>
                <Code style={{ color: "#7C3AED" }} size={24} />
              </div>
              <p className="text-lg" style={{ color: "#1A1A2E" }}>Muestra tus proyectos</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg" style={{ backgroundColor: "#EDE9FA" }}>
                <Star style={{ color: "#7C3AED" }} size={24} />
              </div>
              <p className="text-lg" style={{ color: "#1A1A2E" }}>Recibe feedback valioso</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg" style={{ backgroundColor: "#EDE9FA" }}>
                <Users style={{ color: "#7C3AED" }} size={24} />
              </div>
              <p className="text-lg" style={{ color: "#1A1A2E" }}>Conecta con la comunidad</p>
            </div>
          </div>

          {/* Context Badges */}
          <div className="flex gap-4">
            <div 
              className="px-5 py-3 rounded-full border flex items-center gap-2 font-medium"
              style={{ 
                backgroundColor: "#EDE9FA",
                borderColor: "#DDD6FE",
                color: "#7C3AED"
              }}
            >
              <span>⚡</span>
              <span>Proyecto Beta</span>
            </div>
            <div 
              className="px-5 py-3 rounded-full border flex items-center gap-2 font-medium"
              style={{ 
                backgroundColor: "#EDE9FA",
                borderColor: "#DDD6FE",
                color: "#7C3AED"
              }}
            >
              <span>🎓</span>
              <span>Hecho en DAW</span>
            </div>
            <div 
              className="px-5 py-3 rounded-full border flex items-center gap-2 font-medium"
              style={{ 
                backgroundColor: "#EDE9FA",
                borderColor: "#DDD6FE",
                color: "#7C3AED"
              }}
            >
              <span>✓</span>
              <span>Acceso Gratuito</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-[500px] flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white rounded-xl p-8 border" style={{ 
          borderColor: "#EDE9FA",
          boxShadow: "0 2px 12px rgba(124,58,237,0.06)"
        }}>
          {/* Tabs */}
          <div className="flex gap-2 mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 px-6 rounded-full font-semibold transition-all ${
                isLogin
                  ? "text-white"
                  : "bg-white border"
              }`}
              style={isLogin ? { backgroundColor: "#7C3AED", color: "white" } : { color: "#6B6880", borderColor: "#EDE9FA" }}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 px-6 rounded-full font-semibold transition-all ${
                !isLogin
                  ? "text-white"
                  : "bg-white border"
              }`}
              style={!isLogin ? { backgroundColor: "#7C3AED", color: "white" } : { color: "#6B6880", borderColor: "#EDE9FA" }}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: "#1A1A2E" }}>
                EMAIL
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="dev@devhub.com"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ 
                  borderColor: "#EDE9FA",
                  focusRingColor: "#7C3AED",
                }}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: "#1A1A2E" }}>
                PASSWORD
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ 
                  borderColor: "#EDE9FA",
                  focusRingColor: "#7C3AED",
                }}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full font-semibold text-white text-lg transition-all hover:opacity-90"
              style={{ backgroundColor: "#7C3AED" }}
            >
              Entrar →
            </button>

            <div className="text-center">
              <span style={{ color: "#6B6880" }}>¿Primera vez aquí? </span>
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className="font-semibold"
                style={{ color: "#7C3AED" }}
              >
                Regístrate
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
