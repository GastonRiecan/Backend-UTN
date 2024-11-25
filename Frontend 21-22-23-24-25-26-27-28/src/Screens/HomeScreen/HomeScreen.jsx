import React, { useEffect } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import { GET, getAuthenticatedHeaders } from "../../fetching/http.fetching";
import useProducts from "../../Hooks/useProducts";
import ProductList from "../../components/ProductList/ProductList";

const getProducts = async () => {
  const response = await GET("http://localhost:3000/api/products", {
    headers: getAuthenticatedHeaders(),
  });
  console.log('aaaaaaaaaaaaa',{ response });
};
const HomeScreen = () => {
  const user_info = JSON.parse(sessionStorage.getItem("user_info"));
  const { products, isLoadingProducts } = useProducts()
  console.log(products);
  

  return (
    <div>
      <h1>Bienvenido de vuelta {user_info.name}!</h1>
      <Link className="crear-link" to={"/product/new"}>Crear producto</Link>
      {
        isLoadingProducts
        ? <span>Cargando...</span>
        : <ProductList products={products}/>
      }
    </div>
  );
};








export default HomeScreen;
