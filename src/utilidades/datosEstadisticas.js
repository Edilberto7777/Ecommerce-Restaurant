import { gestorPrecioMensajeria } from '../utilidades/gestionMunicipio.js';
import {validarNombre, validarContraseña, validarTelefono} from './validadores.js'

export const datosEstadisticas = (
  cantContenido,
  usuario,
  password,
  telefono,
  setTelefono,
  setMunicipioActivo,
  setIsLoggedIn,
  event,
  navigate,
  datos,
  setUsuario,
  setPrecioMensajeria
) => {
    // Busca en la lista guardada en el navegador
        const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
    
        if (cantContenido == 2) {
          // Buscar usuario y contraseña
          const usuarioEncontrado = usuariosGuardados.find(
            (u) => u.usuario === usuario && u.password === password && u.telefono && u.direccion
          );
        
          if (usuarioEncontrado) {
            setUsuario(usuarioEncontrado.usuario)
            setTelefono(usuarioEncontrado.telefono);
            setMunicipioActivo(usuarioEncontrado.direccion);
            setIsLoggedIn(true);
            setPrecioMensajeria(gestorPrecioMensajeria(usuarioEncontrado.direccion))
            alert(`Bienvenido ${usuarioEncontrado.usuario} ✅`);
            event.target.reset();
            navigate('/');
          } else {
            alert("Usuario o contraseña incorrectos");
          }
        } else {

        const usuarioAntesRegistrado = usuariosGuardados.find((u) =>
          u && u.usuario == usuario && u.password == password);
        
          if (usuarioAntesRegistrado) {
            alert('Ya usted está registrado');
          } else {
            if (validarNombre(datos.usuario) && validarContraseña(datos.password) && validarTelefono(datos.telefono)) {
              setMunicipioActivo(datos.direccion);
              setPrecioMensajeria(gestorPrecioMensajeria(datos.direccion))
              usuariosGuardados.push(datos);
              localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados));
              setIsLoggedIn(true); 
              alert("Usuario registrado correctamente ✅");
              event.target.reset();
              navigate('/');
            } else if (!validarNombre(datos.usuario)) {
              alert(`${datos.usuario} es un nombre inválido`);
            } else if (!validarContraseña(datos.password)) {
              alert(`Tu contraseña es inválida`);
            } else if (!validarTelefono(datos.telefono)) {
              alert(`${datos.telefono} es un numero de teléfono inválido`)
            }
          }
        }
      
  }
