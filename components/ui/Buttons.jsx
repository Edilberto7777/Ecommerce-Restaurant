// Importamos los estilos que le dan forma y colores al botón
import './buttons.css' 

// Importamos herramientas de React para manejar cambios y efectos
import { useState, useEffect } from 'react'; 

/*
    Este componente muestra un botón que se adapta según el tamaño de la pantalla.

    Recibe como datos (props):
      - contenido: texto que se muestra en pantallas grandes.
      - contenidoMovil: texto alternativo para pantallas pequeñas (menos de 560px).
      - btnUrl: dirección de una imagen que se usa como ícono de fondo.
      - onClick: acción que se ejecuta cuando se hace clic en el botón.
      - width: ancho opcional del botón.
*/

export const Button = ({ contenido, contenidoMovil, btnUrl, onClick, width }) => {

  // Guardamos si la pantalla es "pequeña" (menos de 560px) o no
  const [isMobile, setIsMobile] = useState(window.innerWidth < 560);

  /*
      Este bloque se encarga de:
        - Escuchar cuando el usuario cambia el tamaño de la ventana.
        - Actualizar el valor de isMobile (true si es pequeña, false si es grande).
        - Dejar de escuchar cuando el botón se elimina de la pantalla.
  */
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 560);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <button
      type="button" // Es un botón normal, no envía formularios
      onClick={onClick} // Acción al hacer clic
      className="boton" // Clase de estilos
      style={{
        // Si hay ícono, lo agrega como fondo
        ...(btnUrl ? { '--icon-url': `url(${btnUrl})` } : {}),
        // Si se pasa un ancho, lo aplica
        ...(width ? { width } : {})
      }}
    >
      {/* Si la pantalla es pequeña muestra contenidoMovil, si no muestra contenido normal */}
      {isMobile ? contenidoMovil : contenido}
    </button>
  )
}