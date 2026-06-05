// Importamos los estilos que darán forma y colores a este componente
import '../../estilos/estadisticas.css' 

/*
    Este componente muestra un resumen detallado del carrito.

    Recibe tres datos (props):
      - cantidadProductos: cuántos productos diferentes hay en el carrito.
      - totalPrecioProductoSumado: cuánto dinero suman todos los productos juntos.
      - carrito: lista de productos con nombre, cantidad y precio.
*/

export const Estadisticas = ({ cantidadProductos, totalPrecioProductoSumado, carrito = [], infoUser}) => {

  const totalGeneral = totalPrecioProductoSumado + infoUser?.precioMensajeria;

  return (
    <div className='estadisticas'>
      
      {/* Primera sección: lista con los números básicos */}
      <section className='sup_contenedor-Estadistica'>
        <h3>Detalle por producto:</h3>
        <hr />
        <ul>
          <li>ID: { infoUser?.id }</li>
          <li>Nombre: { infoUser?.nombre }</li>
          <li>Teléfono: { infoUser?.telefono }</li>
          <li>Dirección: {infoUser?.direccion}</li>
          <li>Costo de mensajería: { infoUser?.precioMensajeria > 0 
              ? `$${infoUser?.precioMensajeria}` 
              : 'Sin Domicilio' }</li> 
          <li>Cantidad de productos: { cantidadProductos }</li>
          <li>Suma de todos los productos: ${ totalPrecioProductoSumado }</li>
        </ul>
      </section>

      <hr />

      {/* Tercera sección: total final */}
      <section className='sub_contenedor-Estadistica'>
        <h2>Total general: <span>${ totalGeneral }</span></h2>
      </section>
    </div>
  )
}
