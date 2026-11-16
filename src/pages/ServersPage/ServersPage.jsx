import { useState } from "react";
import Menu from "../../components/Menu/Menu";
import ServerCard from "../../components/ServerCard/ServerCard";
import servers from "../../data/servers.js";
import modules from "./ServersPage.module.css";
import SelectFilter from "../../components/SelectFilter/SelectFilter.jsx";

function ServersPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("none");

  const statusData = {"Все": "all", "Онлайн": "online", "Оффлайн": "offline"}
  const orderData = {"Без сортировки": "none", "По убыванию": "desc", "По возрастанию": "asc"}

  const filteredServers = servers.filter((server) => {
    if (statusFilter === "all") return true

    return server.status === (statusFilter === "online")
  })

  const sortedServers = sortOrder === "none" ? filteredServers : filteredServers.toSorted((a, b) => a.players - b.players)
  const resultServers = sortOrder === "desc" ? sortedServers.toReversed() : sortedServers

  return <>
    <main className={modules["servers-page"]}>
      <Menu />
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
