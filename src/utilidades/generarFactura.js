export const generarFactura = (infoUser, carrito, cantidadProductos, totalPrecioProductoSumado) => {
  return `
📋 FACTURA DEL PEDIDO
----------------------------
👤 Cliente: ${infoUser.nombre}
📞 Teléfono: ${infoUser.telefono}
🏠 Dirección: ${infoUser.direccion}
🚚 Costo domicilio: $${infoUser.precio_mensajeria}

🛒 Productos: ${carrito.join(', ')}
📦 Cantidad de productos: ${cantidadProductos}
💰 Total: $${totalPrecioProductoSumado}
📅 Fecha: ${new Date().toISOString()}
----------------------------
✅ Gracias por su compra`;
};
