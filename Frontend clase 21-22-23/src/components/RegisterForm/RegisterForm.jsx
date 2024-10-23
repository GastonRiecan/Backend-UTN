import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import extractFormData from "../../utils/extractFormData.js";

const RegisterForm = () => {
  const handleSubmitRegisterForm = (e) => {
    e.preventDefault();
    const form_HTML = e.target;
    const form_values = new FormData(form_HTML);
    const form_fields = {
      name: "",
      email: "",
      password: "",
    };

    const extractedForm = extractFormData(form_fields, form_values);
    console.log(extractedForm);

    fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", //Aca le indicamos al back que enviamos un JSON
      },
      body: JSON.stringify(extractedForm),
    })
      .then((responseHTTP) => {
        console.log({ responseHTTP });
        return responseHTTP.json()
      })
      .catch((error) => {
        console.error(error);
      })
      .then(
        (body) => {
          console.log({body});
          
        }
      )
      ;
  };
  return (
    <div className="register-form">
      <h1>Registrate en nuestra web</h1>
      <form onSubmit={handleSubmitRegisterForm}>
        <div>
          <label htmlFor="name">Ingrese su nombre:</label>
          <input name="name" id="name" placeholder="Pepe Suarez" />
        </div>
        <div>
          <label htmlFor="email">Ingrese su email:</label>
          <input name="email" id="email" placeholder="Pepe@gmail.com" />
        </div>
        <div>
          <label htmlFor="password">Ingrese su contraseña:</label>
          <input name="password" id="password" placeholder="***" />
        </div>
        <button type="submit">Registrar</button>
      </form>
      <span>
        Si ya tienes cuenta puedes ir a <Link to="/login">Login</Link>
      </span>
    </div>
  );
};

export default RegisterForm;
