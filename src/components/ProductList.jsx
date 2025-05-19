import React, { useState } from "react";
import { products } from "../data/products";
import ProductCard from "./ProductCard";
import FilterSortBar from "./FilterSortBar";
import CompareTable from "./CompareTable";
import GoogleAd from "./GoogleAd";

function applyFilters(productList, filter, sort) {
  let filtered = productList;
  if (filter.brand) filtered = filtered.filter(p => p.brand === filter.brand);
  if (filter.type) filtered = filtered.filter(p => p.type === filter.type);
  if (filter.price) filtered = filtered.filter(p => p.price <= Number(filter.price));
  switch(sort) {
    case "priceAsc": filtered = filtered.slice().sort((a,b)=>a.price-b.price); break;
    case "priceDesc": filtered = filtered.slice().sort((a,b)=>b.price-a.price); break;
    case "az": filtered = filtered.slice().sort((a,b)=>a.name.localeCompare(b.name)); break;
    case "za": filtered = filtered.slice().sort((a,b)=>b.name.localeCompare(a.name)); break;
    default: break;
  }
  return filtered;
}

export default function ProductList({ setCompare, compare, compareMode, brandFilter }) {
  const [filter, setFilter] = useState({ brand: brandFilter || "", type: "", price: "" });
  const [sort, setSort] = useState("default");

  let filteredProducts = applyFilters(products, filter, sort);

  if (compareMode && compare.length >= 2) {
    return <CompareTable compare={compare} setCompare={setCompare} />;
  }

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>
      <GoogleAd slot="top" />
      <FilterSortBar filter={filter} setFilter={setFilter} sort={sort} setSort={setSort} />
      <div style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "center" }}>
        {filteredProducts.map((product, idx) => (
          <React.Fragment key={product.id}>
            <ProductCard
              {...product}
              setCompare={setCompare}
              compare={compare}
              compareMode={compareMode}
            />
            {(idx + 1) % 3 === 0 && <GoogleAd slot="inline" />}
          </React.Fragment>
        ))}
        {filteredProducts.length === 0 && (
          <div style={{ color: "#aaa", fontSize: 18, marginTop: 60 }}>No products found.</div>
        )}
      </div>
    </div>
  );
}