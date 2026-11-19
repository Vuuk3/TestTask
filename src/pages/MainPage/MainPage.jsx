import ModificationCard from "../../components/ModificationCard/ModificationCard";
import ServerCard from "../../components/ServerCard/ServerCard";
import Menu from "../../components/Menu/Menu";
import modules from "./MainPage.module.css";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { getServers } from "../../api/server.js";
import { getMods } from "../../api/mods.js";

function MainPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [servers, setServers] = useState([])
  const [modifications, setModifications] = useState([])

  useEffect(() => {
    Promise.all([getServers(), getMods()])
    .then(([serversResponse, modsResponse]) => {
      setServers(serversResponse.data)
      setModifications(modsResponse.data)
    })
    .catch(() => {
        setError(true)
    })
    .finally(() => {
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return <div>
      <h1 className={modules.info}>Загрузка...</h1>
    </div>
  }

  if (error) {
    return (<div>
      <h1 className={modules.info}>Ошибка: не удалось загрузить данные</h1>
    </div>)
  }

  return <div className={modules.page}>
    <main>
      <Menu setError={setError}/>
      <div className={modules["start_block"]}>
        <h1 className={modules["start_block-header-first"]}>ТВОЙ МИР</h1>
        <h1 className={modules["start_block-header-second"]}>ТВОЯ ЭКОСИСТЕМА</h1>
        <h3 className={modules["start_block-description"]}>Все в одном интерфейсе FutureTech</h3>
        <div className={modules["button_container"]}>
          <Link className={modules["main_button"]} to="/login">Начать играть</Link>
          <Link className={modules["secondary_button"]} to="/servers">Серверы</Link>
          <Link className={modules["secondary_button"]} to="/mods">Модификации</Link>
        </div>
      </div>
      <div className={modules.servers}>
        <h1 className={modules["servers-h1"]}>Наши серверы</h1>
        <div className={modules["servers-content"]}>
          {
            servers.slice(0, 3).map((server) => (<ServerCard key={server.id} data={server} />))
          }
        </div>
      </div>
      <div className={modules.modifications}>
        <h1 className={modules["modifications-h1"]}>Наши модификации</h1>
        <div className={modules["modifications-content"]}>
          {
            modifications.slice(0, 4).map((modification) => (<ModificationCard key={modification.id} data={modification} />))
          }
        </div>
      </div>
    </main>
  </div>
}

export default MainPage;
