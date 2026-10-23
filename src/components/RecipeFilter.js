import React from "react";

export default function RecipeFilter({ search, setSearch, category, setCategory }) {
  return (
    <section className="filter-bar" aria-label="Filtres des recettes">
      <label className="search-field">
        <span>⌕</span>
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Rechercher une recette..."
          aria-label="Rechercher par nom"
        />
      </label>
      <label className="category-filter">
        <span>Catégorie</span>
        <select value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="Toutes">Toutes les catégories</option>
          <option value="Entrée">Entrée</option>
          <option value="Plat">Plat</option>
          <option value="Dessert">Dessert</option>
          <option value="Boisson">Boisson</option>
        </select>
      </label>
    </section>
  );
}
