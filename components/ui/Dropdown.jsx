export default function Dropdown({ options }) {
    return (
        <div>
            Dropdown with options:
            ({options.map((item) => (
                <div key={item}>{item}</div>
            ))})
        </div>
    )
}