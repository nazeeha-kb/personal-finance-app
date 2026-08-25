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

    // Sort

    // latest, oldest, atoz, ztoa, highest 

    return matchesSearch && matchesCategory;
  });

  // Sorting
  const sortTransactions = (transactions, sort) => {
    return [...transactions].sort((a, b) => {
      switch (sort) {
        case "latest":
          return new Date(b.date) - new Date(a.date);

        case "oldest":
          return new Date(a.date) - new Date(b.date);

        case "a to z":
          return a.name.localeCompare(b.name);

        case "z to a":
          return b.name.localeCompare(a.name);

        case "highest":
          return b.amount - a.amount;

        case "lowest":
          return a.amount - b.amount;

        default:
          return 0;
      }
    });
  };

  const sortedTransactions = sortTransactions(
    filteredTransactions,
    sort
  );

  // get current transactions
  const indexOfLastTransaction = currentPage * transactionPerPage
  const indexOfFirstTransaction = indexOfLastTransaction - transactionPerPage;
  const currentTransactions = sortedTransactions.slice(
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
    <section className="rounded-[18px] bg-white p-3  sm:p-4">
      <div className="mb-4 mt-2 flex gap-3 lg:items-center justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Search onChange={(e) => setSearch(e.target.value)} value={search} />
        </div>
        <div className="flex lg:gap-6 gap-4">
          <SortBy onClick={handleSortChagne} currSort={toTitleCase(sort)} />
          <Categories onClick={handleCategoryChagne} currCategory={toTitleCase(category)} />
        </div>
      </div>

      <div className="overflow-hidden py-4 border-b border-[#d6d0cb]">
        <div className="grid-cols-[1.8fr_0.9fr_0.8fr_0.6fr] items-center border-b border-[#d6d0cb] px-3 py-3 text-xs font-semibold uppercase tracking-[0.04em] text-[#6c6c6c] sm:px-4 md:grid hidden">
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
