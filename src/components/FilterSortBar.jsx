import React, { useState } from "react";
import { products } from "../data/products";
import { theme } from "../theme";

export default function FilterSortBar({ filter, setFilter, sort, setSort }) {
  const brands = Array.from(new Set(products.map(p => p.brand)));
  const types = Array.from(new Set(products.map(p => p.type)));

  return (
    <div style={{
      display: "flex",
      flexWrap: "wrap",
      gap: 12,
      alignItems: "center",
      margin: "0 0 22px 0",
      padding: "8px 0 8px 8px",
      background: "#232323",
      borderRadius: 10
    }}>
      <label style={{color: theme.text}}>Brand:</label>
      <select value={filter.brand} onChange={e => setFilter(f => ({...f, brand: e.target.value}))}>
        <option value="">All</option>
        {brands.map(b => <option key={b} value={b}>{b}</option>)}
      </select>
      <label style={{color: theme.text}}>Type:</label>
      <select value={filter.type} onChange={e => setFilter(f => ({...f, type: e.target.value}))}>
        <option value="">All</option>
        {types.map(t => <option key={t} value={t}>{t}</option>)}
      </select>
      <label style={{color: theme.text}}>Max Price:</label>
      <input
        type="number"
        style={{width: 70}}
        value={filter.price || ""}
        onChange={e => setFilter(f => ({...f, price: e.target.value}))}
        min="0"
        placeholder="No limit"
      />
      <label style={{color: theme.text}}>Sort:</label>
      <select value={sort} onChange={e => setSort(e.target.value)}>
        <option value="default">Default</option>
        <option value="priceAsc">Price &#8593;</option>
        <option value="priceDesc">Price &#8595;</option>
        <option value="az">Name A-Z</option>
        <option value="za">Name Z-A</option>
      </select>
    </div>
  );
}