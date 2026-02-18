import "./Pagination.css"

export type PaginationProps = {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    nextPage: number | null;
    prevPage: number | null;
    setPage: (page: number) => void;
};

export default function Pagination(
    {
        currentPage,
        totalPages,
        totalCount,
        nextPage,
        prevPage,
        setPage
    }: PaginationProps) {

    return (
        <div className="pagination">
            <button onClick={() => setPage(1)} disabled={currentPage === 1}>« First</button>
            <button onClick={() => prevPage && setPage(prevPage)} disabled={!prevPage}>← Prev</button>

            <span className="pagination-info">
                Page <strong>{currentPage}</strong> of {totalPages}
                <span className="dot">•</span>
                <span className="total-count">{totalCount.toLocaleString()} recipes</span>
            </span>

            <button onClick={() => nextPage && setPage(nextPage)} disabled={!nextPage}>Next →</button>
            <button onClick={() => setPage(totalPages)} disabled={currentPage === totalPages}>Last »</button>
        </div>
    );
}
