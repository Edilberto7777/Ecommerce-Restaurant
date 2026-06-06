import { supabase } from "./servicios/supabase";

export async function handler(event) {
  try {
    const producto = JSON.parse(event.body);

    const { data, error } = await supabase
      .from('productos')
      .insert([producto]);
    
    if (error) {
      return {statusCode: 400, body: JSON.stringify({error: error.message})}
    }

    return { statusCode: 200, body: JSON.stringify({ message: "Producto guardado correctamente"}) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: "Error interno en guardarProducto" }) };
  }
}