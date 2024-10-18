import React from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
  return (
		<div>
      <h1>Inicia sesiòn</h1>
      <form action="">
        <div>
          <label htmlFor="email">Ingrese su email:</label>
          <input email="email" id="email" placeholder="Pepe@gmail.com" />
        </div>
        <div>
          <label htmlFor="password">Ingrese su contraseña:</label>
          <input name="password" id="password" placeholder="***" />
        </div>
        <button type="submit">Iniciar sesion</button>
      </form>
      <span>
        Si aun no tienes cuenta puedes ir a <Link to="/register">Registrarte</Link>
      </span>
    </div>
	)
};

export default LoginForm;
