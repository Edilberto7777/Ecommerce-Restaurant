import './estadisticas.css'

export const Estadisticas = ({cantidadProductos, totalPrecioProductoSumado}) => {
  return (
    <div className='estadisticas'>
      <section>
        <ul>
          <i>
            <li>Cantidad de productos diferentes: { cantidadProductos }</li>
            <li>Suma de todos los productos: ${ totalPrecioProductoSumado }</li>
          </i>
        </ul>
      </section>
      <hr />
      <section>
        <h2>Total: <span></span></h2>
      </section>
    </div>
  )
}