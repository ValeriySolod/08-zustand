'use client';

import css from './Pagination.module.css';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const handlePrev = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      onPageChange(page + 1);
    }
  };

  return (
    <div className={css.pagination}>
      <button
        type="button"
        className={css.button}
        onClick={handlePrev}
        disabled={page === 1}
      >
        Previous
      </button>

      <span className={css.text}>
        Page {page} of {totalPages}
      </span>

      <button
        type="button"
        className={css.button}
        onClick={handleNext}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
}