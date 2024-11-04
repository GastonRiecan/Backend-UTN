import React, { useState } from "react";

const CreateProductScreen = () => {

const [image, setImage] = useState() 


  const handleSubmitNewProduct = async (e) => {
    try {
      e.preventDefault();
      const form_HTML = e.target;
      const form_Values = new FormData(form_HTML);
      const form_fields = {
        email: "",
        password: "",
      };
      const form_values_object = extractFormData(form_fields, form_Values);
      const response = await POST(
        "http://localhost:3000/api/auth/login",
        form_values_object
      );
      console.log({ response });
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setErrorState(
        error.message ||
          "Hubo un problema al conectarse al servidor. Intenta nuevamente más tarde."
      );
    }
  }
	const handleChangeFile = (e) => {
		//Buscar el archivo que fue subido por ese input
		const file_Found = e.target.files[0]
		const lector_archivos = new FileReader()
		//Le decimos al lector de archivos qie cuando termine de cargar nos ejecute "x" callback
		lector_archivos.onloadend = () => {
				console.log('Carga finalizada');
				console.log(lector_archivos.result);
				setImage(lector_archivos.result)
			}
		//Si hay archivo leelo
		if(file_Found) {
			lector_archivos.readAsDataURL(file_Found)
		}
	}

  return (
    <div>
      <form onSubmit={handleSubmitNewProduct}>
        <div>
          <label htmlFor="titulo">Ingrese el titulo:</label>
          <input name="titulo" id="titulo" />
        </div>
        <div>
          <label htmlFor="precio">Ingrese el precio:</label>
          <input name="precio" id="precio" />
        </div>
        <div>
          <label htmlFor="stock">Ingrese el stock:</label>
          <input name="stock" id="stock" />
        </div>
        <div>
          <label htmlFor="descripcion">Ingrese la descripcion:</label>
          <textarea name="descripcion" id="descripcion"></textarea>
        </div>
        <div>
          <label htmlFor="categoria">Ingrese la categoria:</label>
          <input name="categoria" id="categoria" />
        </div>
        <div>
			{
				image && <img src={image}/>
			}
          <label htmlFor="imagen">Seleccione una imagen:</label>
          <input name="imagen" id="imagen" type="file" onChange={handleChangeFile} accept="image/*" />
        </div>
        <button type="submit">Crear el producto</button>
      </form>
    </div>
  );
};

export default CreateProductScreen;
