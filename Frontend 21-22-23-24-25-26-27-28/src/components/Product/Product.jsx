import React from 'react'

const Product = ({title, price, stock, description, image_base_64, id}) => {
  return (
    <div>
        <h2>{title}</h2>
        <img 
              src={image_base_64}
              alt={title}/>
              width={'200'} 
        <span>Precio: ${price}</span>
        <Link to={'/product/' + id}>Ir a detalle</Link>
    </div>
  )
}

export default Product