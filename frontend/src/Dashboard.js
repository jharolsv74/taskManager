import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = ({ onLogout }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      setError("No hay token de autenticación");
      return;
    }

    try {
      setLoading(true);
      setError(""); // Limpiar errores previos
      
      console.log("Token encontrado:", token); // Debug
      
      // Configuración de headers para autenticación
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      console.log("Headers enviados:", config.headers); // Debug
      console.log("URL completa usuarios:", `${process.env.REACT_APP_API_URL}/api/usuarios`); // Debug

      console.log("Haciendo llamada a /api/usuarios..."); // Debug
      
      // Llamada para obtener usuarios
      const usuariosResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/usuarios`, config);
      console.log("Respuesta usuarios:", usuariosResponse.data); // Debug
      setUsuarios(Array.isArray(usuariosResponse.data) ? usuariosResponse.data : []);
      
      // Obtener el ID del usuario actual
      // Intentemos diferentes formas de obtener el usuario actual
      let currentUser = null;
      
      if (usuariosResponse.data && Array.isArray(usuariosResponse.data) && usuariosResponse.data.length > 0) {
        currentUser = usuariosResponse.data[0]; // Tomar el primer usuario por ahora
      } else if (usuariosResponse.data && !Array.isArray(usuariosResponse.data)) {
        currentUser = usuariosResponse.data; // Si es un objeto único
      }
      
      if (currentUser) {
        setUserInfo(currentUser);
        console.log("Usuario actual:", currentUser); // Debug
        
        // Llamada para obtener tareas del usuario
        const userId = currentUser.id || currentUser.usuarioId || currentUser.idUsuario;
        if (userId) {
          console.log(`Haciendo llamada a /api/tareas/usuario/${userId}...`); // Debug
          const tareasResponse = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/tareas/usuario/${userId}`, 
            config
          );
          console.log("Respuesta tareas:", tareasResponse.data); // Debug
          setTareas(Array.isArray(tareasResponse.data) ? tareasResponse.data : []);
        } else {
          console.error("No se pudo encontrar el ID del usuario");
          setError("No se pudo obtener el ID del usuario");
        }
      } else {
        setError("No se pudo obtener información del usuario");
      }
      
    } catch (error) {
      console.error("Error completo:", error); // Debug mejorado
      console.error("Error response:", error.response); // Debug response
      
      let errorMessage = "Error al cargar los datos: ";
      
      if (error.response) {
        // El servidor respondió con un código de error
        errorMessage += `${error.response.status} - ${error.response.data?.message || error.response.statusText}`;
        
        // Si es error 401, el token podría estar vencido
        if (error.response.status === 401) {
          errorMessage = "Token de autenticación inválido o vencido. Por favor, inicia sesión nuevamente.";
          localStorage.removeItem("token");
          setTimeout(() => onLogout(), 2000);
        }
      } else if (error.request) {
        // La petición se hizo pero no hubo respuesta
        errorMessage += "No se pudo conectar con el servidor. Verifica que el backend esté ejecutándose.";
      } else {
        // Algo más pasó
        errorMessage += error.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const testAPI = async () => {
    const token = localStorage.getItem("token");
    console.log("=== TEST API ===");
    console.log("Token:", token);
    
    try {
      // Probar con autenticación
      console.log("Probando endpoint con autenticación...");
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/usuarios`, config);
      console.log("Respuesta exitosa:", response);
      
    } catch (error) {
      console.log("Error en test:", error);
      console.log("Response data:", error.response?.data);
      console.log("Response status:", error.response?.status);
      console.log("Response headers:", error.response?.headers);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogout();
  };

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <div style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "20px",
          textAlign: "center",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
        }}>
          <div style={{
            width: "50px",
            height: "50px",
            border: "4px solid #f3f3f3",
            borderTop: "4px solid #667eea",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 20px"
          }}></div>
          <h3 style={{ color: "#2d3748", margin: 0 }}>Cargando datos...</h3>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "20px",
      fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        padding: "20px",
        borderRadius: "15px",
        backdropFilter: "blur(10px)"
      }}>
        <div>
          <h1 style={{ color: "white", margin: 0, fontSize: "28px" }}>
            🏠 Dashboard - Task Manager
          </h1>
          {userInfo && (
            <p style={{ color: "rgba(255, 255, 255, 0.8)", margin: "5px 0 0 0" }}>
              Bienvenido, {userInfo.nombre || userInfo.email}!
            </p>
          )}
        </div>
        <button
          onClick={handleLogout}
          style={{
            padding: "12px 24px",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            color: "white",
            border: "2px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "600",
            transition: "all 0.3s ease",
            marginLeft: "10px"
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
          }}
        >
          🚪 Cerrar Sesión
        </button>
        <button
          onClick={fetchData}
          disabled={loading}
          style={{
            padding: "12px 24px",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            color: "white",
            border: "2px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "10px",
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: "600",
            transition: "all 0.3s ease",
            opacity: loading ? 0.6 : 1
          }}
          onMouseOver={(e) => {
            if (!loading) {
              e.target.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
            }
          }}
          onMouseOut={(e) => {
            if (!loading) {
              e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
            }
          }}
        >
          🔄 Actualizar
        </button>
        <button
          onClick={testAPI}
          style={{
            padding: "12px 24px",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            color: "white",
            border: "2px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "600",
            transition: "all 0.3s ease",
            marginLeft: "10px"
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
          }}
        >
          🧪 Test API
        </button>
      </div>

      {error && (
        <div style={{
          backgroundColor: "#fed7d7",
          color: "#e53e3e",
          padding: "16px",
          borderRadius: "12px",
          marginBottom: "20px",
          border: "2px solid #feb2b2"
        }}>
          ❌ {error}
        </div>
      )}

      {/* Panel de Debug */}
      <div style={{
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        padding: "20px",
        borderRadius: "15px",
        marginBottom: "20px",
        backdropFilter: "blur(10px)"
      }}>
        <h3 style={{ color: "white", margin: "0 0 15px 0", fontSize: "18px" }}>
          🔧 Información de Debug
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "15px" }}>
          <div style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            padding: "15px",
            borderRadius: "10px"
          }}>
            <div style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "14px", marginBottom: "5px" }}>
              Token presente:
            </div>
            <div style={{ color: "white", fontWeight: "600" }}>
              {localStorage.getItem("token") ? "✅ Sí" : "❌ No"}
            </div>
          </div>
          
          <div style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            padding: "15px",
            borderRadius: "10px"
          }}>
            <div style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "14px", marginBottom: "5px" }}>
              Estado de carga:
            </div>
            <div style={{ color: "white", fontWeight: "600" }}>
              {loading ? "🔄 Cargando..." : "✅ Completado"}
            </div>
          </div>
          
          <div style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            padding: "15px",
            borderRadius: "10px"
          }}>
            <div style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "14px", marginBottom: "5px" }}>
              Usuarios encontrados:
            </div>
            <div style={{ color: "white", fontWeight: "600" }}>
              {usuarios.length} usuarios
            </div>
          </div>
          
          <div style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            padding: "15px",
            borderRadius: "10px"
          }}>
            <div style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "14px", marginBottom: "5px" }}>
              API Base URL:
            </div>
            <div style={{ color: "white", fontWeight: "600", fontSize: "12px" }}>
              {process.env.REACT_APP_API_URL || "No configurada"}
            </div>
          </div>
          
          <div style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            padding: "15px",
            borderRadius: "10px"
          }}>
            <div style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "14px", marginBottom: "5px" }}>
              Último error:
            </div>
            <div style={{ color: "white", fontWeight: "600", fontSize: "12px" }}>
              {error ? "❌ Ver consola" : "✅ Sin errores"}
            </div>
          </div>
        </div>
        
        {localStorage.getItem("token") && (
          <details style={{ marginTop: "15px" }}>
            <summary style={{ color: "white", cursor: "pointer", marginBottom: "10px" }}>
              Ver token (click para expandir)
            </summary>
            <div style={{
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              padding: "10px",
              borderRadius: "8px",
              color: "white",
              fontSize: "12px",
              wordBreak: "break-all",
              fontFamily: "monospace"
            }}>
              {localStorage.getItem("token")}
            </div>
          </details>
        )}
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
        gap: "30px",
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        
        {/* Card de Usuarios */}
        <div style={{
          backgroundColor: "white",
          borderRadius: "20px",
          padding: "30px",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "25px"
          }}>
            <div style={{
              width: "50px",
              height: "50px",
              backgroundColor: "#4299e1",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "15px"
            }}>
              <span style={{ fontSize: "24px" }}>👥</span>
            </div>
            <div>
              <h3 style={{ margin: 0, color: "#2d3748", fontSize: "20px" }}>
                Usuarios del Sistema
              </h3>
              <p style={{ margin: "5px 0 0 0", color: "#718096", fontSize: "14px" }}>
                Endpoint: /api/usuarios
              </p>
            </div>
          </div>
          
          <div style={{
            backgroundColor: "#f7fafc",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "15px"
          }}>
            <strong style={{ color: "#2d3748" }}>Total: {usuarios.length} usuarios</strong>
          </div>
          
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            {usuarios.map((usuario, index) => (
              <div key={usuario.id || index} style={{
                padding: "15px",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                marginBottom: "10px",
                backgroundColor: "#fff"
              }}>
                <div style={{ fontWeight: "600", color: "#2d3748", marginBottom: "5px" }}>
                  {usuario.nombre || "Sin nombre"}
                </div>
                <div style={{ color: "#718096", fontSize: "14px" }}>
                  📧 {usuario.email}
                </div>
                {usuario.id && (
                  <div style={{ color: "#718096", fontSize: "12px", marginTop: "5px" }}>
                    ID: {usuario.id}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Card de Tareas */}
        <div style={{
          backgroundColor: "white",
          borderRadius: "20px",
          padding: "30px",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "25px"
          }}>
            <div style={{
              width: "50px",
              height: "50px",
              backgroundColor: "#48bb78",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "15px"
            }}>
              <span style={{ fontSize: "24px" }}>📝</span>
            </div>
            <div>
              <h3 style={{ margin: 0, color: "#2d3748", fontSize: "20px" }}>
                Mis Tareas
              </h3>
              <p style={{ margin: "5px 0 0 0", color: "#718096", fontSize: "14px" }}>
                Endpoint: /api/tareas/usuario/{userInfo?.id || 'ID'}
              </p>
            </div>
          </div>
          
          <div style={{
            backgroundColor: "#f0fff4",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "15px"
          }}>
            <strong style={{ color: "#2d3748" }}>Total: {tareas.length} tareas</strong>
          </div>
          
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            {tareas.length > 0 ? (
              tareas.map((tarea, index) => (
                <div key={tarea.id || index} style={{
                  padding: "15px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  marginBottom: "10px",
                  backgroundColor: "#fff"
                }}>
                  <div style={{ fontWeight: "600", color: "#2d3748", marginBottom: "5px" }}>
                    {tarea.titulo || tarea.nombre || "Sin título"}
                  </div>
                  {tarea.descripcion && (
                    <div style={{ color: "#718096", fontSize: "14px", marginBottom: "5px" }}>
                      {tarea.descripcion}
                    </div>
                  )}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    {tarea.estado && (
                      <span style={{
                        padding: "4px 8px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: "600",
                        backgroundColor: tarea.estado === "COMPLETADA" ? "#c6f6d5" : "#fed7d7",
                        color: tarea.estado === "COMPLETADA" ? "#22543d" : "#742a2a"
                      }}>
                        {tarea.estado}
                      </span>
                    )}
                    {tarea.id && (
                      <span style={{ color: "#718096", fontSize: "12px" }}>
                        ID: {tarea.id}
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div style={{
                textAlign: "center",
                color: "#718096",
                padding: "40px",
                fontStyle: "italic"
              }}>
                📋 No tienes tareas asignadas aún
              </div>
            )}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Dashboard;