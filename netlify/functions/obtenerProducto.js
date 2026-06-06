import { supabase } from './supabase.js';

export async function handler() {
  try {
    const { data, error } = await supabase
      .from('productos')
      .select('*');

    if (error) {
      return { statusCode: 400, body: JSON.stringify({ error: error.message }) };
    }

    return { statusCode: 200, body: JSON.stringify({ productos: data }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: "Error interno en obtenerProducto" }) };
  }
}