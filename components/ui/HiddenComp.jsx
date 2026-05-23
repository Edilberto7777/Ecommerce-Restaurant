import './hiddenComp.css'
import { Button } from './Buttons'
import { MiniButton } from './MiniButton'

export const HiddenComp = ({onclick, arreglo, setSubCategoriaActiva }) => {
  return (
    <div
      className='aside_Subproductos-oculto activo'
      tabIndex={-1}
      ref={el => el && el.focus()}>
      <div className='subContenedorListasSubproductos'>
        <div>
          <h3>Elige alguno:</h3>
          <Button contenidoMovil={'Cerrar'} onClick={onclick} contenido={'Cerrar'} width={80} />
        </div>
        <hr />
        <ul className='listaSubproductos'>
          {Object.keys(arreglo).map((grupo, index) => (
            <li key={index}>
              <p>{grupo.toLocaleUpperCase()}</p>
              <MiniButton contenido={'✅'} onClick={() => setSubCategoriaActiva (grupo)} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}