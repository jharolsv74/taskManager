import React, { useState } from "react";
import axios from "axios";

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messageType, setMessageType] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    
    try {
        console.log("Enviando login a:", `${process.env.REACT_APP_API_URL}/api/usuarios/login`);
        console.log("Datos enviados:", { email, password: "***" });
        
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/usuarios/login`, {
        email,
        password,
        });

        console.log("Respuesta completa del login:", response);

      if (response.status === 200) {
        setMessage("¡Bienvenido! Login exitoso 🎉");
        setMessageType("success");
        // El backend devuelve el token directamente como string
        console.log("Token recibido:", response.data);
        localStorage.setItem("token", response.data);
        
        // Simular redirección después de 2 segundos
        setTimeout(() => {
          setMessage("Redirigiendo...");
          setTimeout(() => {
            onLoginSuccess();
          }, 1000);
        }, 2000);
      }
    } catch (error) {
      console.error("Error completo en login:", error);
      console.error("Error response:", error.response);
      setMessage("❌ Credenciales incorrectas. Inténtalo de nuevo.");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

return (
    <div style={{ 
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
        <div style={{ 
            maxWidth: "420px", 
            width: "90%",
            padding: "40px",
            borderRadius: "20px",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)"
        }}>
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
                <div style={{
                    width: "80px",
                    height: "80px",
                    backgroundColor: "#667eea",
                    borderRadius: "50%",
                    margin: "0 auto 20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "36px",
                    color: "white"
                }}>
                    👤
                </div>
                <h2 style={{ 
                    margin: "0",
                    color: "#2d3748",
                    fontSize: "28px",
                    fontWeight: "700"
                }}>Iniciar Sesión</h2>
                <p style={{
                    color: "#718096",
                    fontSize: "16px",
                    margin: "8px 0 0 0"
                }}>Ingresa tus credenciales para continuar</p>
            </div>
        <form onSubmit={handleLogin}>
            <div style={{ marginBottom: "25px" }}>
                <label style={{ 
                    display: "block", 
                    marginBottom: "10px",
                    fontWeight: "600",
                    color: "#2d3748",
                    fontSize: "14px"
                }}>📧 Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    style={{
                        width: "100%",
                        padding: "16px",
                        border: "2px solid #e2e8f0",
                        borderRadius: "12px",
                        fontSize: "16px",
                        outline: "none",
                        transition: "all 0.3s ease",
                        backgroundColor: isLoading ? "#f7fafc" : "#fff",
                        boxSizing: "border-box"
                    }}
                    onFocus={(e) => {
                        e.target.style.borderColor = "#667eea";
                        e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = "#e2e8f0";
                        e.target.style.boxShadow = "none";
                    }}
                    placeholder="tu@email.com"
                />
            </div>
            <div style={{ marginBottom: "30px" }}>
                <label style={{ 
                    display: "block", 
                    marginBottom: "10px",
                    fontWeight: "600",
                    color: "#2d3748",
                    fontSize: "14px"
                }}>🔒 Contraseña</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    style={{
                        width: "100%",
                        padding: "16px",
                        border: "2px solid #e2e8f0",
                        borderRadius: "12px",
                        fontSize: "16px",
                        outline: "none",
                        transition: "all 0.3s ease",
                        backgroundColor: isLoading ? "#f7fafc" : "#fff",
                        boxSizing: "border-box"
                    }}
                    onFocus={(e) => {
                        e.target.style.borderColor = "#667eea";
                        e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = "#e2e8f0";
                        e.target.style.boxShadow = "none";
                    }}
                    placeholder="••••••••"
                />
            </div>
            <button 
                type="submit"
                disabled={isLoading}
                style={{
                    width: "100%",
                    padding: "16px",
                    backgroundColor: isLoading ? "#a0aec0" : "#667eea",
                    color: "white",
                    border: "none",
                    borderRadius: "12px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: isLoading ? "not-allowed" : "pointer",
                    transition: "all 0.3s ease",
                    position: "relative",
                    overflow: "hidden"
                }}
                onMouseOver={(e) => {
                    if (!isLoading) {
                        e.target.style.backgroundColor = "#5a67d8";
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.boxShadow = "0 10px 20px rgba(102, 126, 234, 0.3)";
                    }
                }}
                onMouseOut={(e) => {
                    if (!isLoading) {
                        e.target.style.backgroundColor = "#667eea";
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "none";
                    }
                }}
            >
                {isLoading ? (
                    <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{
                            width: "20px",
                            height: "20px",
                            border: "2px solid #ffffff40",
                            borderTop: "2px solid #ffffff",
                            borderRadius: "50%",
                            animation: "spin 1s linear infinite",
                            marginRight: "10px"
                        }}></span>
                        Iniciando sesión...
                    </span>
                ) : "✨ Ingresar"}
            </button>
        </form>
        {message && (
            <div style={{
                marginTop: "25px",
                padding: "16px",
                borderRadius: "12px",
                textAlign: "center",
                fontWeight: "600",
                fontSize: "14px",
                backgroundColor: messageType === "success" ? "#f0fff4" : "#fed7d7",
                color: messageType === "success" ? "#38a169" : "#e53e3e",
                border: `2px solid ${messageType === "success" ? "#9ae6b4" : "#feb2b2"}`,
                animation: "fadeIn 0.5s ease-in",
                position: "relative",
                overflow: "hidden"
            }}>
                <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    backgroundColor: messageType === "success" ? "#38a169" : "#e53e3e",
                    opacity: 0.1,
                    width: messageType === "success" ? "100%" : "0%",
                    transition: "width 2s ease-in-out"
                }}></div>
                <div style={{ position: "relative", zIndex: 1 }}>
                    {message}
                </div>
            </div>
        )}
        
        <style>
            {`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                input::placeholder {
                    color: #a0aec0;
                }
            `}
        </style>
        </div>
    </div>
);
};

export default Login;
