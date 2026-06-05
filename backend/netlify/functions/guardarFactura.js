import { supabase } from '../../../src/servicios/supabase.js';

export async function handler(event) {
  try {
    const body = JSON.parse(event.body);
    const factura = body.factura;

    const { data, error } = await supabase
      .from('facturas')
      .insert([factura])

    if (error) {
      return { statusCode: 400, body: JSON.stringify({ error: error.message }) };
    }

    return { statusCode: 200, body: JSON.stringify({ message: "Factura guardada correctamente"}) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: "Error interno en guardarPedido" }) };
  }
}