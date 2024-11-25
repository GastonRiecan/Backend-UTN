import React from 'react'
import { useParams } from 'react-router-dom'
import { useProductDetail } from '../../Hooks/useProductDetail'

const DetailProductScreen = () => {
    const { product_id } = useParams()
    //Llamar al hook useProductDetail
    const { product_detail } = useProductDetail()
  return (
    <div>
        <h2>Detalle del producto</h2>
    </div>
  )
}

export default DetailProductScreen