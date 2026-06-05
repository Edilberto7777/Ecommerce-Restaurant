// backend/utilidades/validaciones.js

export const validarNombre = (nombre) => {
  if (!nombre) return false;
  return nombre.trim().length >= 4 &&          // mínimo 4 caracteres
         /^[A-Z]/.test(nombre) &&              // empieza con mayúscula
         !/^[0-9]/.test(nombre);               // no empieza con número
};

export const validarContraseña = (contraseña) => {
  if (!contraseña) return false;
  const str = contraseña.toString().trim();
  return str.length >= 8 &&                    // mínimo 8 caracteres
         /[0-9]/.test(str) &&                  // al menos un número
         /[A-Z]/.test(str) &&                  // al menos una mayúscula
         /[a-z]/.test(str) &&                  // al menos una minúscula
         /^[A-Za-z0-9]/.test(str);             // empieza con letra o número
};

export const validarTelefono = (telefono) => {
  if (!telefono) return false;
  return /^[0-9]{8}$/.test(telefono.toString().trim()); // exactamente 8 dígitos
};
