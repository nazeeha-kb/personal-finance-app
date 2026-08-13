import { MagnifyingGlassIcon } from "@phosphor-icons/react"


export default function Search({ value, onChange }) {
    return (
        <label className="flex w-full items-center gap-3 rounded-xl border border-[#cfc9c0] bg-[#f7f5f2] px-3 py-2.5 text-sm text-grey-500 shadow-sm sm:w-[270px]">
            <MagnifyingGlassIcon weight="bold" className="size-4 shrink-0 text-[#7d7d7d]" />
            <input
                type="text"
                placeholder="Search transaction..."
                aria-label="Search transaction"
                className="w-full bg-transparent text-sm text-grey-900 placeholder:text-[#7d7d7d] focus:outline-none"
                onChange={onChange}
                value={value}
            />
        </label>
    )
}