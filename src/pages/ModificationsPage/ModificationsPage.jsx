import { useState } from "react";
import Menu from "../../components/Menu/Menu";
import ModificationCard from "../../components/ModificationCard/ModificationCard";
import SelectFilter from "../../components/SelectFilter/SelectFilter";
import modifications from "../../data/modifications.js";
import modules from "./ModificationsPage.module.css";

function ModificationsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("0");

  const categories = ["Все", ...new Set(modifications.map((modification) => modification.category))]

  const filteredModifications = modifications.filter((modification) => {
    const matchesSearch = modification.name.toLowerCase().includes(search.trim().toLowerCase())
    const matchesCategory = modification.category === categories.at(category) || category === "0";
    return matchesSearch && matchesCategory
  })

  return <main className={modules.page}>
    <Menu />
    <h1 className={modules.title}>Модификации</h1>
    <div className={modules.filters}>
      <label className={modules["search-group"]}>
        <span>Поиск по названию</span>
        <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Например, FT Industry" />
      </label>
      <div className={modules["filter-group"]}>
        <h2>Категория</h2>
        <SelectFilter data={categories} value={category} setValue={setCategory}/>
      </div>
    </div>
    {filteredModifications.length > 0
      ? <div className={modules.content}>
          {filteredModifications.map((modification) => (<ModificationCard key={modification.id} data={modification} extended />))}
        </div>
      : <p className={modules.empty}>Модификации не найдены</p>}
  </main>
}

export default ModificationsPage;
