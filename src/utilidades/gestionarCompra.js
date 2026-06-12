import { generarFactura } from './generarFactura.js';

export const gestionarCompra = async (infoUser, carrito, cantidadProductos, totalPrecioProductoSumado) => {
  if (!infoUser.nombre || carrito.length === 0) {
    alert('Debes iniciar sesión y agregar productos al carrito.');
    return;
  }

  const facturaTexto = generarFactura(infoUser, carrito, cantidadProductos, totalPrecioProductoSumado);

  try {
    // Enviar al backend para que use Twilio/WhatsApp API
    const response = await fetch('/.netlify/functions/enviarFacturaSMS', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mensaje: facturaTexto }),
    });

    const result = await response.json();

    if (response.ok) {
      alert('Factura enviada a la dueña por SMS ✅');
      console.log('Factura enviada:', result);
    } else {
      alert('Error al enviar factura ❌');
      console.error(result.error);
    }
  } catch (error) {
    console.error('Error en gestionarCompras:', error);
    alert('No se pudo enviar la factura ❌');
  }
};
