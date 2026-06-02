export const validarNombre = (nombre) => {
  if (!nombre) return false;

  const esValido =
    nombre.trim().length >= 4 &&   // mínimo 4 caracteres
    /^[A-Z]/.test(nombre) &&       // empieza con mayúscula
    !/^[0-9]/.test(nombre);        // no empieza con número

  return esValido;
};

export const validarContraseña = (contraseña) => {
  if (!contraseña) return false;

  const str = contraseña.toString().trim(); // asegura que sea string

  const tieneLongitudMinima = str.length >= 8; // mínimo 8 caracteres
  const tieneNumero = /[0-9]/.test(str);       // contiene números
  const tieneMayuscula = /[A-Z]/.test(str);    // contiene mayúsculas
  const tieneMinuscula = /[a-z]/.test(str);    // contiene minúsculas
  const comienzaCaracter = /^[A-Za-z0-9]/.test(str); // no comienza con caracter especial

  return tieneLongitudMinima && tieneNumero && tieneMayuscula && tieneMinuscula && comienzaCaracter;
};

export const validarTelefono = (telefono) => {
  if (!telefono) return false;

  const telefonoStr = telefono.toString().trim(); // asegura que sea string
  const soloNumeros = /^[0-9]{8}$/.test(telefonoStr); // exactamente 8 dígitos, sin letras

  return soloNumeros;
};