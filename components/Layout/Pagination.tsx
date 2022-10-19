import { Dispatch, SetStateAction } from "react";

interface PaginationProps {
  data: any[];
  pageIndex: number;
  setPageIndex: Dispatch<SetStateAction<number>>;
  pageSize: number; // no. of elements in a page
  pageCount: number; // no. of pages
}

const Pagination = ({
  data,
  pageIndex,
  setPageIndex,
  pageSize,
  pageCount,
}: PaginationProps) => {
  return (
    <nav
      className="flex justify-between items-center pt-4"
      aria-label="Table navigation"
    >
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
        Showing{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {Math.min(pageIndex * pageSize + 1, data.length)}-
          {Math.min((pageIndex + 1) * pageSize, data.length)}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {data.length}
        </span>
      </span>
      <ul className="inline-flex items-center -space-x-px">
        <li>
          <button
            className={"pagination-item rounded-l-lg"}
            disabled={pageIndex === 0}
            onClick={() => setPageIndex((prev) => prev - 1)}
          >
            <span className="sr-only">Previous</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </li>
        {new Array(pageCount).fill(0).map((_, index) => {
          if (
            Math.abs(pageIndex - index) <= 1 ||
            (pageIndex === 0 && index === pageIndex + 2) ||
            (pageIndex === pageCount - 1 && index === pageIndex - 2)
          ) {
            return (
              <li key={index}>
                <button
                  onClick={() => setPageIndex(index)}
                  className={`pagination-item`}
                  disabled={pageIndex === index}
                >
                  {index + 1}
                </button>
              </li>
            );
          }
        })}
        <li>
          <button
            className={`pagination-item rounded-r-lg`}
            disabled={pageIndex === pageCount - 1}
            onClick={() => setPageIndex((prev) => prev + 1)}
          >
            <span className="sr-only">Next</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
