import '../../estilos/componenteError.css'

export const ComponenteError = ({error}) => {
  return (
    <div className="contenedor_Error">
      <div className="componente_error">
        <p>{ `Error: ${error}` }</p>
      </div>
    </div>
  )
} 