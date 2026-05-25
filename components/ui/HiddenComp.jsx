import './hiddenComp.css'
import { Button } from './Buttons'
import { MiniButton } from './MiniButton'

export const HiddenComp = ({ onclick, arreglo, setSubCategoriaActiva }) => {
  return (
    <div
      className='aside_Subproductos-oculto activo'
      tabIndex={-1}
      ref={el => el && el.focus()}>
      <div className='subContenedorListasSubproductos'>
        <div className="header">
          <h3>Elige alguno:</h3>
          <Button contenidoMovil={'Cerrar'} onClick={onclick} contenido={'✖'} />
        </div>
        <hr />
        <ul className='listaSubproductos'>
          {Object.keys(arreglo).map((grupo, index) => (
            <li key={index}>
              <p>{grupo.toLocaleUpperCase()}</p>
              <MiniButton 
                contenido={
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" 
                       viewBox="0 0 24 24" fill="none" stroke="white" 
                       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                } 
                onClick={() => setSubCategoriaActiva(grupo)} 
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
