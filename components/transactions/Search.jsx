import { MagnifyingGlassIcon } from "@phosphor-icons/react"


export default function Search({ value, onChange }) {
    return (
        <label className="flex w-full items-center gap-3 rounded-xl border border-gray-500 px-3 py-2.5 text-sm text-grey-500 shadow-sm lg:w-80 md:w-50 sm:w-40">
            <input
                type="text"
                placeholder="Search transaction..."
                aria-label="Search transaction"
                className="w-full bg-transparent text-sm text-grey-900 placeholder:text-[#7d7d7d] focus:outline-none"
                onChange={onChange}
                value={value}
            />
            <MagnifyingGlassIcon weight="bold" className="size-4 shrink-0 text-[#7d7d7d]" />
        </label>
    )
}