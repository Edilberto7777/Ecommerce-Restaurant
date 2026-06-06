import { supabase } from '../servicios/supabase.js';

export async function handler() {
  try {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*');

    if (error) {
      return { statusCode: 400, body: JSON.stringify({ error: error.message }) };
    }

    return { statusCode: 200, body: JSON.stringify({ usuarios: data }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: "Error interno en obtenerUsuarios" }) };
  }
}