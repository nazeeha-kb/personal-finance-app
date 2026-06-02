
export default function Input({ label, id, helperText, error, rightIcon, leftIcon, className, iconWeight, ...props }) {

    const LeftIcon = leftIcon
    const RightIcon = rightIcon

    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            <label className="text-grey-500 font-bold" htmlFor={id}>{label}</label>
            <div className={`outline focus-within:text-grey-900  rounded-lg px-5 py-3 transform-all duration-150 flex items-center gap-3 ${error ? "outline-red" : "outline-beige-500 hover:outline-grey-500 focus:outline-grey-900"}`}>
                {leftIcon && (
                    <div className="text-grey-500"><LeftIcon weight={iconWeight} /></div>
                )}
                {/* type, placeholder, name */}
                <input id={id} {...props} className="focus:outline-none w-full" />
                {rightIcon && (
                    <div className="text-grey-500"><RightIcon weight={iconWeight} /></div>
                )}
            </div>
            <div className="flex justify-between">
                <span className="text-red">{error}</span>
                <span className="self-end text-grey-500">{helperText}</span>
            </div>
        </div>
    )
}