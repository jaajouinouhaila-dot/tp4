import React, { useState } from "react";

export default function Aide() {
  const [open, setOpen] = useState(false);

  return (
    <section className="help-panel">
      <button className="help-toggle" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
        <span className="help-icon">?</span>
        <span><strong>Besoin d’aide ?</strong><small>Comment utiliser Creative Recipe Builder</small></span>
        <span className="help-chevron">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="help-content">
          <p><strong>1. Ajouter :</strong> clique sur « Créer une nouvelle recette », remplis le formulaire puis enregistre.</p>
          <p><strong>2. Ingrédients :</strong> utilise « Ajouter un ingrédient » pour ajouter des lignes. Le bouton − retire une ligne.</p>
          <p><strong>3. Modifier :</strong> clique sur « Modifier » sur la carte de la recette.</p>
          <p><strong>4. Dupliquer :</strong> crée une copie de la recette pour pouvoir la modifier séparément.</p>
          <p><strong>5. Supprimer :</strong> retire définitivement la recette de la liste affichée.</p>
          <p><strong>6. Rechercher :</strong> utilise la barre de recherche et le filtre de catégorie. La pagination permet de naviguer entre les pages.</p>
          <p className="help-note">Les recettes restent en mémoire tant que la page est ouverte. Un rechargement de la page réinitialise les données de démonstration.</p>
        </div>
      )}
    </section>
  );
}
