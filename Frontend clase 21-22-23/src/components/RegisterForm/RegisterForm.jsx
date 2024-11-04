import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import extractFormData from "../../utils/extractFormData.js";
import useCustomForm from "../../Hooks/useCustomForm.jsx";
import { POST } from "../../fetching/http.fetching.js";

const RegisterForm = () => {

  const form_fields = {
    name: "",
    email: "",
    password: "",
  };

  const { form_vaules_state, handleChangeInputValue } = useCustomForm(form_fields);

  const handleSubmitRegisterForm = async (e) => {
    try {
    e.preventDefault();
    const form_HTML = e.target;
    const form_Values = new FormData(form_HTML);

    const form_values_object = extractFormData(form_fields, form_Values);

    const body = await POST("http://localhost:3000/api/auth/register", form_values_object)

    if (!body.ok) {
      //setError
    }
    console.log({ body });
  } catch (error) {
    //Errores se manejan aqui
  }

      
  };
  return (
    <div className="register-form">
      <h1>Registrate en nuestra web</h1>
      <form onSubmit={handleSubmitRegisterForm}>
        <div>
          <label htmlFor="name">Ingrese su nombre:</label>
          <input
            name="name"
            id="name"
            placeholder="Pepe Suarez"
            onChange={handleChangeInputValue}
          />
        </div>
        <div>
          <label htmlFor="email">Ingrese su email:</label>
          <input
            name="email"
            id="email"
            placeholder="Pepe@gmail.com"
            onChange={handleChangeInputValue}
          />
        </div>
        <div>
          <label htmlFor="password">Ingrese su contraseña:</label>
          <input
            name="password"
            id="password"
            placeholder="***"
            onChange={handleChangeInputValue}
          />
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
