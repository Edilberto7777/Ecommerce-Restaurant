import './miniButton.css'

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
