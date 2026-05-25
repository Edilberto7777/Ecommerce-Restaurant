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
import { Estadisticas } from '../ui/Estadisticas';

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
  const [carrito, setCarrito] = useState([]);
  const [cantidadProductos, setCantidadProductos] = useState(0);
  const [totalPrecioProductoSumado, setTotalPrecioProductoSumado] = useState(0);

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
    const supTitulo = document.getElementsByClassName('bienvenido')[0];
    const tituloPrincipal = document.getElementsByClassName('titulo_principal')[0];
    const subTitulo = document.getElementsByClassName('mini_mensaje')[0];
    const tituloBoton = document.getElementsByClassName('boton_avanzar')[0];
    const imagenPrincipal = document.getElementsByClassName('primera_imagen')[0];

    setTimeout(() => {
      supTitulo.classList.add('aparecimiento_suave-Arriba');
      tituloPrincipal.classList.add('aparecimiento_suave-Abajo');
      subTitulo.classList.add('aparecimiento_suave-Derecha');
      tituloBoton.classList.add('aparecimiento_suave-Izquierda');
      imagenPrincipal.classList.add('aparecimiento_suave-Centro');
    }, 300);
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

  const gestionarEliminacion = (nombre) => {
    setCarrito(prev => prev.filter(p => p.nombreProducto !== nombre));
  }

  const [valorInputCantidadProducto, setValorInputCantidadProducto] = useState(0);

  return (
    <>
      <div className='contenedor_Principal'>
        <div className='hero'>
          <div className='hero_body'>
            <div className='sub_hero-body'>
              <span className='bienvenido'>Bienvenido al Restaurante:</span>
              <h1 className='titulo_principal'><i>Pan y Chocolate</i></h1>
              <span className='mini_mensaje'>
                <sup>un oasis</sup>
              </span>
              <div className='contenedor_boton-avanzar'>
                <button className='boton_avanzar' type="button" onClick={() => handleRef(contenedor2Ref)}>Avanzar</button>
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
      {/* --- SEGUNDA PAGINA ---*/}
      <div className='contenedor_Principal-2' ref={contenedor2Ref} >
        <div className='hero_2'>
          <section className='titulo_y_otros-Productos-en-venta'>
            <div>
              <h2>Productos en venta:</h2>
              <div className='contenedor_botones'>
                <div className='contenedor_botones-registro'>
                  <MiniButton contenido={<svg xmlns="http://www.w3.org/2000/svg" 
                    width="20" height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" stroke="white" 
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="23 4 23 10 17 10" />
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                </svg>
                } width={50} onClick={gestionarCambio} />
                  <Button
                    contenidoMovil={registrado ? 'I-S..' : 'Regis...'}
                    contenido={<span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {registrado ? 'Iniciar Sesión' : 'Registrarse'}
                    {registrado ? (
                      // Ícono login
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" 
                           viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                           strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10 17l5-5-5-5" />
                        <path d="M20 12H10" />
                        <path d="M4 4h6v16H4z" />
                      </svg>
                    ) : (
                      // Ícono usuario
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" 
                           viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                           strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="7" r="4" />
                        <path d="M5.5 21a8.38 8.38 0 0 1 13 0" />
                      </svg>
                    )}
                  </span>}
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
                      subProducto={subProducto}
                      carrito={carrito}
                      setCarrito={setCarrito}
                      cantidadProductos={cantidadProductos}
                      setCantidadProductos={setCantidadProductos}
                      totalPrecioProductoSumado={totalPrecioProductoSumado}
                      setTotalPrecioProductoSumado={setTotalPrecioProductoSumado}
                      valorInputCantidadProducto={valorInputCantidadProducto}
                      setValorInputCantidadProducto={setValorInputCantidadProducto}
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
                  contenido={
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      Seleccionar
                      <svg xmlns="http://www.w3.org/2000/svg" 
                           width="18" height="18" 
                           viewBox="0 0 24 24" 
                           fill="none" stroke="currentColor" 
                           strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  }
                  onClick={() => setMostrarClase('activo')}
                />
              </div>
            </div>      
            <div  className='aside_Subproductos2'>
              <div>
                <h4>Ver el <span>Carrito</span></h4>
                <Button
                  onClick={() => handleRef(contenedor3Ref)}
                  contenidoMovil={
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        width="18" height="18" 
                        viewBox="0 0 24 24" 
                        fill="none" stroke="currentColor" 
                        strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>}
                  contenido={
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      Ver
                      <svg xmlns="http://www.w3.org/2000/svg" 
                           width="18" height="18" 
                           viewBox="0 0 24 24" 
                           fill="none" stroke="currentColor" 
                           strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  }
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
          <h3>Productos agregados:</h3>
          <hr />
          <div className='contenedor_secundario-Carrito'>
            <div className='mega_contenedor_listaProductos'>
                          <div className='contenedor_lista-Productos'>
            <ul className='lista_productos-Agg'>
              {carrito.map((producto, index) => (
                <li key={index}>{`${producto.nombreProducto} - ${producto.cantidad} `}<MiniButton
                  color={'hsla(0, 0%, 88%, 0.78)'}
                  contenido={
                    <svg
                      xmlns="http://www.w3.org/2000/svg" 
                      width="24" height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" stroke="currentColor" 
                      stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6l-1 14H6L5 6"></path>
                    <path d="M10 11v6"></path>
                    <path d="M14 11v6"></path>
                    <path d="M9 6V4h6v2"></path>
                  </svg>
                  }
                  width={40}
                  onClick={() => gestionarEliminacion(producto.nombreProducto)}/></li>
              ))}
            </ul>
            </div>
            <div className='contenedor_boton-Carrito'>
                <Button contenido={
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      Comprar
                      <svg xmlns="http://www.w3.org/2000/svg" 
                         width="24" height="24" 
                         viewBox="0 0 24 24" 
                         fill="none" stroke="currentColor" 
                         stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="9" cy="21" r="1" />
                      <circle cx="20" cy="21" r="1" />
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                  </span>
              }/>
            </div>
            </div>
          <div className='contenedor_estadisticas'>
              <Estadisticas cantidadProductos={cantidadProductos}
                totalPrecioProductoSumado={totalPrecioProductoSumado}/>
          </div>
          </div>
        </div>
      </div>
      <div className='contenedor_Footer'>
        <footer>
          <div className='sub_contenedor-Footer'>
            <div className='primer_contenedor-Footer'>
              <h3>No dude en visitarnos</h3>
              <p>Abierto las <b>24 horas</b></p>
            </div>
            <div className='contenedor_intermedio-Footer'>
              <h4>&copy; 2026 Pan y Chocolate</h4>
              <p>Todos los derechos reservados</p>
            </div>
          </div>
          <div className='contenedor_QR'>
            <address className='segundo_contenedor-Footer'>
              <p>Calle Infanta e/ calle Neptuno y calle Concordia, <br />
                Centro Habana, La Habana</p>
              <p>Contacto: <a href="tel:51473847">51473847</a></p>
            </address>
            <div>
              <img src="../../src/assets/codigoQR.jpg" alt="codigo QR"  width={150}/>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}