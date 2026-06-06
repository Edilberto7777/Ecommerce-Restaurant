import { supabase } from './servicios/supabase.js';

export async function handler() {
  console.log("URL:", process.env.SUPABASE_URL);
console.log("KEY:", process.env.SUPABASE_SERVICE_ROLE_KEY ? "CARGADA" : "VACÍA");

  try {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*');

    if (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: error.message })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ usuarios: data })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error interno en obtenerUsuarios" })
    };
  }
}
