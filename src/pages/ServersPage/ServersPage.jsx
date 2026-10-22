import Menu from "../../components/Menu/Menu";
import ServerCard from "../../components/ServerCard/ServerCard";
import modules from "./ServersPage.module.css";

function ServersPage() {
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

  return <>
    <main className={modules["servers-page"]}>
      <Menu />
      <h1 className={modules["servers-header"]}>Наши серверы</h1>
      <div className={modules["servers-content"]}>
        {
          servers.map((server) => (<ServerCard key={server.id} data={server} />))
        }
      </div>
    </main>
  </>
}

export default ServersPage;
