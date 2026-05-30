
export default function Input({ label, id, rightIcon, leftIcon, helperText, ...props }) {

    const LeftIcon = leftIcon
    const RightIcon = rightIcon

    return (
        <div>
            <div className="flex flex-col gap-1 w-[50vw]">
                <label className="text-grey-500 font-bold" htmlFor={id}>{label}</label>
                <div className="outline outline-beige-500 hover:outline-grey-500 focus:outline-grey-900 focus-within:text-grey-900  text-grey-500 rounded-lg px-5 py-3 transform-all duration-150 flex items-center gap-3">
                    {leftIcon && (
                        <div><LeftIcon /></div>
                    )}
                    {/* type, placeholder, name */}
                    <input id={id} {...props} className="focus:outline-none w-full"/>
                    {rightIcon && (
                        <div className=""><RightIcon /></div>
                    )}
                </div>
                <span className="self-end text-grey-500">{helperText}</span>
            </div>
        </div>
    )
}