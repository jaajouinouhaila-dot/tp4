import React from "react";

export default function RecipeItem({ recipe, onEdit, onDuplicate, onDelete }) {
  const fallbackImage =
    "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80";

  return (
    <article className="recipe-card">
      <div className="recipe-image-wrap">
        <img
          className="recipe-image"
          src={recipe.image || fallbackImage}
          alt={recipe.name}
        />
        <span className="category-badge">{recipe.category}</span>
      </div>

      <div className="recipe-content">
        <div className="recipe-title-row">
          <h3>{recipe.name}</h3>
          <span className="difficulty" title={`Difficulté ${recipe.difficulty} sur 5`}>
            {"★".repeat(Number(recipe.difficulty))}{"☆".repeat(5 - Number(recipe.difficulty))}
          </span>
        </div>

        <p className="recipe-description">
          {recipe.description || "Aucune description pour cette recette."}
        </p>

        <h4>Ingrédients</h4>
        {recipe.ingredients.filter((item) => item.trim() !== "").length > 0 ? (
          <ul className="ingredient-list">
            {recipe.ingredients.filter((item) => item.trim() !== "").map((ingredient, index) => (
              <li key={`${ingredient}-${index}`}>{ingredient}</li>
            ))}
          </ul>
        ) : (
          <p className="muted">Aucun ingrédient ajouté.</p>
        )}

        <div className="card-actions">
          <button className="button button-light" onClick={() => onEdit(recipe)}>Modifier</button>
          <button className="button button-light" onClick={() => onDuplicate(recipe)}>Dupliquer</button>
          <button className="button button-danger" onClick={() => onDelete(recipe.id)}>Supprimer</button>
        </div>
      </div>
    </article>
  );
}
