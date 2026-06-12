// Importa estilos y dependencias necesarias
import '../../estilos/main_layout.css';
import { useState, useEffect, useRef, useContext, useMemo } from 'react';
import { AuthContext } from '../../App';
import { Button } from '../ui/Boton'; // Botón reutilizable
import { CartaProducto } from '../ui/CartaProducto'; // Tarjeta de producto
import { ComponenteOculto } from '../ui/ComponenteOculto'; // Panel oculto para elegir subcategorías
import { useNavigate } from 'react-router-dom'; // Para cambiar de página
import { AnimatePresence } from 'framer-motion'; // Animaciones de entrada/salida
import { MiniBoton } from '../ui/MiniBoton'; // Botón pequeño reutilizable
import { Estadisticas } from '../ui/Estadisticas'; // Resumen del carrito
import { EfectoEntrada } from './EfectoEntrada';
import { Panel } from '../ui/PanelAdmin.jsx';
import { ComponenteError } from '../ui/ComponenteError.jsx';
import { gestionarCompra } from '../../utilidades/gestionarCompra.js';

export const Layout = ({ usuario, telefono, municipioActivo, contador, precioMensajeria }) => {
  // Referencias a contenedores
  const contenedor2Ref = useRef(null);
  const contenedor3Ref = useRef(null);
  const [mostrarClase, setMostrarClase] = useState('');

  const navigate = useNavigate();
  const handleRef = (miRef) => {
    if (miRef.current) {
      miRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Estado para productos de la BD
  const [productosBD, setProductosBD] = useState([]);

  // Agrupar productos por categoría y subcategoría
  const productosPorCategoria2 = useMemo(() => {
    return productosBD.reduce((acc, producto) => {
      const { categoria, subcategoria } = producto;

      if (!acc[categoria]) {
        acc[categoria] = {};
      }
      if (!acc[categoria][subcategoria]) {
        acc[categoria][subcategoria] = [];
      }

      acc[categoria][subcategoria].push(producto);
      return acc;
    }, {});
  }, [productosBD]);

  // Estados para categorías y carrito
  const [categoriaActiva, setCategoriaActiva] = useState('bebidas');
  const [subCategoriaActiva, setSubCategoriaActiva] = useState('');
  const [carrito, setCarrito] = useState([]);
  const [cantidadProductos, setCantidadProductos] = useState(0);
  const [totalPrecioProductoSumado, setTotalPrecioProductoSumado] = useState(0);

  // Cambiar categoría activa y fijar primera subcategoría
  const categoriaSeleccionadaProductos = (event) => {
    const valorSeleccionado = event.target.value;
    setCategoriaActiva(valorSeleccionado);

    if (productosPorCategoria2[valorSeleccionado]) {
      const primeraSub = Object.keys(productosPorCategoria2[valorSeleccionado])[0];
      setSubCategoriaActiva(primeraSub || '');
    }
  };

  // Animaciones iniciales
  useEffect(() => {
    const supTitulo = document.getElementsByClassName('bienvenido')[0];
    const tituloPrincipal = document.getElementsByClassName('titulo_principal')[0];
    const subTitulo = document.getElementsByClassName('mini_mensaje')[0];
    const tituloBoton = document.getElementsByClassName('boton_avanzar')[0];
    const imagenPrincipal = document.getElementsByClassName('primera_imagen')[0];

    setTimeout(() => {
      supTitulo?.classList.add('aparecimiento_suave-Arriba');
      tituloPrincipal?.classList.add('aparecimiento_suave-Abajo');
      subTitulo?.classList.add('aparecimiento_suave-Derecha');
      tituloBoton?.classList.add('aparecimiento_suave-Izquierda');
      imagenPrincipal?.classList.add('aparecimiento_suave-Centro');
    }, 300);
  }, []);

  // Estado para login/registro
  const [cambioEstado, setCambioEstado] = useState(false);
  const gestionarCambio = () => setCambioEstado(!cambioEstado);

  // Eliminar producto del carrito
  const gestionarEliminacion = (nombre) => {
    setCarrito((prev) => {
      const nuevoCarrito = prev.filter((p) => p.nombreproducto !== nombre);

      setCantidadProductos(nuevoCarrito.length);

      const nuevoTotal = nuevoCarrito.reduce((acc, producto) => acc + producto.precioproducto * producto.cantidad, 0);
      setTotalPrecioProductoSumado(nuevoTotal);

      return nuevoCarrito;
    });
  };

  const { isLoggedIn } = useContext(AuthContext);

  // Datos del usuario
  const infoUser = {
    id: contador,
    nombre: usuario,
    telefono: telefono,
    direccion: municipioActivo,
    precioMensajeria: precioMensajeria,
  };

  // Obtener productos desde backend
  useEffect(() => {
    const fetchProductos = async () => {
      const response = await fetch('/.netlify/functions/obtenerProducto');
      const result = await response.json();

      if (response.ok) {
        setProductosBD(result.productos);
      } else {
        console.error('Error al obtener productos:', result.error);
      }
    };

    fetchProductos();
  }, []);

  return (
    <>
      <div className="contenedor_Principal">
        <div className="hero">
          <div className="hero_body">
            <div className="sub_hero-body">
              <span className="bienvenido">Bienvenido al Restaurante:</span>
              <h1 className="titulo_principal">
                <i>Pan y Chocolate</i>
              </h1>
              <span className="mini_mensaje">
                <sup>un oasis</sup>
              </span>
              <div className="contenedor_boton-avanzar">
                <button className="boton_avanzar" type="button" onClick={() => handleRef(contenedor2Ref)}>
                  Avanzar
                </button>
              </div>
            </div>
          </div>
          <div className="hero_aside">
            <div className="agrupador_imagenes">
              <img className="primera_imagen" src="/oasis.png" alt="oasis" width={800} height={800} />
            </div>
          </div>
        </div>
      </div>
      {/* --- SEGUNDA PAGINA ---*/}
      <span ref={contenedor2Ref}></span>
      <EfectoEntrada trigger={0.8}>
        <div className="contenedor_Principal-2">
          <div className="hero_2">
            <section className="titulo_y_otros-Productos-en-venta">
              <div>
                <h2>Productos en venta:</h2>
                <div className="contenedor_botones">
                  <div className="contenedor_botones-registro">
                    {!isLoggedIn && (
                      <>
                        <MiniBoton
                          contenido={
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="23 4 23 10 17 10" />
                              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                            </svg>
                          }
                          width={50}
                          onClick={gestionarCambio}
                        />
                        <Button
                          contenidoMovil={cambioEstado ? 'I-S..' : 'Regis...'}
                          contenido={
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              {cambioEstado ? 'Iniciar Sesión' : 'Registrarse'}
                              {cambioEstado ? (
                                // Ícono login
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="18"
                                  height="18"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M10 17l5-5-5-5" />
                                  <path d="M20 12H10" />
                                  <path d="M4 4h6v16H4z" />
                                </svg>
                              ) : (
                                // Ícono usuario
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="18"
                                  height="18"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <circle cx="12" cy="7" r="4" />
                                  <path d="M5.5 21a8.38 8.38 0 0 1 13 0" />
                                </svg>
                              )}
                            </span>
                          }
                          btnUrl={'/logoInicioS.png'}
                          onClick={() => navigate(cambioEstado ? '/login' : '/registro')}
                        />
                      </>
                    )}
                  </div>
                  <select name="selector" id="selector_categorias" value={categoriaActiva} onChange={categoriaSeleccionadaProductos}>
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

            {/* Contenedor de productos renderizados dinámicamente en sus Cartas*/}
            <div className="contenedor_Productos">
              <AnimatePresence mode="sync">
                {productosPorCategoria2[categoriaActiva] &&
                  productosPorCategoria2[categoriaActiva][subCategoriaActiva] &&
                  productosPorCategoria2[categoriaActiva][subCategoriaActiva].map((subProducto, index) => (
                    <motion.div key={subProducto.id || index} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }}>
                      <CartaProducto
                        subProducto={subProducto}
                        carrito={carrito}
                        setCarrito={setCarrito}
                        cantidadProductos={cantidadProductos}
                        setCantidadProductos={setCantidadProductos}
                        totalPrecioProductoSumado={totalPrecioProductoSumado}
                        setTotalPrecioProductoSumado={setTotalPrecioProductoSumado}
                      />
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>
            <section className="contenedor_Aside-Subproductos">
              <div className="aside_Subproductos">
                <div>
                  <h4>Selecciona la subcategoria:</h4>
                  <Button
                    contenidoMovil={'Sel'}
                    contenido={
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        Seleccionar
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </span>
                    }
                    onClick={() => setMostrarClase('activo')}
                  />
                </div>
              </div>
              <div className="aside_Subproductos2">
                <div>
                  <h4>
                    Ver el <span>Carrito</span>
                  </h4>
                  <Button
                    onClick={() => handleRef(contenedor3Ref)}
                    contenidoMovil={
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    }
                    contenido={
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        Ver
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </span>
                    }
                  />
                </div>
              </div>
              {mostrarClase === 'activo' && (
                <div className="overlay">
                  <ComponenteOculto onclick={() => setMostrarClase('')} arreglo={productosPorCategoria2[categoriaActiva]} setSubCategoriaActiva={setSubCategoriaActiva} />
                </div>
              )}
            </section>
          </div>
        </div>
      </EfectoEntrada>

      {/* TERCERA PAGINA */}
      <EfectoEntrada trigger={0.8}>
        <div className="contenedor_Principal-3" ref={contenedor3Ref}>
          <div>
            <h3>Productos agregados:</h3>
            <hr />
            <div className="contenedor_secundario-Carrito">
              <div className="mega_contenedor_listaProductos">
                <div className="contenedor_lista-Productos">
                  <ul className="lista_productos-Agg">
                    {carrito.map((producto, index) => {
                      // Calculamos subtotal de cada producto
                      const subtotal = producto.precioProducto * producto.cantidad;
                      return (
                        <li key={index}>
                          <div className="contenidoLista">
                            <span>
                              <strong>{producto.nombreProducto}</strong>
                              {' - Cantidad: '}
                              {producto.cantidad}
                              {' - Precio: $'}
                              {producto.precioProducto}
                              {' - Subtotal: $'}
                              {subtotal}
                            </span>
                            <MiniBoton
                              color={'hsla(0, 0%, 88%, 0.78)'}
                              contenido={
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <polyline points="3 6 5 6 21 6"></polyline>
                                  <path d="M19 6l-1 14H6L5 6"></path>
                                  <path d="M10 11v6"></path>
                                  <path d="M14 11v6"></path>
                                  <path d="M9 6V4h6v2"></path>
                                </svg>
                              }
                              width={40}
                              onClick={() => gestionarEliminacion(producto.nombreProducto)}
                            />
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Botón de comprar */}
                <div className="contenedor_boton-Carrito">
                  <Button
                    onClick={async () => gestionarCompra(infoUser, carrito, cantidadProductos, totalPrecioProductoSumado)}
                    contenidoMovil={'Comprar'}
                    contenido={
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        Comprar
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="9" cy="21" r="1" />
                          <circle cx="20" cy="21" r="1" />
                          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                      </span>
                    }
                  />
                </div>
              </div>

              {/* Estadísticas generales */}
              <div className="contenedor_estadisticas">
                <Estadisticas
                  cantidadProductos={cantidadProductos} // número de productos distintos
                  totalPrecioProductoSumado={totalPrecioProductoSumado} // suma de precios de todos los productos
                  carrito={carrito} // lista completa de productos en el carrito
                  infoUser={infoUser}
                />
              </div>
            </div>
          </div>
        </div>
      </EfectoEntrada>

      <Panel categoriaActiva={categoriaActiva} categoriaSeleccionadaProductos={categoriaSeleccionadaProductos} />

      {/* FOOTER */}
      <div className="contenedor_Footer">
        <footer>
          <div className="sub_contenedor-Footer">
            <div className="primer_contenedor-Footer">
              <h3>No dude en visitarnos</h3>
              <p>
                Abierto las <b>24 horas</b>
              </p>
            </div>
            <div className="contenedor_intermedio-Footer">
              <h4>&copy; 2026 Pan y Chocolate</h4>
              <p>Todos los derechos reservados</p>
            </div>
          </div>
          <div className="contenedor_QR">
            <address className="segundo_contenedor-Footer">
              <p>
                Calle Infanta e/ calle Neptuno y calle Concordia, <br />
                Centro Habana, La Habana
              </p>
              <p>
                Contacto: <a href="tel:51473847">51473847</a>
              </p>
            </address>
            <div>
              <img src="/codigoQR.jpg" alt="codigo QR" width={150} />
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};
