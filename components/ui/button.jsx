import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr"

const variants = {
    primary: "bg-grey-900 hover:bg-grey-500 focus:bg-grey-500 text-white p-4 rounded-[8px] font-semibold",
    secondary: "bg-beige-100 hover:bg-white hover:outline hover:outline-grey-500 focus:bg-white focus:outline focus:outline-grey-500  p-4 rounded-[8px] font-semibold",
    tertiary: "text-grey-500 hover:text-grey-900 focus:text-grey-900 flex items-center gap-3",
    destroy: "bg-red text-white hover:bg-red/80 focus:bg-red/80 p-4 rounded-[8px] font-semibold",
}

export default function Button({ variant, text, onClick }) {


    return (
        <button className={`${variants[variant]} transform-all duration-150`} onClick={onClick}>
            <span>{text || "Placeholder"}</span>
            {variant === "tertiary" ? <span>
                <CaretDownIcon weight="fill" className={`-rotate-90 transition-transform duration-300`} />
            </span> : null}
        </button>
    )
}