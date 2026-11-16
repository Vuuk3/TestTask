import ModificationCard from "../../components/ModificationCard/ModificationCard";
import ServerCard from "../../components/ServerCard/ServerCard";
import Menu from "../../components/Menu/Menu";
import servers from "../../data/servers.js";
import modifications from "../../data/modifications.js";
import modules from "./MainPage.module.css";
import { Link } from "react-router";

function MainPage() {

  return <>
    <main>
      <Menu />
      <div className={modules["start_block"]}>
        <h1 className={modules["start_block-header-first"]}>ТВОЙ МИР</h1>
        <h1 className={modules["start_block-header-second"]}>ТВОЯ ЭКОСИСТЕМА</h1>
        <h3 className={modules["start_block-description"]}>Все в одном интерфейсе FutureTech</h3>
        <div className={modules["button_container"]}>
          <button className={modules["main_button"]}>Начать играть</button>
          <Link className={modules["secondary_button"]} to="/servers">Серверы</Link>
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
  </>
}

export default MainPage;
