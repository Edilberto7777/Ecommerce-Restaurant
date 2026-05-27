// Importamos el botón reutilizable y los estilos de la carta
import { Button } from "./Buttons"; 
import './cartaProducto.css'; 

// Importamos herramientas de React y el contexto de login
import { useContext, useState } from 'react'; 
import { AuthContext } from '../../src/App'; 
import { useNavigate } from 'react-router-dom'; 

/*
    Este componente muestra una "tarjeta" de producto con:
      - Imagen y nombre del producto
      - Precio
      - Botón para agregarlo al carrito
      - Campo para elegir la cantidad

    Recibe como datos (props):
      - subProducto: información del producto (nombre, precio, imagen).
      - carrito: lista de productos ya agregados.
      - setCarrito: función para actualizar esa lista.
      - cantidadProductos: número total de productos en el carrito.
      - setCantidadProductos: función para actualizar ese número.
      - totalPrecioProductoSumado: suma de los precios de todos los productos.
      - setTotalPrecioProductoSumado: función para actualizar esa suma.
*/

export const CartaProducto = ({ 
  subProducto, 
  carrito, 
  setCarrito, 
  cantidadProductos, 
  setCantidadProductos, 
  totalPrecioProductoSumado, 
  setTotalPrecioProductoSumado
}) => {
  const { isLoggedIn } = useContext(AuthContext); // Verifica si el usuario está conectado
  const navigate = useNavigate(); // Permite redirigir al login si no lo está

  // Cada tarjeta maneja su propia cantidad seleccionada
  const [cantidad, setCantidad] = useState(1);

  /*
      Esta función se ejecuta al hacer clic en "Agregar":
        1. Si el usuario no está conectado → lo manda al login.
        2. Si el producto ya está en el carrito → muestra un aviso.
        3. Si todo está bien:
           - Calcula el precio multiplicado por la cantidad.
           - Agrega el producto al carrito con esa cantidad.
           - Actualiza el total de productos y el precio acumulado.
  */
  const handleComprar = () => {
    // 1. Usuario no conectado
    if (!isLoggedIn) {
      alert("Debes iniciar sesión para comprar.");
      navigate('/login');
      return;
    }

    // 2. Producto ya en el carrito
    const existe = carrito.some(
      (producto) => producto.nombreProducto === subProducto.nombreProducto
    );
    if (existe) {
      alert("El producto ya se encuentra en el carrito");
      return;
    }

    // 3. Calcular precio según cantidad
    const precioProducto = subProducto.precioProducto * cantidad;

    // Agregar producto al carrito
    setCarrito(prev => [...prev, { ...subProducto, cantidad }]);

    // Actualizar totales
    setCantidadProductos(cantidadProductos + cantidad);
    setTotalPrecioProductoSumado(totalPrecioProductoSumado + precioProducto);
  };

  return (
    <div className="contenedor_cartaProducto">
      {/* Imagen y nombre del producto */}
      <div className="contenedor_imagen">
        <img src={subProducto.url} alt="producto" />
        <p>{subProducto.nombreProducto}</p>
      </div>

      <hr />

      {/* Botón de agregar y campo de cantidad */}
      <div className="contenedor_botonComprar">
        <div className="contenedor_botonComprar_Icono">
          <Button 
            contenidoMovil={'Agg +'} // Texto corto para móviles
            contenido={
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                Agregar
                {/* Ícono de suma dentro del botón */}
                <svg xmlns="http://www.w3.org/2000/svg" 
                     width="18" height="18" 
                     viewBox="0 0 24 24" 
                     fill="none" stroke="currentColor" 
                     strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="16" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
              </span>
            }
            onClick={handleComprar} // Acción al hacer clic
          />

          {/* Campo para elegir cantidad */}
          <input
            value={cantidad}
            type="number"
            className="input_number"
            min="1"
            onChange={(e) => setCantidad(parseInt(e.target.value) || 1)} 
          />
        </div>

        {/* Precio unitario del producto */}
        <div className="contenedorPrecio">
          <p>{`$${subProducto.precioProducto}`}</p>
        </div>
      </div>
    </div>
  );
};