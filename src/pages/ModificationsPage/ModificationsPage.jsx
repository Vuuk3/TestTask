import { useEffect, useState } from "react";
import Menu from "../../components/Menu/Menu";
import ModificationCard from "../../components/ModificationCard/ModificationCard";
import SelectFilter from "../../components/SelectFilter/SelectFilter";
import modules from "./ModificationsPage.module.css";
import { getMods } from "../../api/mods.js";

function ModificationsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [modifications, setModifications] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("0");

  useEffect(() => {
    getMods()
      .then((response) => {
        setModifications(response.data)
      })
      .catch(() => {
        setError(true)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const categories = ["Все", ...new Set(modifications.map((modification) => modification.category))]

  const filteredModifications = modifications.filter((modification) => {
    const matchesSearch = modification.name.toLowerCase().includes(search.trim().toLowerCase())
    const matchesCategory = modification.category === categories.at(category) || category === "0";
    return matchesSearch && matchesCategory
  })

  if (isLoading) {
    return <div>
      <h1 className={modules.info}>Загрузка...</h1>
    </div>
  }

  if (error) {
    return <div>
      <h1 className={modules.info}>Ошибка: не удалось загрузить данные</h1>
    </div>
  }

  return <main className={modules.page}>
    <Menu setError={setError}/>
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
