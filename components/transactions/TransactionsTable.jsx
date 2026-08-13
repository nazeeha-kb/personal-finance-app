"use client"
import { useEffect, useState } from "react";

import {
  CaretDownIcon,
} from "@phosphor-icons/react/dist/ssr";

import { ApproximateEqualsIcon } from "@phosphor-icons/react";

import transactionData from "@/data/data.json";
import Search from "./Search";
import Transaction from "./Transaction";
import Pagination from "../Pagination";

const transactions = transactionData.transactions ?? [];
// const visibleTransactions = transactions.slice(0, 10);

export default function TransactionsTable() {
  const [search, setSearch] = useState("")
  // pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [transactionPerPage] = useState(10)

  // filtered transactions
  const filteredTransactions = transactions.filter((transaction) => {
    return transaction.name.toLowerCase().includes(search.toLowerCase());
  });

  // get current posts
  const indexOfLastTransaction = currentPage * transactionPerPage
  const indexOfFirstTransaction = indexOfLastTransaction - transactionPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  )

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <section className="rounded-[18px] border-[3px] border-[#77bfd9] bg-[#f5f5f3] p-3 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)] sm:p-4">
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Search onChange={(e) => setSearch(e.target.value)} value={search} />
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
          {currentTransactions.map((transaction, index) => {
            const isPositive = transaction.amount >= 0;

            return (
              <Transaction transaction={transaction} key={index} isPositive={isPositive} />
            );
          })}
        </div>
      </div>

      <Pagination itemPerPage={transactionPerPage} totalItems={transactions.length} paginate={paginate} currPage={currentPage} />

    </section>
  );
}
