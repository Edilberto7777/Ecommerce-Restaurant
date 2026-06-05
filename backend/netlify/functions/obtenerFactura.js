import { supabase } from '../../../src/servicios/supabase.js';

export async function handler() {
  try {
    const { data, error } = await supabase
      .from('facturas')
      .select('*');

    if (error) {
      return { statusCode: 400, body: JSON.stringify({ error: error.message }) };
    }

    return { statusCode: 200, body: JSON.stringify({ facturas: data }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: "Error interno en obtenerFacturas" }) };
  }
}