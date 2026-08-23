"use client"
import { useEffect, useState } from "react";


import { ApproximateEqualsIcon } from "@phosphor-icons/react";

import transactionData from "@/data/data.json";
import Search from "./Search";
import Transaction from "./Transaction";
import Pagination from "../Pagination";
import Categories from "./Categories";
import SortBy from "./SortBy";

const transactions = transactionData.transactions ?? [];

export default function TransactionsTable() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all transactions")
  const [sort, setSort] = useState("latest")
  // pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [transactionPerPage] = useState(10)

  // Normalize text

  // filtered transactions
  const filteredTransactions = transactions.filter((transaction) => {

    // Matches search
    const matchesSearch = transaction.name
      .toLowerCase()
      .includes(search.toLowerCase());

    // Matches Category
    if (category === "all transactions") {

      return matchesSearch;

    }
    const matchesCategory = transaction.category.toLowerCase() == category;
    return matchesSearch && matchesCategory;
  });

  // get current transactions
  const indexOfLastTransaction = currentPage * transactionPerPage
  const indexOfFirstTransaction = indexOfLastTransaction - transactionPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  )

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)


  // category change

  const handleCategoryChagne = (selectedCategory) => {
    setCategory(selectedCategory.toLowerCase())
  }

  // Sort change

  const handleSortChagne = (selectedSort) => {
    setSort(selectedSort.toLowerCase())
  }

  // Titlecasing
  const toTitleCase = (text) => {
    return text
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <section className="rounded-[18px] border-[3px] border-[#77bfd9] bg-[#f5f5f3] p-3 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)] sm:p-4">
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Search onChange={(e) => setSearch(e.target.value)} value={search} />
          <SortBy onClick={handleSortChagne} currSort={toTitleCase(sort)} />
        </div>
        <Categories onClick={handleCategoryChagne} currCategory={toTitleCase(category)} />
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
