// Importamos las herramientas que vamos a usar
import '../src/estilos/App.css'
import { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { municipiosHabana, gestorPrecioMensajeria } from './utilidades/gestionMunicipio.js'
import { Layout } from './componentes/diseno/Main_Layout.jsx'; 
import { Formulario } from './componentes/diseno/Formulario.jsx';

// Creamos un "contexto" para saber si el usuario está logueado o no
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn}}>
      {children}
    </AuthContext.Provider>
  );
}

export const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [adminLoggueada, setAdminLoggueada] = useState(false);

  return (
    <AdminContext.Provider value={{ adminLoggueada, setAdminLoggueada }}>
      {children}
    </AdminContext.Provider>
  );
}

function App() {
  const location = useLocation();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [telefono, setTelefono] = useState("");
  const [municipioActivo, setMunicipioActivo] = useState("");
  const [contador, setContador] = useState(1);
  const [precioMensajeria, setPrecioMensajeria] = useState(0);

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
        <AdminProvider>
          <App />
          </AdminProvider>
      </AuthProvider>
    </Router>
  );
}
