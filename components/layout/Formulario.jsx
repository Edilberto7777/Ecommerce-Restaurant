// Importamos estilos y librerías necesarias
import './formulario.css'; // Estilos visuales del formulario
import { motion } from 'framer-motion'; // Para animaciones suaves
import { useContext, useState } from 'react'; // Herramientas de React
import { AuthContext } from '../../src/App'; // Estado global de login
import { useNavigate } from 'react-router-dom'; // Para cambiar de página

// Campos que se muestran si es registro (4 inputs)
const camposRegistro = [
  { id: 'usuario', label: 'Usuario', type: 'text', placeholder: 'Ej: Andres D.'},
  { id: 'password', label: 'Contraseña', type: 'password', placeholder: 'Ej: miContraseña1234' },
  { id: 'telefono', label: 'Teléfono', type: 'number', placeholder: 'Ej: 58323890'},
  { id: 'direccion', label: 'Dirección', type: 'text' }
];

// Campos que se muestran si es login (2 inputs)
const camposLogin = [
  { id: 'usuario', label: 'Usuario', type: 'text', placeholder: 'Ej: Andres D.'},
  { id: 'password', label: 'Contraseña', type: 'password', placeholder: 'Ej: miContraseña1234' }
];

export const Formulario = ({
  cantContenido,
  usuario, setUsuario,
  password, setPassword,
  telefono, setTelefono,
  municipioActivo, setMunicipioActivo,
  contador, setContador,
  precioMensajeria, setPrecioMensajeria,
  municipiosHabana,           
  gestorPrecioMensajeria}) => {
  const { setIsLoggedIn } = useContext(AuthContext); // Permite activar el login global
  const navigate = useNavigate(); // Permite redirigir a otra página
  const campos = cantContenido === 2 ? camposLogin : camposRegistro; // Decide qué campos mostrar

  // LOGIN: busca usuario en localStorage
  const gestionarLogin = (event, datos) => {
    // Si el usuario llenó usuario y contraseña
    if (datos.usuario && datos.password) {
      // Busca en la lista guardada en el navegador
      const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
      const usuarioEncontrado =
        usuariosGuardados.find((u) => u.usuario === datos.usuario && u.password === datos.password);
      
      if (usuarioEncontrado) {
        // Si lo encuentra → activa login y redirige
        setIsLoggedIn(true);
        alert(`Bienvenido ${usuarioEncontrado.usuario} ✅`);
        event.target.reset(); // Limpia formulario
        navigate('/'); // Va a la página principal
      } else {
        alert("Usuario o contraseña incorrectos ❌");
      }
    } else {
      alert("Por favor, completa todos los campos de login.");
    }
  }

  // REGISTRO: guarda nuevo usuario en localStorage
  const gestionarRegistro = (event, datos) => {
    // Si todos los campos están llenos
    if (datos.usuario && datos.telefono && datos.direccion && datos.password) {
      const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
      usuariosGuardados.push(datos); // Agrega el nuevo usuario
      localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados));
      alert("Usuario registrado correctamente ✅");
      event.target.reset();
      navigate('/');
    } else {
      alert("Por favor, completa todos los campos de registro.");
    }
  }

  // Decide si es login o registro y genera factura
  const gestionadorSubmit = (event) => {
    event.preventDefault(); // Evita que la página se recargue

    const formData = new FormData(event.target);
    const datos = Object.fromEntries(formData.entries());

    // Si es login → validar usuario
    if (cantContenido === 2) {
      gestionarLogin(event, datos);
    } else {
      // Si es registro → guardar usuario
      gestionarRegistro(event, datos);
    }

    // Calcular precio de mensajería
    setPrecioMensajeria(gestorPrecioMensajeria(municipioActivo));
    setContador(contador + 1); // Aumenta el número de factura
  };

  // Actualiza estados según input
  const gestionarValores = (event, inputId) => {
    const valorActual = event.target.value;
    switch (inputId) {
      case 'usuario': setUsuario(valorActual); break;
      case 'password': setPassword(valorActual); break;
      case 'telefono': setTelefono(valorActual); break;
      case 'direccion':
        setMunicipioActivo(valorActual);
        setPrecioMensajeria(gestorPrecioMensajeria(valorActual)); // ✅ aquí actualizas
      break;;
    }
  }

  return (
    <motion.div
      className="paginaFormulario"
      initial={{ opacity: 0, y: 30 }} // Animación al aparecer
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }} // Animación al desaparecer
      transition={{ duration: 0.6 }}
    >
      <form className="formulario" onSubmit={gestionadorSubmit}>
        <div className="sub_Formulario">
          <div className="contenedor_Titulo-Form">
            {/* Título cambia según login o registro */}
            {cantContenido === 2 ? (
              <h2>Iniciar Sesión</h2>
            ) : (
              <h2>Registrarse</h2>
            )}
          </div>
          <hr />
        </div>

        <div className="contenedorContenido">
          {
            // Renderiza inputs según login o registro
            campos.map((campo, index) => (
            <div className="super_Contenedor-Label" key={index}>
                {index == 3 ?
                // El último campo (direccion) se muestra como select
                <>
                  <p>Seleccione el lugar de la Habana: </p>
                  <select
                    value={municipioActivo}
                    id='direccion'
                    name="direccion"
                    className='select_municipios'
                    onChange={(event) => gestionarValores(event, campo.id)}>
                    {municipiosHabana.map((municipio, index) => (
                      <option key={index} value={municipio}>{municipio}</option>
                    ))}
                  </select>                
                </>
              : <label htmlFor={campo.id}>
                  <p>{campo.label}:</p>
                  <input
                    value={campo.id === 'usuario' ? usuario :
                      campo.id === 'password' ? password :
                      campo.id === 'telefono' ? telefono : ''}
                    onChange={(event) => gestionarValores(event, campo.id)}
                    type={campo.type}
                    id={campo.id}
                    name={campo.id}
                    placeholder={campo.placeholder} />
                </label>}
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