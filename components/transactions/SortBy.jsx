
import {
    CaretDownIcon,
} from "@phosphor-icons/react/dist/ssr";
import { useEffect, useState, useRef } from "react";

const sortTypes = [
    "Latest",
    "Oldest",
    "A to Z",
    "Z to A",
    "Highest",
    "Lowest",
]

export default function SortBy({ onClick, currSort }) {
    const [dropDownOpen, setDropDownOpen] = useState(false)

    const dropdownRef = useRef(null);

    useEffect(() => {
        if (!currSort) currSort = "Latest"

        // click outside dropdown

        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropDownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [])

    const toggleDropDown = () => {
        if (dropDownOpen) { setDropDownOpen(false) }
        else { setDropDownOpen(true) }
    }

    return (
        <section className="relative w-fit" ref={dropdownRef}>
            <div className="flex items-center gap-3">
                <span className="text-sm">Sort By</span>
                <button
                    onClick={() => toggleDropDown()}
                    type="button"
                    aria-label="Sorts"
                    className="flex items-center justify-between gap-3 rounded-xl border border-gray-800 px-3 py-2.5 text-sm font-medium text-grey-900 shadow-sm sm:min-w-[170px]"
                >
                    <span className="flex items-center gap-1 text-[#4b4b4b]">
                        <span>{currSort}</span>
                        <CaretDownIcon weight="fill" className="size-4" />
                    </span>
                </button>
            </div> 
            <article className={`flex flex-col absolute bg-white shadow-2xl rounded-lg w-40 h-60 overflow-auto scrollbar-thin overflow-x-hidden translate-x-20 px-4 mt-2 scrollbar-hide transition-opacity duration-500
                ${dropDownOpen ? "opacity-100 z-10" : "opacity-0 -z-10"}
                `} aria-hidden={!dropDownOpen}>
                {sortTypes.map((sort, index) => (
                    <button className={`border-b border-gray-200 py-3 ${currSort === sort ? "font-bold" : ""}`} type="button" key={index} onClick={() => onClick(sort)}> {sort} </button>
                ))}
            </article>
        </section>
    )
}