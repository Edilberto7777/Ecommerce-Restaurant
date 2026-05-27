// Importamos los estilos y los botones que vamos a usar
import './hiddenComp.css' // Estilos visuales de este componente
import { Button } from './Buttons' // Botón grande reutilizable
import { MiniButton } from './MiniButton' // Botón pequeño reutilizable

/*
    Este componente muestra una ventana lateral (un panel oculto)
    donde el usuario puede elegir una subcategoría de productos.

    Recibe tres cosas (props):
      - onclick: función para cerrar la ventana.
      - arreglo: lista de subcategorías disponibles.
      - setSubCategoriaActiva: función para activar la subcategoría elegida.
*/

export const HiddenComp = ({ onclick, arreglo, setSubCategoriaActiva }) => {
  return (
    <div
      className='aside_Subproductos-oculto activo'
      tabIndex={-1} // Permite que este bloque pueda recibir el foco
      ref={el => el && el.focus()} // Hace que el bloque reciba el foco automáticamente al aparecer
    >
      <div className='subContenedorListasSubproductos'>
        
        {/* Encabezado con título y botón de cierre */}
        <div className="header">
          <h3>Elige alguno:</h3>
          {/* Botón para cerrar el panel */}
          <Button contenidoMovil={'Cerrar'} onClick={onclick} contenido={'✖'} />
        </div>

        <hr />

        {/* Lista de subcategorías */}
        <ul className='listaSubproductos'>
          {Object.keys(arreglo).map((grupo, index) => (
            <li key={index}>
              {/* Nombre de la subcategoría en mayúsculas */}
              <p>{grupo.toLocaleUpperCase()}</p>
              
              {/* Botón pequeño con ícono de check ✔ para seleccionar la subcategoría */}
              <MiniButton 
                contenido={
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" 
                       viewBox="0 0 24 24" fill="none" stroke="white" 
                       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                } 
                onClick={() => setSubCategoriaActiva(grupo)} // Al hacer clic, activa esa subcategoría
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
