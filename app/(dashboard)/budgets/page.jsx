"use client"
import BudgetCard from "@/components/budgets/BudgetCard"

import { PlusIcon } from "@phosphor-icons/react/dist/ssr"

import budgetData from "@/data/data.json"
import Button from "@/components/ui/Button"
import PageHeader from "@/components/ui/PageHeader"
import { formatCurrency } from "@/lib/utils/formatters"

import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";

const budgets = budgetData.budgets ?? []
const transactions = budgetData.transactions ?? []

function displayCurrency(value) {
  return formatCurrency(value).replace("+", "")
}

function BudgetSlice(props) {
  return <Sector {...props} fill={props.payload.theme} />;
}

function getBudgetDetails(budget) {
  const budgetTransactions = transactions
    .filter((transaction) => transaction.category === budget.category && transaction.amount < 0)
    .sort((first, second) => new Date(second.date) - new Date(first.date))

  const spent = budgetTransactions.reduce((total, transaction) => total + Math.abs(transaction.amount), 0)

  return {
    spent,
    recentTransactions: budgetTransactions.slice(0, 3),
    theme: budget.theme
  }
}

const chartData = budgets.map((budget) => getBudgetDetails(budget))

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

      {/* Spending Summary */}
      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(260px,0.75fr)_minmax(0,1.5fr)] lg:items-start">
        <section className="rounded-lg bg-white p-5 sm:p-6" aria-labelledby="spending-summary-title">
          {/* Summary Chart */}
          <div className="mx-auto h-60 w-full max-w-60 sm:h-60">
            <div className="relative h-60 w-full sm:h-60">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="spent"
                    nameKey="category"
                    innerRadius="60%"
                    outerRadius="80%"
                    shape={BudgetSlice}
                  />
                </PieChart>
              </ResponsiveContainer>

              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-bold">
                  {displayCurrency(
                    budgetSpending.reduce((total, budget) => total + budget.spent, 0)
                  )}
                </span>

                <span className="mt-1 text-[10px] text-grey-500">
                  of{" "}
                  {displayCurrency(
                    budgetSpending.reduce((total, budget) => total + budget.maximum, 0)
                  )}{" "}
                  spent
                </span>
              </div>
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
          {budgets.map((budget) => <BudgetCard key={budget.category} budget={budget} getBudgetDetails={getBudgetDetails} displayCurrency={displayCurrency} />)}
        </section>
      </div>
    </div>
  )
}