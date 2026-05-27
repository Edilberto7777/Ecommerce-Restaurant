import './miniButton.css' // Importa los estilos CSS específicos para este botón pequeño.

/*
    Es un componente funcional que recibe props:
      - contenido: lo que se mostrará dentro del botón (texto, ícono, SVG, etc.).
      - width: ancho del botón en píxeles.
      - color: color de fondo del botón.
      - onClick: función que se ejecuta al hacer clic.
*/

export const MiniButton = ({ contenido, width, color, onClick }) => {
  return (
    <button
      type="button"
      className="miniBoton"
      style={{ width: `${width}px`, background: `${color}` }}
      onClick={onClick}
    >{ contenido }</button>
  )
}
