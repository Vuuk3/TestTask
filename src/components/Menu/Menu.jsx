import { Link, useLocation } from "react-router";
import modules from "./Menu.module.css";

function Menu() {

  const pages = [
    { text: "Главная", url: "/" },
    { text: "Серверы", url: "/servers" },
    { text: "Модификации", url: "/modifications" },
    { text: "Друзья", url: "/friends" }
  ]
  const location = useLocation();
  return (<>
    <nav className={modules.navigation}>
      {pages.map((p) => (
        <Link key={p.text} to={p.url} className={`${modules.link} ${p.url === location.pathname ? modules.checked : ""}`}>{p.text}</Link>
      ))}
    </nav>
  </>)
}

export default Menu;
