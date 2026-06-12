export const validarNombre = (nombre) => {
  if (!nombre) return false;

  return (
    nombre.trim().length >= 4 && // mínimo 4 caracteres
    /^[A-Z]/.test(nombre) // empieza con mayúscula
  );
};

export const validarContraseña = (contraseña) => {
  if (!contraseña) return false;
  const str = contraseña.toString(); // asegura que sea string
  return (
    /[0-9]/.test(str) && // al menos un número
    /[A-Z]/.test(str) && // al menos una mayúscula
    /[a-z]/.test(str) // al menos una minúscula
  );
};

export const validarTelefono = (telefono) => {
  if (!telefono) return false;
  return /^[0-9]{8}$/.test(telefono.toString().trim()); // exactamente 8 dígitos
};
