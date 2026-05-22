import './miniButton.css'

export const MiniButton = ({ contenido, width, onClick }) => {
  return (
    <button
      type="button"
      className="miniBoton"
      style={{ width: `${width}px` }}
      onClick={onClick}
    >{ contenido }</button>
  )
}
