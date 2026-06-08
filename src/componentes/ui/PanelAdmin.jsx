import { useState, useEffect } from 'react';
import '../../estilos/panelAdmin.css';
import { supabase } from "../../servicios/supabase.js";


const seleccionarSubcategoria = (categoria) => {
  switch (categoria) {
    case 'bebidas': return ['COMÚN', 'COCTELES', 'CAFES', 'CERVEZAS'];
    case 'postres': return ['POSTRES', 'HELADOS'];
    case 'comidas': return ['COMIDAS', 'HAMBURGUESAS', 'BOCADILLOS', 'PIZZAS'];
    default: return [];
  }
};

export const Panel = ({ categoriaActiva, categoriaSeleccionadaProductos }) => {
  
  const [arregloSubproductos, setArregloSubproductos] = useState([]);
  const [subcategoriaActiva, setSubcategoriaActiva] = useState("");

  useEffect(() => {
    const subcategorias = seleccionarSubcategoria(categoriaActiva);
    setArregloSubproductos(subcategorias);
    setSubcategoriaActiva(subcategorias[0] || "");
  }, [categoriaActiva]);

  const manejarSubmit = async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  // archivo seleccionado
  const file = formData.get("imagenProducto");

  if (!file || file.size === 0) {
    alert("Debes seleccionar una imagen");
    return;
  }

  // generar nombre único con timestamp
  const nombreSeguro = `${Date.now()}_${file.name
    .normalize("NFD")              // quita acentos
    .replace(/[\u0300-\u036f]/g, "") 
    .replace(/[^a-zA-Z0-9._-]/g, "_")}`; // reemplaza emojis y símbolos por _

    // subir a Supabase Storage
    const { data, error } = await supabase.storage
      .from("imagenes-productos")
      .upload(`productos/${nombreSeguro}`, file);

    if (error) {
      console.error("Error al subir imagen:", error.message);
      return;
    }

    // obtener URL pública
    const urlPublica = supabase.storage
      .from("imagenes-productos")
      .getPublicUrl(`productos/${nombreSeguro}`)
      .data.publicUrl;

    // construir objeto producto
    const producto = {
      nombreproducto: formData.get("nombreProducto"),
      precioproducto: parseFloat(formData.get("precioProducto")),
      url: urlPublica,
      stock: parseInt(formData.get("stockProducto")),
      categoria: categoriaActiva,
      subcategoria: subcategoriaActiva
    };

    // Enviar al backend
    const response = await fetch('/.netlify/functions/guardarProducto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(producto)
    });

    const result = await response.json();

    if (response.ok) {
      alert("Producto insertado correctamente ✅");
      console.log("Producto guardado:", result.data?.[0]);
      event.target.reset();
    } else {
      alert("Error al insertar producto ❌");
      console.error(result.error);
    }
  };

  return (
    <section className='seccion_PanelAdmin-contenedor'>
      <form className='seccion_PanelAdmin' onSubmit={manejarSubmit}>
        <div>
          <h2>----PANEL ADMINISTRATIVO----</h2>
          <hr />
        </div>
        <div>
          <section className='contenedor_absoluto'>
            <div className='selectorCategoria'>
              <select name="selector_categorias" id="selector_categorias" value={categoriaActiva}
                  onChange={categoriaSeleccionadaProductos}>
                  <optgroup>
                    <option value="bebidas">Bebidas</option>
                    <option value="postres">Postres</option>
                    <option value="comidas">Comidas</option>
                  </optgroup>
              </select>
              <select name="selector_Subcategorias"
                id="selector_Subcategorias"
                value={subcategoriaActiva}
                onChange={(e) => setSubcategoriaActiva(e.target.value)}>
                  <optgroup>
                  {arregloSubproductos.map((producto, index) => (
                    <option key={index} value={producto}>{ producto }</option>
                  ))}
                  </optgroup>
              </select>
            </div>
            <div className='contenedor_imagen'>
              <label>
                <p>Selecciona la imagen:</p>
              </label>
              <input type="file" name="imagenProducto" id="imagenProducto" /> 
            </div>
            <div className='contenedor_caracteristicas'>
              <label htmlFor="nombreProducto">
                <p>Nombre:</p>
                <input type="text" name="nombreProducto" id="nombreProducto" />
              </label>
              <label htmlFor="precioProducto">
                <p>Precio:</p>
                <input type="text" name="precioProducto" id="precioProducto" />
              </label>
              <label htmlFor="stockProducto">
                <p>Stock:</p>
                <input type="number" name="stockProducto" id="stockProducto" />
              </label>
            </div>
            <div className='contenedor_boton'>
              <button type="submit" className='agregarProducto'>Agregar</button>
            </div>
          </section>
        </div>
      </form>
    </section>
  )
}