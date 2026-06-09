import { supabase } from './supabase.js';
import { validarNombre, validarContraseña, validarTelefono } from '../utilidades/validaciones.js';
import { AdminContext } from "../App";
import { useContext } from "react";

export async function handler(event) {
  try {
    const body = JSON.parse(event.body);
    const datos = body.usuario;

    if (!validarNombre(datos.usuario)) {
      return { statusCode: 400, body: JSON.stringify({ error: "Nombre inválido" }) };
    }
    if (!validarContraseña(datos.password)) {
      return { statusCode: 400, body: JSON.stringify({ error: "Contraseña inválida" }) };
    }
    if (!validarTelefono(datos.telefono)) {
      return { statusCode: 400, body: JSON.stringify({ error: "Teléfono inválido" }) };
    }

    const { setAdminLoggueada } = useContext(AdminContext);

    if (datos.usuario === process.env.NOMBREADMIN && datos.password === process.env.PASSWORDADMIN) {
      setAdminLoggueada(true);
      alert("Admin logueada ✅");
    }

    const usuarioParaInsertar = {
      usuario: datos.usuario,
      contrasena: datos.password,
      telefono: datos.telefono,
      direccion: datos.direccion
    };

    const { data, error } = await supabase
      .from('usuarios')
      .insert([usuarioParaInsertar]);


    if (error) {
      return { statusCode: 400, body: JSON.stringify({ error: error.message }) };
    }

    return { statusCode: 200, body: JSON.stringify({ message: "Usuario registrado correctamente"}) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: "Error interno en registrarUsuario" }) };
  }
}