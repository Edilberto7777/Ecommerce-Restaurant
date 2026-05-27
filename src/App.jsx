// Importamos las herramientas que vamos a usar
import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { Layout } from '../components/layout/Main_Layout';
import { Formulario } from '../components/layout/Formulario';

// Creamos un "contexto" para saber si el usuario está logueado o no
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

function App() {
  const location = useLocation();

  // ✅ Aquí dentro van los hooks
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [telefono, setTelefono] = useState("");
  const [municipioActivo, setMunicipioActivo] = useState("");
  const [contador, setContador] = useState(1);
  const [precioMensajeria, setPrecioMensajeria] = useState(0);

  const municipiosHabana = [
    'Habana Vieja', 'Centro Habana', 'Vedado', 'Playa',
    'Marianao', '10 de Octubre', 'Regla', 'Morro'
  ];

  const gestorPrecioMensajeria = (municipio) => {
    switch (municipio) {
      case 'Habana Vieja': return 600;
      case 'Centro Habana': return 300;
      case 'Vedado': return 600;
      case 'Playa': return 1000;
      case 'Marianao': return 1500;
      default: return 0;
    }
  };

  return (
    <AnimatePresence mode="sync">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <Layout
            usuario={usuario}
            telefono={telefono}
            municipioActivo={municipioActivo}
            contador={contador}
            precioMensajeria={precioMensajeria}
          />
        } />

        <Route path="/login" element={
          <Formulario
            cantContenido={2}
            usuario={usuario} setUsuario={setUsuario}
            password={password} setPassword={setPassword}
            telefono={telefono} setTelefono={setTelefono}
            municipioActivo={municipioActivo} setMunicipioActivo={setMunicipioActivo}
            contador={contador} setContador={setContador}
            precioMensajeria={precioMensajeria} setPrecioMensajeria={setPrecioMensajeria}
            municipiosHabana={municipiosHabana}
            gestorPrecioMensajeria={gestorPrecioMensajeria}
          />
        } />

        <Route path="/registro" element={
          <Formulario
            cantContenido={4}
            usuario={usuario} setUsuario={setUsuario}
            password={password} setPassword={setPassword}
            telefono={telefono} setTelefono={setTelefono}
            municipioActivo={municipioActivo} setMunicipioActivo={setMunicipioActivo}
            contador={contador} setContador={setContador}
            precioMensajeria={precioMensajeria} setPrecioMensajeria={setPrecioMensajeria}
            municipiosHabana={municipiosHabana}
            gestorPrecioMensajeria={gestorPrecioMensajeria}
          />
        } />
      </Routes>
    </AnimatePresence>
  );
}

export default function Root() {
  return (
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  );
}
