// Importa estilos y dependencias necesarias
import './main_layout.css'
import { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/Buttons'; // Botón reutilizable
import { CartaProducto } from '../ui/CartaProducto'; // Tarjeta de producto
import productosData from '../../src/data/productos.json'; // Datos de productos
import { HiddenComp } from '../ui/HiddenComp';  // Panel oculto para elegir subcategorías
import { useNavigate } from 'react-router-dom'; // Para cambiar de página
import { motion } from 'framer-motion'; // Animaciones
import { AnimatePresence } from 'framer-motion'; // Animaciones de entrada/salida
import { MiniButton } from '../ui/MiniButton'; // Botón pequeño reutilizable
import { Estadisticas } from '../ui/Estadisticas'; // Resumen del carrito
import { FadeOnScroll } from './FadeOnScroll';

export const Layout = ({usuario, telefono, municipioActivo, contador, precioMensajeria}) => {

  // Referencias a contenedores para hacer scroll automático
  const contenedor2Ref = useRef(null);
  const contenedor3Ref = useRef(null);

  // Estados para animaciones con scroll
  const [scrollY, setScrollY] = useState(0);   // posición vertical de la página
  const [scale, setScale] = useState(1);       // tamaño de elementos (escala)
  const [opacity, setOpacity] = useState(1);   // transparencia de elementos
  const [mostrarClase, setMostrarClase] = useState(''); // controla si se muestra un panel oculto

  const navigate = useNavigate(); // Permite navegar entre páginas (ej: login, registro)

  // Estados para categorías y carrito
  const [categoriaActiva, setCategoriaActiva] = useState('bebidas'); // categoría seleccionada por defecto
  const [subCategoriaActiva, setSubCategoriaActiva] = useState(
    Object.keys(productosData.bebidas)[0] // primera subcategoría de bebidas
  );
  const [carrito, setCarrito] = useState([]); // productos agregados al carrito
  const [cantidadProductos, setCantidadProductos] = useState(0); // cantidad total de productos
  const [totalPrecioProductoSumado, setTotalPrecioProductoSumado] = useState(0); // suma de precios

  // Objeto que organiza productos por categoría
  const productosPorCategoria = {
    bebidas: productosData.bebidas,
    comidas: productosData.comidas,
    postres: productosData.postres,
  };

  // Función para hacer scroll suave hacia un contenedor específico
  const handleRef = (c) => {
    if (c) {
      c.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Cambiar categoría activa y actualizar subcategoría
  const categoriaSeleccionadaProductos = (event) => {
    const valorSeleccionado = event.target.value;
    setCategoriaActiva(valorSeleccionado);

    // Selecciona automáticamente la primera subcategoría de la categoría elegida
    const primeraSub = Object.keys(productosPorCategoria[valorSeleccionado])[0];
    setSubCategoriaActiva(primeraSub);
  };

  // Animaciones iniciales al montar el componente (cuando aparece la página)
  useEffect(() => {
    const supTitulo = document.getElementsByClassName('bienvenido')[0];
    const tituloPrincipal = document.getElementsByClassName('titulo_principal')[0];
    const subTitulo = document.getElementsByClassName('mini_mensaje')[0];
    const tituloBoton = document.getElementsByClassName('boton_avanzar')[0];
    const imagenPrincipal = document.getElementsByClassName('primera_imagen')[0];

    // Después de 300ms, añade clases CSS para animar cada elemento
    setTimeout(() => {
      supTitulo.classList.add('aparecimiento_suave-Arriba');
      tituloPrincipal.classList.add('aparecimiento_suave-Abajo');
      subTitulo.classList.add('aparecimiento_suave-Derecha');
      tituloBoton.classList.add('aparecimiento_suave-Izquierda');
      imagenPrincipal.classList.add('aparecimiento_suave-Centro');
    }, 300);
  }, []);

  // Estado para saber si el usuario está registrado
  const [registrado, setRegistrado] = useState(false);

  // Cambiar estado de registro (true/false)
  const gestionarCambio = () => {
    setRegistrado(!registrado);
  }

  // Eliminar producto del carrito por nombre
  const gestionarEliminacion = (nombre) => {
  setCarrito(prev => {
    const nuevoCarrito = prev.filter(p => p.nombreProducto !== nombre);

    // recalcular cantidad de productos distintos
    setCantidadProductos(nuevoCarrito.length);

    // recalcular suma total de precios
    const nuevoTotal = nuevoCarrito.reduce(
      (acc, producto) => acc + (producto.precioProducto * producto.cantidad),
      0
    );
    setTotalPrecioProductoSumado(nuevoTotal);

    return nuevoCarrito;
  });
};

  useEffect(() => {
    // Selecciona todos los elementos que quieres animar
    const elementos = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Cuando el elemento entra en pantalla, añade la clase visible
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 } // se activa cuando el 20% del elemento es visible
    );

    elementos.forEach((el) => observer.observe(el));

    return () => {
      elementos.forEach((el) => observer.unobserve(el));
    };
  }, []);

  
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
      <FadeOnScroll trigger={0.8}>
        <div
        className='contenedor_Principal-2'
        ref={contenedor2Ref}>
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
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

          {/* Contenedor de productos renderizados dinámicamente en sus Cartas*/}
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
      </FadeOnScroll>
      {/* TERCERA PAGINA */}
      <FadeOnScroll trigger={0.8}>
  <div
    className='contenedor_Principal-3'
    style={{ 
      transform: `scale(${scale})`, 
      opacity: opacity 
    }}
    ref={contenedor3Ref}
  >
    <div>
      <h3>Productos agregados:</h3>
      <hr />
      <div className='contenedor_secundario-Carrito'>
        <div className='mega_contenedor_listaProductos'>
          <div className='contenedor_lista-Productos'>
            <ul className='lista_productos-Agg'>
              {carrito.map((producto, index) => {
                // Calculamos subtotal de cada producto
                const subtotal = producto.precioProducto * producto.cantidad;
                return (
                  <li key={index}>
                    <div className='contenidoLista'>
                      <span>
                        <strong>{producto.nombreProducto}</strong>  
                        {" - Cantidad: "}{producto.cantidad}  
                        {" - Precio: $"}{producto.precioProducto}  
                        {" - Subtotal: $"}{subtotal}
                      </span>
                      <MiniButton
                        color={'hsla(0, 0%, 88%, 0.78)'}
                        contenido={
                          <svg
                            xmlns="http://www.w3.org/2000/svg" 
                            width="24" height="24" 
                            viewBox="0 0 24 24" 
                            fill="none" stroke="currentColor" 
                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
          <div className='contenedor_boton-Carrito'>
            <Button 
              contenido={
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  Comprar
                  <svg xmlns="http://www.w3.org/2000/svg" 
                    width="24" height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" stroke="currentColor" 
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        <div className='contenedor_estadisticas'>
          <Estadisticas 
            cantidadProductos={cantidadProductos}                 // número de productos distintos
            totalPrecioProductoSumado={totalPrecioProductoSumado} // suma de precios de todos los productos
            carrito={carrito}                                     // lista completa de productos en el carrito
            userInfo={{                                           // datos del usuario
              id: contador,
              nombre: usuario,
              telefono: telefono,
              direccion: municipioActivo,
              precioMensajeria: precioMensajeria
            }}
          />
        </div>
      </div>
    </div>
  </div>
</FadeOnScroll>


      {/* FOOTER */}
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