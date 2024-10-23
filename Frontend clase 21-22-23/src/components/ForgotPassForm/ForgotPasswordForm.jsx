import React from "react";
import { Link } from "react-router-dom";
import extractFormData from "../../utils/extractFormData.js";
import "./styles.css";

const ForgotPasswordForm = () => {
  const handleSubmitLoginForm = (e) => {
    e.preventDefault();
    const form_HTML = e.target;
    const form_Values = new FormData(form_HTML);
    const form_fields = {
      email: "",
    };
    const form_values_object = extractFormData(form_fields, form_Values);
    fetch("http://localhost:3000/api/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", //Aca le indicamos al back que lo que enviamos es un JSON
      },
      body: JSON.stringify(form_values_object),
    })
      .then((response) => {
        console.log({ response });
        return response.json();
      })
      .then((body) => {
        console.log({ body });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <form className="forgot-form" onSubmit={handleSubmitLoginForm}>
        <h1>Olvide mi contraseña</h1>
        <p>
          Enviaremos un mail a tu email de usuario para enviarte los pasos de
          restablecimiento de la contraseña.
        </p>
        <div>
          <label htmlFor="email">Ingrese su email:</label>
          <input name="email" id="email" placeholder="pepe@gmail.com" />
        </div>
        <button type="submit">Enviar mail</button>
        <span>
          Si tienes cuenta puedes <Link to="/login">iniciar sesion</Link>
        </span>
        <span>
          Si aun no tienes cuenta puedes <Link to="/register">Registrarte</Link>
        </span>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
