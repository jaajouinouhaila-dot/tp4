import React from "react";
import RecipeItem from "./RecipeItem";

export default function RecipeList({ recipes, onEdit, onDuplicate, onDelete }) {
  if (recipes.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon">🥣</span>
        <h3>Aucune recette trouvée</h3>
        <p>Essaie une autre recherche ou ajoute une nouvelle recette.</p>
      </div>
    );
  }

  return (
    <div className="recipe-grid">
      {recipes.map((recipe) => (
        <RecipeItem
          key={recipe.id}
          recipe={recipe}
          onEdit={onEdit}
          onDuplicate={onDuplicate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
