import './main_layout.css'
import { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/Buttons';
import { CartaProducto } from '../ui/CartaProducto';
import productosData from '../../src/data/productos.json';
import { HiddenComp } from '../ui/HiddenComp';  
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { MiniButton } from '../ui/MiniButton';

export const Layout = () => {
  const contenedor2Ref = useRef(null);
  const contenedor3Ref = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [scale, setScale] = useState(1);
  const [opacity, setOpacity] = useState(1);
  const [mostrarClase, setMostrarClase] = useState('');
  const navigate = useNavigate();
  const [categoriaActiva, setCategoriaActiva] = useState('bebidas');
  const [subCategoriaActiva, setSubCategoriaActiva] = useState(
    Object.keys(productosData.bebidas)[0]
  );

  const productosPorCategoria = {
    bebidas: productosData.bebidas,
    comidas: productosData.comidas,
    postres: productosData.postres,
  };

  const handleRef = (c) => {
    if (c) {
      c.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const categoriaSeleccionadaProductos = (event) => {
    const valorSeleccionado = event.target.value;
    setCategoriaActiva(valorSeleccionado);

    const primeraSub = Object.keys(productosPorCategoria[valorSeleccionado])[0];
    setSubCategoriaActiva(primeraSub);
  };

  useEffect(() => {
    const contenedor_Principal = document.getElementsByClassName('contenedor_Principal')[0];
    setTimeout(() => {
      contenedor_Principal.classList.add('aparecimiento_suave');
    }, 500);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const newScrollY = window.scrollY;
      setScrollY(newScrollY);

      const newScale = Math.max(0.7, 1 - newScrollY / 1000);
      setScale(newScale);

      const newOpacity = Math.max(0, 1 - newScrollY / 300);
      setOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [registrado, setRegistrado] = useState(false);

  const gestionarCambio = () => {
    setRegistrado(!registrado);
  }

  return (
    <>
      <div className='contenedor_Principal'>
        <div className='hero'>
          <div className='hero_body'>
            <div className='sub_hero-body'>
              <span className='bienvenido'>Bienvenido al Restaurante:</span>
              <h1><i>Pan y Chocolate</i></h1>
              <span>
                <sup>un oasis</sup>
              </span>
              <div className='contenedor_boton-avanzar'>
                <button type="button" onClick={() => handleRef(contenedor2Ref)}>Avanzar</button>
              </div>
            </div>
        </div>
        <div className='hero_aside'>
            <div className='agrupador_imagenes'>
              <img className='primera_imagen' src="../../src/assets/oasis.png" alt="oasis" width={800} height={800} />
            </div>
        </div>
        </div>
      </div>
      <div className='contenedor_Principal-2' ref={contenedor2Ref}>
        <div className='hero_2'>
          <section className='titulo_y_otros-Productos-en-venta'>
            <div>
              <h2>Productos en venta:</h2>
              <div className='contenedor_botones'>
                <div className='contenedor_botones-registro'>
                  <MiniButton contenido={'🔄'} width={50} onClick={gestionarCambio} />
                  <Button
                    contenidoMovil={registrado ? 'I-S..' : 'Regis...'}
                    contenido={registrado ? 'Iniciar Sección' : 'Registrarse'}
                    btnUrl={'../../src/assets/logoInicioS.png'}
                    onClick={() => navigate( registrado  ? '/login': '/registro')}/>
                </div>
                <select name="selector" id="selector_categorias" value={categoriaActiva}
                  onChange={categoriaSeleccionadaProductos}>
                  <optgroup>
                    <option value="bebidas">Bebidas</option>
                    <option value="postres">Postres</option>
                    <option value="comidas">Comidas</option>
                  </optgroup>
                </select>
              </div>
            </div>
            <hr />
          </section>
          <div className="contenedor_Productos">
            <AnimatePresence mode="sync">
              {productosPorCategoria[categoriaActiva][subCategoriaActiva] &&
                Object.values(productosPorCategoria[categoriaActiva][subCategoriaActiva]).map((subProducto, index) => (
                  <motion.div
                    key={subProducto.nombreProducto + index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CartaProducto
                      url={subProducto.url}
                      nombreProducto={subProducto.nombreProducto}
                      onza={
                        Array.isArray(subProducto.onza) && subProducto.onza.length > 0
                          ? subProducto.onza.join('-')
                          : null
                      }
                      precioProducto={
                        Array.isArray(subProducto.precioProducto) && subProducto.precioProducto.length > 1
                          ? subProducto.precioProducto.join('-')
                          : subProducto.precioProducto[0]
                      }
                    />
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
          <section className='contenedor_Aside-Subproductos'>
            <div className='aside_Subproductos'>
              <div>
                <h4>Selecciona la subcategoria:</h4>
                <Button
                  contenidoMovil={'Sel'}
                  contenido={'Seleccionar'}
                  btnUrl={'../../src/assets/botonDesplegable.png'}
                  onClick={() => setMostrarClase('activo')}
                />
              </div>
            </div>      
            <div  className='aside_Subproductos2'>
              <div>
                <h4>Ver el <span>Carrito</span></h4>
                <Button
                  onClick={() => handleRef(contenedor3Ref)}
                  contenidoMovil={'Ver'}
                  contenido={'Ver'}
                  btnUrl={'../../src/assets/botonDesplegable.png'}
                />
              </div>
            </div>
            {mostrarClase === 'activo' && (
              <div className="overlay">
                <HiddenComp
                  onclick={() => setMostrarClase('')}
                  arreglo={productosPorCategoria[categoriaActiva]}
                  setSubCategoriaActiva={ setSubCategoriaActiva } />
              </div>
            )}
          </section>
        </div>
      </div>
      <div className='contenedor_Principal-3' ref={contenedor3Ref}>
        <div>

        </div>
      </div>
      <div className='contenedor_Footer'>
        <footer>
          <div className='primer_contenedor-Footer'>
            <h3>No dude en visitarnos</h3>
            <p>Abierto las <b>24 horas</b></p>
          </div>
          <div className='contenedor_intermedio-Footer'>
            <h4>&copy; 2026 Pan y Chocolate</h4>
            <p>Todos los derechos reservados</p>
          </div>
          <address className='segundo_contenedor-Footer'>
            <p>Calle: <b>_______</b></p>
            <p>Contacto: <a href="tel:51473847">51473847</a></p>
            <p>Correo: <a href="mailto:nombre@gmail.com">nombre@gmail.com</a></p>

          </address>
        </footer>
      </div>
    </>
  )
}