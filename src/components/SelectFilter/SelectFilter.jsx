import modules from "./SelectFilter.module.css";

function SelectFilter({data, value, setValue}) {
    return (
    <div className={modules["select-wrapper"]}>
        <select className={modules.filter} value={value} onChange={(event) => setValue(event.target.value)}>
            {Object.entries(data).map(([key, value]) => (
                <option value={value} key={value}>
                    {key}
                </option>
                ))}
        </select>
    </div>
    )
}

export default SelectFilter;