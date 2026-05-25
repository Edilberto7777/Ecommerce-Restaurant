import { Button } from "./Buttons";
import './cartaProducto.css';
import { useContext } from 'react';
import { AuthContext } from '../../src/App';
import { useNavigate } from 'react-router-dom';

export const CartaProducto = ({ subProducto, carrito, setCarrito}) => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleComprar = (carrito, subProducto) => {
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

    setCarrito(prev => [...prev, subProducto])
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
            contenidoMovil={'$$$'}
            contenido={'Agregar'} 
            btnUrl={'../../src/assets/botonCarrito.png'} 
            onClick={() => handleComprar(carrito, subProducto)}
          />
          <span></span>
        </div>
        <div className="contenedorPrecio">
          <p>{`$${Array.isArray(subProducto.precioProducto) && subProducto.precioProducto.length > 1
                          ? subProducto.precioProducto.join('-')
                          : subProducto.precioProducto[0]}`}</p>
        </div>
      </div>
    </div>
  );
};
