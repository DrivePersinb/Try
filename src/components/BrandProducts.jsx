import React from "react";
import { useParams } from "react-router-dom";
import ProductList from "./ProductList";

export default function BrandProducts(props) {
  const { brandName } = useParams();
  return <ProductList {...props} brandFilter={brandName} />;
}