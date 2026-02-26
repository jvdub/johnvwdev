import Link from "next/link";

type BlogPaginationProps = {
  currentPage: number;
  totalPages: number;
  hrefForPage: (page: number) => string;
};

export function BlogPagination({
  currentPage,
  totalPages,
  hrefForPage,
}: BlogPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav
      className="mt-10 flex items-center justify-between gap-4"
      aria-label="Blog pagination"
    >
      <div>
        {prevPage ? (
          <Link
            href={hrefForPage(prevPage)}
            rel="prev"
            className="inline-flex rounded-md border border-border px-3 py-2 text-sm hover:bg-surface"
          >
            ← Newer posts
          </Link>
        ) : null}
      </div>

      <div className="flex items-center gap-2">
        <p className="text-sm text-fg-muted" aria-live="polite">
          Page {currentPage} of {totalPages}
        </p>
        <ol className="flex items-center gap-1" aria-label="Page numbers">
          {pages.map((page) => (
            <li key={page}>
              <Link
                href={hrefForPage(page)}
                aria-current={page === currentPage ? "page" : undefined}
                className={`inline-flex min-w-8 justify-center rounded-md border px-2 py-1 text-sm ${
                  page === currentPage
                    ? "border-border bg-surface font-semibold"
                    : "border-border hover:bg-surface"
                }`}
              >
                {page}
              </Link>
            </li>
          ))}
        </ol>
      </div>

      <div>
        {nextPage ? (
          <Link
            href={hrefForPage(nextPage)}
            rel="next"
            className="inline-flex rounded-md border border-border px-3 py-2 text-sm hover:bg-surface"
          >
            Older posts →
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
