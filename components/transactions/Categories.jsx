
import {
    CaretDownIcon,
    FunnelIcon
} from "@phosphor-icons/react/dist/ssr";
import { useEffect, useState, useRef } from "react";

const categories = [
    "All Transactions",
    "Entertainment",
    "Bills",
    "Groceries",
    "Dining Out",
    "Transportation",
    "Personal Care",
    "Education",
    "Lifestyle",
    "Shopping",
    "General"
]

export default function Categories({ onClick, currCategory }) {
    const [dropDownOpen, setDropDownOpen] = useState(false)

    const dropdownRef = useRef(null);

    useEffect(() => {
        if (!currCategory) currCategory = "All Transactions"

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
            <div className="flex items-center md:gap-3 gap-2">
                <span className="text-sm sm:block hidden">Category</span>
                <button
                    onClick={() => toggleDropDown()}
                    type="button"
                    aria-label="Filter by category"
                    className="flex items-center justify-between gap-3 rounded-xl sm:border sm:border-gray-800 px-3 py-2.5 text-sm font-medium text-grey-900 sm:shadow-sm lg:min-w-30 md:min-w-25"
                >
                    <FunnelIcon weight="fill" className="sm:hidden block size-6" />
                    <span className="items-center gap-1 text-[#4b4b4b] sm:flex hidden">
                        <span>{currCategory}</span>
                        <CaretDownIcon weight="fill" className="size-4" />
                    </span>
                </button>
            </div>
            <article className={`flex flex-col absolute bg-white shadow-2xl rounded-lg w-40 h-60 overflow-auto scrollbar-thin overflow-x-hidden sm:translate-x-20 -translate-x-22 px-4 mt-2 scrollbar-hide transition-opacity duration-500
                ${dropDownOpen ? "opacity-100 z-10" : "opacity-0 -z-10"}
                `} aria-hidden={!dropDownOpen}>
                {categories.map((category, index) => (
                    <button className={`border-b border-gray-200 py-3 ${currCategory === category ? "font-bold" : ""}`} type="button" key={index} onClick={() => onClick(category)}> {category} </button>
                ))}
            </article>
        </section>
    )
}