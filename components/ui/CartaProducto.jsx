import { Button } from "./Buttons";
import './cartaProducto.css';
import { useContext, useState } from 'react';
import { AuthContext } from '../../src/App';
import { useNavigate } from 'react-router-dom';

export const CartaProducto = ({ 
  subProducto, 
  carrito, 
  setCarrito, 
  cantidadProductos, 
  setCantidadProductos, 
  totalPrecioProductoSumado, 
  setTotalPrecioProductoSumado
}) => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  // 👇 Estado independiente por cada carta
  const [cantidad, setCantidad] = useState(1);

  const handleComprar = () => {
    if (!isLoggedIn) {
      alert("Debes iniciar sesión para comprar.");
      navigate('/login');
      return;
    }

    const existe = carrito.some(
      (producto) => producto.nombreProducto === subProducto.nombreProducto
    );

    if (existe) {
      alert("El producto ya se encuentra en el carrito");
      return;
    }

    const precioProducto = subProducto.precioProducto * cantidad;

    setCarrito(prev => [...prev, { ...subProducto, cantidad }]);
    setCantidadProductos(cantidadProductos + cantidad);
    setTotalPrecioProductoSumado(totalPrecioProductoSumado + precioProducto);
  };

  return (
    <div className="contenedor_cartaProducto">
      <div className="contenedor_imagen">
        <img src={subProducto.url} alt="producto" />
        <p>{subProducto.nombreProducto}</p>
      </div>
      <hr />
      <div className="contenedor_botonComprar">
        <div className="contenedor_botonComprar_Icono">
          <Button 
            contenidoMovil={'Agg +'}
            contenido={
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                Agregar
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
            onClick={handleComprar}
          />
          <input
            value={cantidad}
            type="number"
            className="input_number"
            min="1"
            onChange={(e) => setCantidad(parseInt(e.target.value) || 1)} />
        </div>
        <div className="contenedorPrecio">
          <p>{`$${subProducto.precioProducto}`}</p>
        </div>
      </div>
    </div>
  );
};
