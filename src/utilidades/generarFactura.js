export const generarFactura = (infoUser, carrito, cantidadProductos, totalPrecioProductoSumado) => {
  return {
    usuario_id: infoUser.id,
    usuario: infoUser.nombre,
    telefono: infoUser.telefono,
    direccion: infoUser.direccion,
    precio_mensajeria: infoUser.precioMensajeria,
    productos: carrito.join(", "),
    cantidad_productos: cantidadProductos,
    total: totalPrecioProductoSumado,
    fecha: new Date().toISOString()
  };
};
