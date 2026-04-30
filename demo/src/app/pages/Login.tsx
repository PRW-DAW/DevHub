import { useState } from "react";
import { useNavigate } from "react-router";
import { Code, Star, Users, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/feed");
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#F0EEFA" }}>
      {/* Left Side */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden bg-white">
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
            opacity: 0.35,
          }}
        >
          <source src="/login.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 max-w-2xl px-12 py-16">
          {/* Logo */}
          <div className="mb-10">
            <img
              src="/de-lado.svg"
              alt="DevHub Logo"
              style={{ height: "90px", width: "auto" }}
            />
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
          <div className="space-y-6 mb-12">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg" style={{ backgroundColor: "#EDE9FA" }}>
                <Code style={{ color: "#7C3AED" }} size={28} />
              </div>
              <p className="text-lg font-medium" style={{ color: "#1A1A2E" }}>Muestra tus proyectos</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg" style={{ backgroundColor: "#EDE9FA" }}>
                <Star style={{ color: "#7C3AED" }} size={28} />
              </div>
              <p className="text-lg font-medium" style={{ color: "#1A1A2E" }}>Recibe feedback valioso</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg" style={{ backgroundColor: "#EDE9FA" }}>
                <Users style={{ color: "#7C3AED" }} size={28} />
              </div>
              <p className="text-lg font-medium" style={{ color: "#1A1A2E" }}>Conecta con la comunidad</p>
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
              <span>β</span>
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
              <span>#</span>
              <span>Para Developers</span>
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
                }}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: "#1A1A2E" }}>
                PASSWORD
              </label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                  style={{ borderColor: "#EDE9FA" }} required />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "#9B8EC4" }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
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
