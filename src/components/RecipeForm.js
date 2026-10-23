import React, { useEffect, useState } from "react";

const emptyForm = {
  name: "",
  category: "Plat",
  ingredients: [""],
  difficulty: 3,
  description: "",
  image: ""
};

export default function RecipeForm({ recipe, onSave, onClose }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (recipe) {
      setForm({
        name: recipe.name || "",
        category: recipe.category || "Plat",
        ingredients: recipe.ingredients?.length ? [...recipe.ingredients] : [""],
        difficulty: Number(recipe.difficulty || 3),
        description: recipe.description || "",
        image: recipe.image || ""
      });
    } else {
      setForm(emptyForm);
    }
  }, [recipe]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function changeIngredient(index, value) {
    setForm((current) => ({
      ...current,
      ingredients: current.ingredients.map((item, i) => (i === index ? value : item))
    }));
  }

  function addIngredient() {
    setForm((current) => ({ ...current, ingredients: [...current.ingredients, ""] }));
  }

  function removeIngredient(index) {
    setForm((current) => {
      const next = current.ingredients.filter((_, i) => i !== index);
      return { ...current, ingredients: next.length ? next : [""] };
    });
  }

  function handleImage(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Choisis un fichier image.");
      event.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setForm((current) => ({ ...current, image: String(reader.result) }));
    reader.readAsDataURL(file);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!form.name.trim()) {
      alert("Le nom de la recette est obligatoire.");
      return;
    }
    const ingredients = form.ingredients.map((item) => item.trim()).filter(Boolean);
    onSave({
      ...(recipe || {}),
      ...form,
      name: form.name.trim(),
      ingredients,
      difficulty: Number(form.difficulty)
    });
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="form-title">
        <div className="modal-heading">
          <div>
            <p className="eyebrow">{recipe ? "METTRE À JOUR" : "NOUVELLE CRÉATION"}</p>
            <h2 id="form-title">{recipe ? "Modifier la recette" : "Créer une recette"}</h2>
          </div>
          <button className="close-button" type="button" onClick={onClose} aria-label="Fermer">×</button>
        </div>

        <form onSubmit={handleSubmit} className="recipe-form">
          <label>
            Nom de la recette *
            <input name="name" value={form.name} onChange={handleChange} required maxLength="80" placeholder="Ex. Tarte aux pommes" />
          </label>

          <label>
            Catégorie
            <select name="category" value={form.category} onChange={handleChange}>
              <option>Entrée</option>
              <option>Plat</option>
              <option>Dessert</option>
              <option>Boisson</option>
            </select>
          </label>

          <div className="field-group">
            <div className="field-label-row">
              <label>Ingrédients</label>
              <button type="button" className="text-button" onClick={addIngredient}>+ Ajouter un ingrédient</button>
            </div>
            {form.ingredients.map((ingredient, index) => (
              <div className="ingredient-input-row" key={index}>
                <input
                  value={ingredient}
                  onChange={(event) => changeIngredient(index, event.target.value)}
                  placeholder={`Ingrédient ${index + 1}`}
                  aria-label={`Ingrédient ${index + 1}`}
                />
                <button type="button" className="remove-ingredient" onClick={() => removeIngredient(index)} aria-label="Supprimer cet ingrédient">−</button>
              </div>
            ))}
          </div>

          <label>
            Difficulté : <strong>{form.difficulty}/5</strong>
            <input
              type="range"
              name="difficulty"
              min="1"
              max="5"
              value={form.difficulty}
              onChange={handleChange}
            />
            <span className="range-labels"><span>Facile</span><span>Difficile</span></span>
          </label>

          <label>
            Description courte
            <textarea name="description" value={form.description} onChange={handleChange} rows="3" maxLength="300" placeholder="Présente ta recette en quelques mots..." />
          </label>

          <label>
            Image
            <input type="file" accept="image/*" onChange={handleImage} />
          </label>

          {form.image && (
            <div className="image-preview">
              <img src={form.image} alt="Aperçu de la recette" />
              <button type="button" className="text-button" onClick={() => setForm((current) => ({ ...current, image: "" }))}>Retirer l’image</button>
            </div>
          )}

          <div className="form-actions">
            <button type="button" className="button button-light" onClick={onClose}>Annuler</button>
            <button type="submit" className="button button-primary">{recipe ? "Enregistrer les modifications" : "Enregistrer la recette"}</button>
          </div>
        </form>
      </section>
    </div>
  );
}
