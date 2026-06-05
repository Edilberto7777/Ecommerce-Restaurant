export const municipiosHabana = [
  "Arroyo Naranjo",
  "Boyeros",
  "Centro Habana",
  "Cerro",
  "Cotorro",
  "Diez de Octubre",
  "Guanabacoa",
  "Habana del Este",
  "Habana Vieja",
  "La Lisa",
  "Marianao",
  "Playa",
  "Plaza de la Revolución",
  "Regla",
  "San Miguel del Padrón",
  "Vedado"
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