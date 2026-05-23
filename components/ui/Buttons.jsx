import './buttons.css'
import { useState, useEffect } from 'react';

export const Button = ({ contenido, contenidoMovil, btnUrl, onClick, width }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 560);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 560);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      {isMobile ? contenidoMovil : contenido}
    </button>
  )
}
