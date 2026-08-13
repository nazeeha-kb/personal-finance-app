import {
    ArrowLeftIcon,
    ArrowRightIcon
} from "@phosphor-icons/react";

export default function Pagination({ itemPerPage, totalItems, paginate, currPage }) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
                type="button"
                className="flex items-center gap-2 rounded-xl border border-[#d9d4ce] bg-[#f7f5f2] px-3 py-2 text-sm font-medium text-grey-900"
                onClick={() => paginate(currPage - 1)}
            >
                <ArrowLeftIcon weight="bold" className="size-4" />
                <span>Prev</span>
            </button>

            <ul className="flex items-center justify-center gap-2">
                {pageNumbers.map((number) => (
                    <li
                        key={number}
                    >
                        <button
                            onClick={() => paginate(number)}
                            className={`flex size-9 items-center justify-center rounded-md border text-sm font-semibold transition-colors duration-300 ${number === currPage
                                ? "border-[#1b1b1d] bg-[#1b1b1d] text-white"
                                : "border-[#d9d4ce] bg-[#f7f5f2] text-grey-900 hover:bg-[#1b1b1d]/10"
                                }`}

                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>

            <button
                type="button"
                className="flex items-center gap-2 rounded-xl border border-[#d9d4ce] bg-[#f7f5f2] px-3 py-2 text-sm font-medium text-grey-900"
                onClick={() => paginate(currPage + 1)}

            >
                <span>Next</span>
                <ArrowRightIcon weight="bold" className="size-4" />
            </button>
        </div>
    )
}