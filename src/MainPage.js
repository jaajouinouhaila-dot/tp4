import React, { useMemo, useState } from "react";
import RecipeList from "./components/RecipeList";
import RecipeForm from "./components/RecipeForm";
import RecipeFilter from "./components/RecipeFilter";
import Pagination from "./components/Pagination";
import Aide from "./components/Aide";

const initialRecipes = [
  {
    id: 1,
    name: "Pancakes moelleux",
    category: "Dessert",
    ingredients: ["Farine", "Lait", "Œufs", "Sucre", "Levure"],
    difficulty: 2,
    description: "De délicieux pancakes dorés, parfaits pour un petit-déjeuner gourmand.",
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 2,
    name: "Salade méditerranéenne",
    category: "Entrée",
    ingredients: ["Tomates", "Concombre", "Feta", "Olives", "Huile d’olive"],
    difficulty: 1,
    description: "Une salade fraîche et colorée inspirée des saveurs méditerranéennes.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 3,
    name: "Pâtes crémeuses",
    category: "Plat",
    ingredients: ["Pâtes", "Crème", "Ail", "Parmesan", "Poivre"],
    difficulty: 3,
    description: "Un plat simple et réconfortant à préparer en quelques minutes.",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 4,
    name: "Citronnade maison",
    category: "Boisson",
    ingredients: ["Citrons", "Eau", "Sucre", "Menthe"],
    difficulty: 1,
    description: "Une boisson rafraîchissante au citron et à la menthe.",
    image: "https://images.unsplash.com/photo-1513558161293-cdas5c01a2b?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 5,
    name: "Brownie au chocolat",
    category: "Dessert",
    ingredients: ["Chocolat", "Beurre", "Farine", "Œufs", "Sucre"],
    difficulty: 3,
    description: "Un brownie fondant au chocolat, à partager au goûter.",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 6,
    name: "Toast avocat",
    category: "Entrée",
    ingredients: ["Pain", "Avocat", "Citron", "Sel", "Poivre"],
    difficulty: 2,
    description: "Une tartine rapide, fraîche et savoureuse.",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80"
  }
];

export default function MainPage() {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Toutes");
  const [page, setPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const recipesPerPage = 4;

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesName = recipe.name.toLocaleLowerCase("fr").includes(search.toLocaleLowerCase("fr").trim());
      const matchesCategory = category === "Toutes" || recipe.category === category;
      return matchesName && matchesCategory;
    });
  }, [recipes, search, category]);

  const totalPages = Math.max(1, Math.ceil(filteredRecipes.length / recipesPerPage));
  const visibleRecipes = filteredRecipes.slice((page - 1) * recipesPerPage, page * recipesPerPage);

  function openCreateForm() {
    setEditingRecipe(null);
    setFormOpen(true);
  }

  function openEditForm(recipe) {
    setEditingRecipe(recipe);
    setFormOpen(true);
  }

  function saveRecipe(formData) {
    if (editingRecipe) {
      setRecipes((current) => current.map((item) => item.id === editingRecipe.id ? { ...formData, id: editingRecipe.id } : item));
    } else {
      const newRecipe = { ...formData, id: Date.now() };
      setRecipes((current) => [newRecipe, ...current]);
      setPage(1);
    }
    setFormOpen(false);
    setEditingRecipe(null);
  }

  function deleteRecipe(id) {
    const recipe = recipes.find((item) => item.id === id);
    if (window.confirm(`Voulez-vous supprimer la recette « ${recipe?.name || ""} » ?`)) {
      setRecipes((current) => current.filter((item) => item.id !== id));
      setPage(1);
    }
  }

  function duplicateRecipe(recipe) {
    const copy = { ...recipe, id: Date.now(), name: `${recipe.name} (copie)`, ingredients: [...recipe.ingredients] };
    setRecipes((current) => [copy, ...current]);
    setPage(1);
  }

  function changeSearch(value) {
    setSearch(value);
    setPage(1);
  }

  function changeCategory(value) {
    setCategory(value);
    setPage(1);
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#accueil" aria-label="Creative Recipe Builder, accueil">
          <span className="brand-mark">✳</span>
          <span>creative<span className="brand-light"> kitchen</span></span>
        </a>
        <span className="topbar-label">TON CARNET DE RECETTES</span>
      </header>

      <main id="accueil" className="main-container">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">CUISINER • CRÉER • PARTAGER</p>
            <h1>Chaque recette<br />raconte <em>une histoire.</em></h1>
            <p className="hero-description">Imagine tes prochaines créations, rassemble tes ingrédients préférés et construis ton propre carnet de cuisine.</p>
            <button className="button button-primary hero-button" onClick={openCreateForm}>
              <span>＋</span> Créer une nouvelle recette
            </button>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="hero-image"></div>
            <div className="floating-note"><span>♡</span><div><strong>Fait avec amour</strong><small>et une pincée de créativité</small></div></div>
            <span className="hero-sparkle sparkle-one">✳</span>
            <span className="hero-sparkle sparkle-two">✦</span>
          </div>
        </section>

        <section className="section-heading">
          <div>
            <p className="eyebrow">LE CARNET PERSONNEL</p>
            <h2>Mes recettes <span>({filteredRecipes.length})</span></h2>
          </div>
          <p className="section-caption">Des idées simples, des saveurs uniques.</p>
        </section>

        <RecipeFilter
          search={search}
          setSearch={changeSearch}
          category={category}
          setCategory={changeCategory}
        />

        <RecipeList
          recipes={visibleRecipes}
          onEdit={openEditForm}
          onDuplicate={duplicateRecipe}
          onDelete={deleteRecipe}
        />

        <Pagination currentPage={Math.min(page, totalPages)} totalPages={totalPages} onPageChange={setPage} />
        <Aide />
      </main>

      <footer className="footer">
        <span className="brand-mark">✳</span>
        <p>Creative Recipe Builder</p>
        <span>Un projet fait avec ♥ et React</span>
      </footer>

      {formOpen && (
        <RecipeForm
          recipe={editingRecipe}
          onSave={saveRecipe}
          onClose={() => { setFormOpen(false); setEditingRecipe(null); }}
        />
      )}
    </div>
  );
}
