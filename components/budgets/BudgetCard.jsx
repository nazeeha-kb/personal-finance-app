"use client"

import { useState, useEffect, useRef } from "react"
import { DotsThreeIcon, CaretDownIcon } from "@phosphor-icons/react"
import Image from "next/image"
import { formatDate, getAvatarSrc } from "@/lib/utils/formatters"
import Link from "next/link"



export default function BudgetCard({ budget, getBudgetDetails, displayCurrency }) {
    const [menuOpen, setMenuOpen] = useState(false)

    const { spent, recentTransactions } = getBudgetDetails(budget)
    const progress = Math.min((spent / budget.maximum) * 100, 100)

    const menuRef = useRef(null)
    const menuBtnRef = useRef(null)


    const toggleMenu = () => {
        if (menuOpen) {
            setMenuOpen(false)
        }
        else {
            setMenuOpen(true)
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            const isClickOnMenu =
                menuRef.current?.contains(event.target);

            const isClickOnMenuBtn =
                menuBtnRef.current?.contains(event.target);

            if (!isClickOnMenu && !isClickOnMenuBtn) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (
        <article className="rounded-lg bg-white p-5 sm:p-6 relative z-10">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <span className="size-4 rounded-full" style={{ backgroundColor: budget.theme }} aria-hidden="true" />
                    <h2 className="font-bold">{budget.category}</h2>
                </div>
                <div className="relative">
                    <button type="button" onClick={() => toggleMenu()} ref={menuBtnRef} aria-label={`More options for ${budget.category}`} className="text-grey-500 hover:text-grey-900">
                        <DotsThreeIcon weight="bold" className="size-5" />
                    </button>
                    <article aria-label="menu" ref={menuRef} className={`bg-white text-sm shadow-2xl absolute transition-opacity duration-300 cursor-pointer -translate-x-24 w-32 px-4 py-3 rounded-xl space-y-3 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} aria-hidden={!menuOpen}>
                        <button type="button" className="cursor-pointer">Edit Budget</button>
                        <div className="border-[0.2px] border-gray-100" />
                        <button type="button" className="cursor-pointer text-red">Delete Budget</button>
                    </article>

                </div>
            </div>

            <p className="mt-2 text-xs text-grey-500">Maximum of {displayCurrency(budget.maximum)}</p>

            {/* Graph */}
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

            {/* Latest Spending */}
            <div className="mt-5 rounded-lg bg-beige-100 p-4">
                <div className="flex items-center justify-between gap-3">
                    <h3 className="text-sm font-bold">Latest Spending</h3>
                    <Link href="/transactions" className="text-grey-500 hover:text-grey-900 focus:text-grey-900 flex items-center gap-3 text-xs">See All
                        <CaretDownIcon weight="fill" className={`-rotate-90 transition-transform duration-300`} />
                    </Link >
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