// Importamos estilos y librerías necesarias
import '../../estilos/formulario.css';
import { motion } from 'framer-motion'; 
import { useContext } from 'react';
import { AuthContext } from '../../App.jsx';
import { useNavigate } from 'react-router-dom';
import { gestionadorSubmit } from '../../utilidades/gestorLogin.js';

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

export const Formulario = ({ cantContenido, ...props }) => {
  
  const { usuario, setUsuario, password, setPassword, telefono, setTelefono, municipioActivo, setMunicipioActivo, contador, setContador, setPrecioMensajeria, municipiosHabana} = props;
  const { setIsLoggedIn } = useContext(AuthContext); // Permite activar el login global
  const navigate = useNavigate(); // Permite redirigir a otra página
  const campos = cantContenido === 2 ? camposLogin : camposRegistro; // Decide qué campos mostrar

  // Actualiza estados según input
  const gestionarValores = (event, inputId) => {
    const valorActual = event.target.value;
    
    switch (inputId) {
      case 'usuario':
        setUsuario(valorActual);
        break;
      case 'password':
        setPassword(valorActual);
        break;
      case 'telefono':
        setTelefono(valorActual);
        break;
      case 'direccion':
        setMunicipioActivo(valorActual);
        break;
    }
  };

  return (
    <motion.div
      className="paginaFormulario"
      initial={{ opacity: 0, y: 30 }} // Animación al aparecer
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }} // Animación al desaparecer
      transition={{ duration: 0.6 }}
    >
      <form className="formulario" onSubmit={(event) => gestionadorSubmit(event, cantContenido, contador, setContador, setPrecioMensajeria, municipioActivo, setMunicipioActivo, navigate, setIsLoggedIn, telefono, setTelefono, password, usuario, setUsuario)
      }>
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