import { useEffect, useState, useRef } from "react";

export const FadeOnScroll = ({ children, trigger = 0.5 }) => {
  const ref = useRef(null);
  const [style, setStyle] = useState({ opacity: 0, transform: "scale(0.8)" });

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return; 

      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Punto de inicio: porcentaje de la ventana (ej: 0.2 = 20%)
      const triggerPoint = windowHeight * trigger;

      // Progreso relativo: cuánto hemos pasado del trigger
      const progress = Math.max(0, triggerPoint - rect.top);

      // Escala: de 0.8 → 1
      const newScale = Math.min(1, 0.8 + progress / 300);

      // Opacidad: de 0 → 1
      const newOpacity = Math.min(1, progress / 300);

      setStyle({
        opacity: newOpacity,
        transform: `scale(${newScale})`,
        transition: "opacity 0.4s ease, transform 0.4s ease"
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [trigger]);

  return (
    <div ref={ref} style={style}>
      {children}
    </div>
  );
};
