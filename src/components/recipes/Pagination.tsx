import styles from "./Pagination.module.css";

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
        <div className={styles.container}>
            <button onClick={() => setPage(1)} disabled={currentPage === 1}>« First</button>
            <button onClick={() => prevPage && setPage(prevPage)} disabled={!prevPage}>← Prev</button>

            <span className={styles.info}>
                Page <strong>{currentPage}</strong> of {totalPages}
                <span className={styles.dot}>•</span>
                <span className={styles.count}>{totalCount.toLocaleString()} recipes</span>
            </span>

            <button onClick={() => nextPage && setPage(nextPage)} disabled={!nextPage}>Next →</button>
            <button onClick={() => setPage(totalPages)} disabled={currentPage === totalPages}>Last »</button>
        </div>
    );
}
