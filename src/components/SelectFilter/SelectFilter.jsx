import modules from "./SelectFilter.module.css";

function SelectFilter({data, value, setValue}) {
    return (
    <div className={modules["select-wrapper"]}>
        <select className={modules.filter} value={value} onChange={(event) => setValue(event.target.value)}>
            {Object.entries(data).map(([key, value]) => (
                <option value={key} key={key}>
                    {value}
                </option>
                ))}
        </select>
    </div>
    )
}

export default SelectFilter;