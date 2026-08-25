import Image from "next/image";

import {
    formatDate,
    formatCurrency,
    getAvatarSrc,
} from "@/lib/utils/formatters";

export default function Transaction({ transaction, isPositive }) {
    return (
        <div
            className="md:grid grid-cols-[1.8fr_0.9fr_0.8fr_0.6fr] flex justify-between items-center border-b border-[#d9d5d1] px-3 py-3 text-sm last:border-b-0 sm:px-4"
        >

            <div className="flex items-center gap-3">
                <Image
                    src={getAvatarSrc(transaction.avatar)}
                    alt={transaction.name}
                    width={36}
                    height={36}
                    className="h-9 w-9 rounded-full object-cover ring-1 ring-[#d4d1cc]"
                />
                <div className="flex flex-col">
                    <span className="truncate font-semibold text-grey-900">{transaction.name}</span>
                    <span className="text-grey-400 sm:hidden block">{transaction.category}</span>
                </div>
            </div>

            <span className="text-grey-400 sm:block hidden">{transaction.category}</span>
            <span className="text-grey-400 sm:block hidden">{formatDate(transaction.date)}</span>

            <div className="flex flex-col">
                <span
                    className={`text-right font-semibold ${isPositive ? "text-[#1a8a70]" : "text-grey-900"
                        }`}
                >
                    {formatCurrency(transaction.amount)}
                </span>
                <span className="text-grey-400 sm:hidden block">{formatDate(transaction.date)}</span>
            </div>
        </div>
    )
}