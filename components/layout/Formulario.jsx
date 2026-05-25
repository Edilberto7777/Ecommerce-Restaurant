import './formulario.css';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { AuthContext } from '../../src/App';
import { useNavigate } from 'react-router-dom';

const camposRegistro = [
  { id: 'usuario', label: 'Usuario', type: 'text' },
  { id: 'edad', label: 'Edad', type: 'number' },
  { id: 'correo', label: 'Correo', type: 'email' },
  { id: 'password', label: 'Contraseña', type: 'password' }
];

const camposLogin = [
  { id: 'correo', label: 'Correo', type: 'email' },
  { id: 'password', label: 'Contraseña', type: 'password' }
];

export const Formulario = ({ cantContenido }) => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const campos = cantContenido === 2 ? camposLogin : camposRegistro;

  //LOGIN
  const gestionarLogin = (event, datos) => {
   if (datos.correo && datos.password) {
     const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
     const usuarioEncontrado =
       usuariosGuardados.find((u) => u.correo === datos.correo && u.password === datos.password);
     
     if (usuarioEncontrado) {
       setIsLoggedIn(true);
       alert(`Bienvenido ${usuarioEncontrado.usuario} ✅`);
       event.target.reset();
       navigate('/');
     } else {
       alert("Correo o contraseña incorrectos ❌");
     }
   } else {
     alert("Por favor, completa todos los campos de login.");
   }
  }

  //REGISTRO
  const gestionarRegistro = (event, datos) => {
    if (datos.usuario && datos.edad && datos.correo && datos.password) {
      const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
      usuariosGuardados.push(datos);
      localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados));
      alert("Usuario registrado correctamente ✅");
      event.target.reset();
      navigate('/');
    } else {
      alert("Por favor, completa todos los campos de registro.");
    }
  }

  //GESTIONADOR: LOGIN - REGISTRO
  const gestionadorSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const datos = Object.fromEntries(formData.entries());

    if (cantContenido === 2) {
      gestionarLogin(event, datos);
    } else {
      gestionarRegistro(event, datos);
    }
  };

  return (
    <motion.div
      className="paginaFormulario"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
    >
      <form className="formulario" onSubmit={gestionadorSubmit}>
        <div className="sub_Formulario">
          <div className="contenedor_Titulo-Form">
            {cantContenido === 2 ? (
              <h2>Iniciar Sesión</h2>
            ) : (
              <h2>Registrarse</h2>
            )}
          </div>
          <hr />
        </div>

        <div className="contenedorContenido">
          {campos.map((campo, index) => (
            <div className="super_Contenedor-Label" key={index}>
              <label htmlFor={campo.id}>
                <p>{campo.label}:</p>
                <input type={campo.type} id={campo.id} name={campo.id} />
              </label>
            </div>
          ))}
          <button className="boton_Submit" type="submit">
            Enviar
          </button>
        </div>
      </form>
    </motion.div>
  );
};
