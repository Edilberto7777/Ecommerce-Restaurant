import { datosEstadisticas } from './datosEstadisticas';

  // LOGIN: busca usuario en localStorage
  const gestionarLogin = (event, datos, navigate, setIsLoggedIn, setMunicipioActivo, telefono, setTelefono, password, usuario, cantContenido, setUsuario, setPrecioMensajeria) => {
    if (datos.usuario && datos.password) {
    
      datosEstadisticas(
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
        setPrecioMensajeria);
    } else {
      alert("Por favor, completa todos los campos de login.");
    }
  }

  // REGISTRO: guarda nuevo usuario en localStorage
  const gestionarRegistro = (event, datos, navigate, setIsLoggedIn, setMunicipioActivo, telefono, setTelefono, password, usuario, cantContenido, setUsuario, setPrecioMensajeria) => {
    // Si todos los campos están llenos
    if (datos.usuario && datos.telefono && datos.direccion && datos.password) {

      datosEstadisticas(
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
      setPrecioMensajeria);
    } else {
      alert("Por favor, completa todos los campos de registro.");
    }
  }

  // Decide si es login o registro y genera factura
  export const gestionadorSubmit = (event, cantContenido, contador, setContador, setPrecioMensajeria, municipioActivo, setMunicipioActivo, navigate, setIsLoggedIn, telefono, setTelefono, password, usuario, setUsuario) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const datos = Object.fromEntries(formData.entries());

    // Si es login → validar usuario
    if (cantContenido == 2) {
      gestionarLogin(event, datos, navigate, setIsLoggedIn, setMunicipioActivo, telefono, setTelefono, password, usuario, cantContenido, setUsuario, setPrecioMensajeria);
    } else {
      // Si es registro → guardar usuario
      gestionarRegistro(event, datos, navigate, setIsLoggedIn, setMunicipioActivo, telefono, setTelefono, password, usuario, cantContenido, setUsuario, setPrecioMensajeria);
    }
    
    setContador(contador + 1);
  };