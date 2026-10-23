import React from "react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <nav className="pagination" aria-label="Pagination">
      <button className="page-button" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
        ← Précédent
      </button>
      <span>Page <strong>{currentPage}</strong> sur {totalPages}</span>
      <button className="page-button" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
        Suivant →
      </button>
    </nav>
  );
}
