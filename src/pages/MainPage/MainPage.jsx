import { Link } from "react-router";
import ModificationCard from "../../components/ModificationCard/ModificationCard";
import ServerCard from "../../components/ServerCard/ServerCard";
import modules from "./MainPage.module.css";

function MainPage() {

    const items = [1, 2, 3, 4];

    return <>
        <header>
            <h2>FutureTech Minecraft Portal</h2>
        </header>
        <main>
            <nav className={modules.navigation}>
                <Link>Главная</Link>
                <Link to="/servers">Серверы</Link>
                <Link>Модификации</Link>
                <Link>Друзья</Link>
            </nav>
            <div>
                <h1>ТВОЙ МИР</h1>
                <h1>ТВОЯ ЭКОСИСТЕМА</h1>
                <h3>Все в одном интерфейсе FutureTech</h3>
                <div>
                    <button>Начать играть</button>
                    <button>Серверы</button>
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
        <footer>
            <li>Наши контакты</li>
        </footer>
    </>
}

export default MainPage;
