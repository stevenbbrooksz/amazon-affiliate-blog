import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const [inputPage, setInputPage] = useState(currentPage.toString());

  useEffect(() => {
    setInputPage(currentPage.toString());
  }, [currentPage]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPage(e.target.value);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const page = parseInt(inputPage);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      onPageChange(page);
    } else {
      setInputPage(currentPage.toString());
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className="mt-12 flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition-all hover:bg-gray-50 hover:text-orange-600 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-600 shadow-sm"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        
        <div className="flex items-center gap-1.5">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum: number;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }

            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`flex h-10 w-10 items-center justify-center rounded-xl font-bold transition-all ${
                  currentPage === pageNum
                    ? "bg-orange-600 text-white shadow-lg shadow-orange-200"
                    : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-orange-600 shadow-sm"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition-all hover:bg-gray-50 hover:text-orange-600 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-600 shadow-sm"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-500">
          Page <span className="text-gray-900">{currentPage}</span> of <span className="text-gray-900">{totalPages}</span>
        </span>
        <form onSubmit={handleInputSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={inputPage}
            onChange={handleInputChange}
            className="w-12 rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-center text-sm font-bold text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
          />
          <button
            type="submit"
            className="rounded-lg bg-gray-900 px-3 py-2 text-[10px] font-black uppercase tracking-widest text-white transition-all hover:bg-orange-600"
          >
            Go
          </button>
        </form>
      </div>
    </div>
  );
};
