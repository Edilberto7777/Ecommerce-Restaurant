import { supabase } from '../servicios/supabase.js';
import { validarNombre, validarContraseña, validarTelefono } from '../utilidades/validaciones.js';

export async function handler(event) {
  try {
    const body = JSON.parse(event.body);
    const datos = body.usuario; // el objeto con usuario, contraseña, etc.

    if (!validarNombre(datos.usuario)) {
      return { statusCode: 400, body: JSON.stringify({ error: "Nombre inválido" }) };
    }
    if (!validarContraseña(datos.password)) {
      return { statusCode: 400, body: JSON.stringify({ error: "Contraseña inválida" }) };
    }
    if (!validarTelefono(datos.telefono)) {
      return { statusCode: 400, body: JSON.stringify({ error: "Teléfono inválido" }) };
    }

    const { data, error } = await supabase
      .from('usuarios')
      .insert([datos]);

    if (error) {
      return { statusCode: 400, body: JSON.stringify({ error: error.message }) };
    }

    return { statusCode: 200, body: JSON.stringify({ message: "Usuario registrado correctamente"}) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: "Error interno en registrarUsuario" }) };
  }
}