type PaginationProps = {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 text-sm md:text-base mt-4">
      <button
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        onClick={() => onPageChange(1)}
        disabled={page === 1}
      >
        ⏮ Primera
      </button>
      <button
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        ← Anterior
      </button>
      <span className="px-2 py-1">
        Página {page} de {totalPages}
      </span>
      <button
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Siguiente →
      </button>
      <button
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        onClick={() => onPageChange(totalPages)}
        disabled={page === totalPages}
      >
        Última ⏭
      </button>
    </div>
  )
}
