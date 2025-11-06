// src/components/Breadcrumb.tsx
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

type Theme = "bootstrap" | "tailwind" | "material";

interface BreadcrumbProps {
  drawerWidth?: number;
  sidebarOpen?: boolean;
  toggleDrawer?: () => void;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  drawerWidth = 250,
  sidebarOpen = true,
  toggleDrawer,
}) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  const [theme, setTheme] = useState<Theme>(
    (localStorage.getItem("theme") as Theme) || "bootstrap"
  );

  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const pathLabels: Record<string, string> = {
    user: "Usuarios",
    device: "Dispositivos",
    digitalSignature: "Firmas Digitales",
    securityQuestion: "Preguntas de Seguridad",
    answer: "Respuestas",
    list: "Listado",
    create: "Crear",
    update: "Editar",
  };

  return (
    <>
      {/* Header estilo navbar */}
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-success fixed-top shadow-sm"
        style={{
          width: sidebarOpen ? `calc(100% - ${drawerWidth}px)` : "100%",
          marginLeft: sidebarOpen ? `${drawerWidth}px` : 0,
          transition: "width 0.3s",
          zIndex: 1000,
        }}
      >
        <div className="container-fluid">
          {toggleDrawer && (
            <button
              className="btn btn-outline-light me-3"
              onClick={toggleDrawer}
            >
              <i className="bi bi-list"></i>
            </button>
          )}

          <span className="navbar-brand fw-semibold">
            Sistema de Seguridad
          </span>


          {/* Selector de tema (Bootstrap, Tailwind, Material) */}
          
        </div>
      </nav>
    <div style={{ paddingTop: "70px" }}>
      {/* Tu contenido debajo del navbar */}
    </div>  
    </>
  );
};

export default Breadcrumb;
