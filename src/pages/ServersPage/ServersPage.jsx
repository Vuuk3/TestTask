import { useState } from "react";
import Menu from "../../components/Menu/Menu";
import ServerCard from "../../components/ServerCard/ServerCard";
import modules from "./ServersPage.module.css";

function ServersPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("none");

  const servers = [
    {
      id: 1,
      name: "FutureTech Survival",
      ip: "play.futuretech.example",
      version: "1.20.1",
      status: true,
      players: 128,
      max_players: 200,
      description: "Классический survival с экономикой, городами и сезонными событиями."
    },
    {
      id: 2,
      name: "FutureTech Industrial",
      ip: "industrial.futuretech.example",
      version: "1.20.1",
      status: true,
      players: 84,
      max_players: 150,
      description: "Технологический сервер с производством, автоматизацией и инженерными цепочками."
    },
    {
      id: 3,
      name: "FutureTech Adventures",
      ip: "adventure.futuretech.example",
      version: "1.20.1",
      status: true,
      players: 61,
      max_players: 120,
      description: "Приключенческий сервер с заданиями, подземельями и исследованием мира."
    },
    {
      id: 4,
      name: "FutureTech Creative",
      ip: "creative.futuretech.example",
      version: "1.20.1",
      status: false,
      players: 0,
      max_players: 80,
      description: "Творческий сервер для строительства, тестирования идей и командной работы."
    },
    {
      id: 5,
      name: "FutureTech Classic",
      ip: "classic.futuretech.example",
      version: "1.19.4",
      status: true,
      players: 54,
      max_players: 100,
      description: "Спокойный сервер с минимальным количеством изменений ванильного Minecraft."
    },
    {
      id: 6,
      name: "FutureTech Labs",
      ip: "labs.futuretech.example",
      version: "1.20.1",
      status: false,
      players: 0,
      max_players: 40,
      description: "Экспериментальный стенд для тестирования новых модификаций и механик."
    }
  ]

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
          <div className={modules["filter-options"]}>
            <label className={modules["filter-option"]}>
              <input type="radio" name="server-status" value="all" checked={statusFilter === "all"} onChange={(event) => setStatusFilter(event.target.value)} />
              <span>Все</span>
            </label>
            <label className={modules["filter-option"]}>
              <input type="radio" name="server-status" value="online" checked={statusFilter === "online"} onChange={(event) => setStatusFilter(event.target.value)} />
              <span>Онлайн</span>
            </label>
            <label className={modules["filter-option"]}>
              <input type="radio" name="server-status" value="offline" checked={statusFilter === "offline"} onChange={(event) => setStatusFilter(event.target.value)} />
              <span>Оффлайн</span>
            </label>
          </div>
        </div>
        <div className={modules["filter-group"]}>
          <h2 className={modules["filter-h2"]}>Количество игроков</h2>
          <div className={modules["filter-options"]}>
            <label className={modules["filter-option"]}>
              <input type="radio" name="players-sort" value="none" checked={sortOrder === "none"} onChange={(event) => setSortOrder(event.target.value)} />
              <span>Без сортировки</span>
            </label>
            <label className={modules["filter-option"]}>
              <input type="radio" name="players-sort" value="desc" checked={sortOrder === "desc"} onChange={(event) => setSortOrder(event.target.value)} />
              <span>Сначала больше</span>
            </label>
            <label className={modules["filter-option"]}>
              <input type="radio" name="players-sort" value="asc" checked={sortOrder === "asc"} onChange={(event) => setSortOrder(event.target.value)} />
              <span>Сначала меньше</span>
            </label>
          </div>
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
