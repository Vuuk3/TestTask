import { useEffect, useState } from "react";
import Menu from "../../components/Menu/Menu";
import ServerCard from "../../components/ServerCard/ServerCard";
import modules from "./ServersPage.module.css";
import SelectFilter from "../../components/SelectFilter/SelectFilter.jsx";
import { getServers } from "../../api/server.js";

function ServersPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [servers, setServers] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("none");

  useEffect(() => {
    getServers()
      .then((response) => {
        setServers(response.data)
      })
      .catch(() => {
        setError(true)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const statusData = {"all": "Все", "online": "Онлайн", "offline": "Оффлайн"}
  const orderData = {"none": "Без сортировки", "desc": "По убыванию", "asc": "По возрастанию"}

  const filteredServers = servers.filter((server) => {
    if (statusFilter === "all") return true

    return server.status === (statusFilter === "online")
  })

  const sortedServers = sortOrder === "none" ? filteredServers : filteredServers.toSorted((a, b) => a.players - b.players)
  const resultServers = sortOrder === "desc" ? sortedServers.toReversed() : sortedServers

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

  return <>
    <main className={modules["servers-page"]}>
      <Menu setError={setError}/>
      <h1 className={modules["servers-header"]}>Наши серверы</h1>
      <div className={modules.filters}>
        <div className={modules["filter-group"]}>
          <h2 className={modules["filter-h2"]}>Статус сервера</h2>
          <SelectFilter data={statusData} value={statusFilter} setValue={setStatusFilter}/>
        </div>
        <div className={modules["filter-group"]}>
          <h2 className={modules["filter-h2"]}>Количество игроков</h2>
          <SelectFilter data={orderData} value={sortOrder} setValue={setSortOrder}/>
        </div>
      </div>
      <div className={modules["servers-content"]}>
        {
          resultServers.map((server) => (<ServerCard key={server.id} data={server} extended />))
        }
      </div>
    </main>
  </>
}

export default ServersPage;
