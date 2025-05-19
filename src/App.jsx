import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { theme } from "./theme";
import ProductList from "./components/ProductList";
import BrandProducts from "./components/BrandProducts";
import ProductDetail from "./components/ProductDetail";
import CompareBar from "./components/CompareBar";
import "./App.css";

export default function App() {
  const [compare, setCompare] = useState([]);

  return (
    <div style={{ background: theme.background, minHeight: "100vh", color: theme.text }}>
      <Router>
        <CompareBar compare={compare} setCompare={setCompare} />
        <Routes>
          <Route path="/" element={<ProductList setCompare={setCompare} compare={compare} />} />
          <Route path="/brand/:brandName" element={<BrandProducts setCompare={setCompare} compare={compare} />} />
          <Route path="/product/:id" element={<ProductDetail setCompare={setCompare} compare={compare} />} />
          <Route path="/compare" element={<ProductList setCompare={setCompare} compare={compare} compareMode />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
}