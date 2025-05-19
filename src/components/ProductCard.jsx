import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { theme } from "../theme";

export default function ProductCard({ id, brand, name, type, price, image, setCompare, compare, compareMode }) {
  const navigate = useNavigate();
  const isSelected = compare.includes(id);

  return (
    <div
      style={{
        background: theme.card,
        color: theme.text,
        width: 260,
        borderRadius: 12,
        boxShadow: isSelected ? `0 0 0 2px ${theme.accent}` : "0 2px 8px rgba(0,0,0,0.6)",
        padding: 16,
        cursor: "pointer",
        transition: "box-shadow 0.2s",
        position: "relative",
        margin: "8px 0"
      }}
      onClick={() =>
        compareMode
          ? setCompare((prev) => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
          : navigate(`/product/${id}`)
      }
    >
      <img src={image} alt={name} style={{ width: "100%", borderRadius: 8, marginBottom: 12 }} loading="lazy" />
      <div style={{fontSize: 13, marginBottom: 2}}>
        <Link
          to={`/brand/${encodeURIComponent(brand)}`}
          style={{ color: theme.accent, textDecoration: "none" }}
          onClick={e => e.stopPropagation()}
        >
          {brand}
        </Link>
      </div>
      <h3 style={{ margin: "8px 0" }}>{name}</h3>
      <div>{type}</div>
      <div style={{ fontWeight: "bold", marginTop: 4 }}>${price}</div>
      {compareMode && (
        <div
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: isSelected ? theme.accent : "#222",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: "bold",
            fontSize: 16,
            border: `2px solid ${isSelected ? theme.accent : "#666"}`,
          }}
        >
          {isSelected ? "✓" : "+"}
        </div>
      )}
    </div>
  );
}