import Image from "next/image";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CaretDownIcon,
  MagnifyingGlassIcon,
} from "@phosphor-icons/react/dist/ssr";

import transactionData from "@/data/data.json";

const transactions = transactionData.transactions ?? [];
const visibleTransactions = transactions.slice(0, 10);

function formatDate(isoDate) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(isoDate));
}

function formatCurrency(value) {
  const absolute = Math.abs(value);
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(absolute);

  return `${value >= 0 ? "+" : "-"}${formatted}`;
}

function getAvatarSrc(avatarPath) {
  if (!avatarPath) return "/images/logo-small.svg";

  if (avatarPath.startsWith("./assets/images/avatars/")) {
    return `/avatars/${avatarPath.split("/").pop()}`;
  }

  return avatarPath;
}

export default function TransactionsTable() {
  return (
    <section className="rounded-[18px] border-[3px] border-[#77bfd9] bg-[#f5f5f3] p-3 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)] sm:p-4">
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="flex w-full items-center gap-3 rounded-xl border border-[#cfc9c0] bg-[#f7f5f2] px-3 py-2.5 text-sm text-grey-500 shadow-sm sm:w-[270px]">
            <MagnifyingGlassIcon weight="bold" className="size-4 shrink-0 text-[#7d7d7d]" />
            <input
              type="text"
              placeholder="Search transaction..."
              aria-label="Search transaction"
              className="w-full bg-transparent text-sm text-grey-900 placeholder:text-[#7d7d7d] focus:outline-none"
            />
          </label>

          <button
            type="button"
            aria-label="Sort transactions"
            className="flex items-center justify-between gap-3 rounded-xl border border-[#cfc9c0] bg-[#f7f5f2] px-3 py-2.5 text-sm font-medium text-grey-900 shadow-sm sm:min-w-[150px]"
          >
            <span>Sort by</span>
            <span className="flex items-center gap-1 text-[#4b4b4b]">
              <span className="font-semibold">Latest</span>
              <CaretDownIcon weight="fill" className="size-4" />
            </span>
          </button>
        </div>

        <button
          type="button"
          aria-label="Filter by category"
          className="flex items-center justify-between gap-3 rounded-xl border border-[#cfc9c0] bg-[#f7f5f2] px-3 py-2.5 text-sm font-medium text-grey-900 shadow-sm sm:min-w-[170px]"
        >
          <span>Category</span>
          <span className="flex items-center gap-1 text-[#4b4b4b]">
            <span>All Transactions</span>
            <CaretDownIcon weight="fill" className="size-4" />
          </span>
        </button>
      </div>

      <div className="overflow-hidden rounded-[12px] border border-[#d6d0cb] bg-[#f0f0ee]">
        <div className="grid grid-cols-[1.8fr_0.9fr_0.8fr_0.6fr] items-center border-b border-[#d6d0cb] bg-[#f3f1ef] px-3 py-3 text-xs font-semibold uppercase tracking-[0.04em] text-[#6c6c6c] sm:px-4">
          <span>Recipient / Sender</span>
          <span>Category</span>
          <span>Date</span>
          <span className="text-right">Amount</span>
        </div>

        <div>
          {visibleTransactions.map((transaction, index) => {
            const isPositive = transaction.amount >= 0;

            return (
              <div
                key={`${transaction.name}-${transaction.date}-${index}`}
                className="grid grid-cols-[1.8fr_0.9fr_0.8fr_0.6fr] items-center border-b border-[#d9d5d1] px-3 py-3 text-sm last:border-b-0 sm:px-4"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={getAvatarSrc(transaction.avatar)}
                    alt={transaction.name}
                    width={36}
                    height={36}
                    className="h-9 w-9 rounded-full object-cover ring-1 ring-[#d4d1cc]"
                  />
                  <span className="truncate font-semibold text-grey-900">{transaction.name}</span>
                </div>

                <span className="text-grey-900">{transaction.category}</span>

                <span className="text-grey-900">{formatDate(transaction.date)}</span>

                <span
                  className={`text-right font-semibold ${
                    isPositive ? "text-[#1a8a70]" : "text-grey-900"
                  }`}
                >
                  {formatCurrency(transaction.amount)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          className="flex items-center gap-2 rounded-xl border border-[#d9d4ce] bg-[#f7f5f2] px-3 py-2 text-sm font-medium text-grey-900"
        >
          <ArrowLeftIcon weight="bold" className="size-4" />
          <span>Prev</span>
        </button>

        <div className="flex items-center justify-center gap-2">
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              type="button"
              className={`flex size-9 items-center justify-center rounded-md border text-sm font-semibold ${
                page === 1
                  ? "border-[#1b1b1d] bg-[#1b1b1d] text-white"
                  : "border-[#d9d4ce] bg-[#f7f5f2] text-grey-900"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="flex items-center gap-2 rounded-xl border border-[#d9d4ce] bg-[#f7f5f2] px-3 py-2 text-sm font-medium text-grey-900"
        >
          <span>Next</span>
          <ArrowRightIcon weight="bold" className="size-4" />
        </button>
      </div>
    </section>
  );
}
