import { Button } from "./Buttons";
import './cartaProducto.css';
import { useContext } from 'react';
import { AuthContext } from '../../src/App';
import { useNavigate } from 'react-router-dom';

export const CartaProducto = ({ url, nombreProducto, onza, precioProducto }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleComprar = () => {
    if (!isLoggedIn) {
      alert("Debes iniciar sesión para comprar.");
      navigate('/login');
      return;
    }
    console.log("Comprando:", nombreProducto);
  };

  return (
    <div className="contenedor_cartaProducto">
      <div className="contenedor_imagen">
        <img src={url} alt="producto" />
        <p>{nombreProducto}</p>
      </div>
      <hr />
      <div className="contenedor_botonComprar">
        <div className="contenedor_botonComprar_Icono">
          <Button 
            contenido={'Comprar'} 
            btnUrl={'../../src/assets/botonCarrito.png'} 
            onClick={handleComprar}
          />
          <span></span>
        </div>
        <div className="contenedorPrecio">
          <p>{onza ? `Oz:${onza}` : ''}</p>
          <p>{`$${precioProducto}`}</p>
        </div>
      </div>
    </div>
  );
};
