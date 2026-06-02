export const municipiosHabana = [
  'Habana Vieja', 'Centro Habana', 'Vedado', 'Playa',
  'Marianao', '10 de Octubre', 'Regla', 'Morro'
 ];

export const gestorPrecioMensajeria = (municipio) => {
    switch (municipio) {
      case 'Habana Vieja': return 600;
      case 'Centro Habana': return 300;
      case 'Vedado': return 600;
      case 'Playa': return 1000;
      case 'Marianao': return 1500;
      default: return 0;
    }
  };