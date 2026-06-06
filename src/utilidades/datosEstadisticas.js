import { gestorPrecioMensajeria } from '../utilidades/gestionMunicipio.js';

export const  datosEstadisticas  = async (
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
  // Busca en la lista de usuarios guardado 
        console.log(await fetch('/.netlify/functions/obtenerUsuario'));
        const responseUsuarios = await fetch('/.netlify/functions/obtenerUsuario');
        const resultUsuarios = await responseUsuarios.json();
        const usuariosGuardados = resultUsuarios.usuarios || [];
    
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
            if (datos.usuario && datos.password && datos.telefono) {
              setMunicipioActivo(datos.direccion);
              setPrecioMensajeria(gestorPrecioMensajeria(datos.direccion))
              usuariosGuardados.push(datos);

              // 3. Guardar usuario en el backend
              const respuesta = await fetch('/.netlify/functions/guardarUsuario', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usuario: datos })
              });

              const result = await respuesta.json();

             if (respuesta.ok) {
                setIsLoggedIn(true); 
                alert("Usuario registrado correctamente ✅");
                event.target.reset();
                navigate('/');
              } else {
                alert("Error al registrar usuario ❌");
                console.error("Error del backend:", result.error);
              }
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
