import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/products";
import { theme } from "../theme";

function BuyLinksModal({ buyLinks, onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.6)",
        zIndex: 1002,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
      onClick={onClose}
    >
      <div
        style={{
          minWidth: 320,
          maxWidth: 400,
          background: theme.card,
          color: theme.text,
          borderRadius: 12,
          boxShadow: "0 6px 32px rgba(0,0,0,0.9)",
          padding: 28,
          zIndex: 1003,
          position: "relative"
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{
          position: "absolute",
          right: 14,
          top: 10,
          fontSize: 22,
          cursor: "pointer",
          color: "#fff"
        }} onClick={onClose}>&times;</div>
        <h2 style={{marginTop:0, marginBottom: 16, fontSize: 24}}>Buy from</h2>
        {buyLinks.length ? (
          <ul style={{listStyle: "none", padding: 0, margin: 0}}>
            {buyLinks.map((link, idx) => (
              <li key={idx} style={{margin: "18px 0"}}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: theme.accent,
                    fontWeight: "bold",
                    fontSize: 18,
                    textDecoration: "none",
                    background: "#222",
                    borderRadius: 6,
                    padding: "10px 18px",
                    display: "inline-block"
                  }}
                >
                  {link.site}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div style={{fontSize: 16, color: "#aaa"}}>Links not available yet.</div>
        )}
      </div>
    </div>
  );
}

export default function ProductDetail({ setCompare, compare }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const [showBuy, setShowBuy] = useState(false);

  if (!product) return <div style={{ color: theme.text }}>Product not found</div>;

  return (
    <div style={{
      maxWidth: 700,
      margin: "32px auto",
      background: theme.card,
      color: theme.text,
      borderRadius: 16,
      padding: 32,
      boxShadow: "0 2px 16px rgba(0,0,0,0.8)",
      display: "flex",
      gap: 32
    }}>
      <img src={product.image} alt={product.name} style={{ width: 240, borderRadius: 8 }} loading="eager" />
      <div style={{flex: 1}}>
        <h1 style={{ marginTop: 0 }}>{product.name}</h1>
        <h3 style={{ marginBottom: 6 }}>{product.type} <span style={{fontSize: 15, color: theme.accent, marginLeft: 10}}>{product.brand}</span></h3>
        <div style={{ fontWeight: "bold", fontSize: 22 }}>${product.price}</div>
        <ul style={{ marginTop: 20 }}>
          {product.specs.map((s, i) => (<li key={i}><b>{s.label}:</b> {s.value}</li>))}
        </ul>
        <div style={{display: "flex", gap: 16, marginTop: 32}}>
          <button
            style={{
              padding: "10px 24px",
              background: theme.accent,
              color: "#fff",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: 16,
              outline: "none"
            }}
            onClick={() => setCompare((prev) => prev.includes(product.id) ? prev : [...prev, product.id])}
          >
            Add to Compare
          </button>
          <button
            style={{
              padding: "10px 24px",
              background: "#212121",
              color: theme.accent,
              border: `1px solid ${theme.accent}`,
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: 16,
              outline: "none"
            }}
            onClick={() => setShowBuy(true)}
          >
            Buy Now
          </button>
        </div>
        {showBuy && (
          <BuyLinksModal buyLinks={product.buyLinks || []} onClose={() => setShowBuy(false)} />
        )}
      </div>
    </div>
  );
}