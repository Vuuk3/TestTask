import ModificationCard from "../../components/ModificationCard/ModificationCard";
import ServerCard from "../../components/ServerCard/ServerCard";
import Menu from "../../components/Menu/Menu";
import modules from "./MainPage.module.css";

function MainPage() {

  const items = [1, 2, 3, 4];

  return <>
    <main>
      <Menu/>
      <div className={modules["start_block"]}>
        <h1 className={modules["start_block-header-first"]}>ТВОЙ МИР</h1>
        <h1 className={modules["start_block-header-second"]}>ТВОЯ ЭКОСИСТЕМА</h1>
        <h3 className={modules["start_block-description"]}>Все в одном интерфейсе FutureTech</h3>
        <div className={modules["button_container"]}>
          <button className={modules["main_button"]}>Начать играть</button>
          <button className={modules["secondary_button"]}>Серверы</button>
        </div> 
      </div>
      <div className={modules.servers}>
        {
          items.map((_) => (<ServerCard key={_}/>))
        }
      </div>
      <div className={modules.modifications}>
        {
          items.map((_) => (<ModificationCard key={_}/>))
        }
      </div>
    </main>
  </>
}

export default MainPage;
