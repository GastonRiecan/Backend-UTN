import React from 'react'
import { useParams } from 'react-router-dom'
import useProductDetail from '../../Hooks/useProductDetail'

const DetailProductScreen = () => {
    const {product_id} = useParams()
    console.log({product_id})

    //Llamar al hook useProductDetail
    const { product_detail_state, product_detail_loading, product_detail_error} = useProductDetail(product_id)

    //Ya con estos estados pueden renderizar la UI con errores, detalles o loading
  return (
    <div>
        <h2>Detalle del producto</h2>
        {
          product_detail_loading 
          ? <h2>Cargando...</h2>
          :(
            product_detail_error 
            ? <h2>{product_detail_error}</h2>
            : <ProductDetail {...product_detail_state}/>
          )
        }
    </div>
  )
}


export default DetailProductScreen