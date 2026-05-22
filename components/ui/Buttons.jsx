import './buttons.css'

export const Button = ({ contenido, btnUrl, onClick, width }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="boton"
      style={{
        ...(btnUrl ? { '--icon-url': `url(${btnUrl})` } : {}),
        ...(width ? { width } : {})
      }}
    >
      {contenido}
    </button>
  )
}
