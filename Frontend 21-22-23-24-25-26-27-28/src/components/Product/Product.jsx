import React from "react";
import { Link } from "react-router-dom";


const Product = ({title, price, stock, descripcion, image_base_64, id}) => {
  return (
    <div>
      <span> ID: {id}</span>
      <h2>{title}</h2>
      <img 
        src={image_base_64} 
        alt={title} 
        width={'200'} 
      />
      <span> Precio: ${price}</span>
      <span> Stock: {stock}</span>
      <span> Descripcion: {descripcion}</span>
    </div>
  )
}

export default Product;
