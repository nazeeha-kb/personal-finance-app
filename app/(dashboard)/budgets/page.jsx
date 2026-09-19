"use client"

import Image from "next/image"
import { DotsThreeIcon, PlusIcon } from "@phosphor-icons/react/dist/ssr"

import budgetData from "@/data/data.json"
import Button from "@/components/ui/Button"
import PageHeader from "@/components/ui/PageHeader"
import { formatCurrency, formatDate, getAvatarSrc } from "@/lib/utils/formatters"

const budgets = budgetData.budgets ?? []
const transactions = budgetData.transactions ?? []

function displayCurrency(value) {
  return formatCurrency(value).replace("+", "")
}

function getBudgetDetails(budget) {
  const budgetTransactions = transactions
    .filter((transaction) => transaction.category === budget.category && transaction.amount < 0)
    .sort((first, second) => new Date(second.date) - new Date(first.date))

  const spent = budgetTransactions.reduce((total, transaction) => total + Math.abs(transaction.amount), 0)

  return {
    spent,
    recentTransactions: budgetTransactions.slice(0, 3),
  }
}

function BudgetCard({ budget }) {
  const { spent, recentTransactions } = getBudgetDetails(budget)
  const progress = Math.min((spent / budget.maximum) * 100, 100)

  return (
    <article className="rounded-lg bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="size-4 rounded-full" style={{ backgroundColor: budget.theme }} aria-hidden="true" />
          <h2 className="font-bold">{budget.category}</h2>
        </div>
        <button type="button" aria-label={`More options for ${budget.category}`} className="text-grey-500 hover:text-grey-900">
          <DotsThreeIcon weight="bold" className="size-5" />
        </button>
      </div>

      <p className="mt-2 text-xs text-grey-500">Maximum of {displayCurrency(budget.maximum)}</p>

      <div className="mt-4 h-8 rounded-sm bg-beige-100 p-1" aria-label={`${progress}% of budget spent`} role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={progress}>
        <div className="h-full rounded-sm" style={{ width: `${progress}%`, backgroundColor: budget.theme }} />
      </div>

      <div className="mt-3 grid grid-cols-2 divide-x divide-grey-100 text-xs">
        <div className="border-l-4 pl-3" style={{ borderColor: budget.theme }}>
          <p className="text-grey-500">Spent</p>
          <p className="mt-1 font-bold">{displayCurrency(spent)}</p>
        </div>
        <div className="pl-4">
          <p className="text-grey-500">Remaining</p>
          <p className="mt-1 font-bold">{displayCurrency(Math.max(budget.maximum - spent, 0))}</p>
        </div>
      </div>

      <div className="mt-5 rounded-lg bg-beige-100 p-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-bold">Latest Spending</h3>
          <Button variant="tertiary" text="See All" className="text-xs" />
        </div>
        <div className="mt-3 divide-y divide-white">
          {recentTransactions.map((transaction) => (
            <div key={`${transaction.name}-${transaction.date}`} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
              <div className="flex min-w-0 items-center gap-3">
                <Image src={getAvatarSrc(transaction.avatar)} alt="" width={32} height={32} className="size-8 shrink-0 rounded-full object-cover" />
                <span className="truncate text-xs font-semibold">{transaction.name}</span>
              </div>
              <div className="shrink-0 text-right text-xs">
                <p className="font-bold">{displayCurrency(Math.abs(transaction.amount))}</p>
                <p className="mt-1 text-[10px] text-grey-500">{formatDate(transaction.date)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}

export default function BudgetsPage() {
  const budgetSpending = budgets.map((budget) => ({
    ...budget,
    spent: getBudgetDetails(budget).spent,
  }))

  return (
    <div>
      <PageHeader
        title="Budgets"
        action={<Button variant="primary" text="Add New Budget" leftIcon={PlusIcon} />}
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(260px,0.75fr)_minmax(0,1.5fr)] lg:items-start">
        <section className="rounded-lg bg-white p-5 sm:p-6" aria-labelledby="spending-summary-title">
          <div className="mx-auto flex size-52 items-center justify-center rounded-full border-18 border-cyan sm:size-60" aria-label="Spending summary chart placeholder">
            <div className="flex size-32 flex-col items-center justify-center rounded-full bg-white text-center sm:size-36">
              <span className="text-2xl font-bold">{displayCurrency(budgetSpending.reduce((total, budget) => total + budget.spent, 0))}</span>
              <span className="mt-1 text-[10px] text-grey-500">of {displayCurrency(budgetSpending.reduce((total, budget) => total + budget.maximum, 0))} spent</span>
            </div>
          </div>
          <h2 id="spending-summary-title" className="mt-6 font-bold">Spending Summary</h2>
          <div className="mt-3 divide-y divide-grey-100">
            {budgetSpending.map((budget) => (
              <div key={budget.category} className="flex items-center justify-between gap-3 py-3 text-xs">
                <div className="flex items-center gap-2 text-grey-500">
                  <span className="h-4 w-1 rounded-full" style={{ backgroundColor: budget.theme }} aria-hidden="true" />
                  <span>{budget.category}</span>
                </div>
                <span className="font-bold">{displayCurrency(budget.spent)} <span className="font-normal text-grey-500">of {displayCurrency(budget.maximum)}</span></span>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-5" aria-label="Budgets">
          {budgets.map((budget) => <BudgetCard key={budget.category} budget={budget} />)}
        </section>
      </div>
    </div>
  )
}