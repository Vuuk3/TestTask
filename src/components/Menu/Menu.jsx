import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import modules from "./Menu.module.css";
import { checkAuth, logout } from "../../api/auth.js";

const ignoreError = () => {}

function Menu({setError = ignoreError}) {
  const [isLoggedIn, setIsLogged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
      checkAuth()
      .then(() => {
        setIsLogged(true)
      })
      .catch((error) => {
        if (error.status !== 401 && error.status !== 403) {
          setError(true);
        }
      })
    }, [setError])

  const logoutSubmit = async () => {
    try {
      await logout();
      setIsLogged(false);
      navigate("/");
    } catch {
      setError(true);
    }
  }

  const pages = [
    { text: "Главная", url: "/" },
    { text: "Серверы", url: "/servers" },
    { text: "Модификации", url: "/mods" },
    { text: "Профиль", url: "/profile" }
  ]

  if (isLoggedIn) {
    pages.push({ text: "Друзья", url: "/friends" })
  }
  const location = useLocation();

  return (<>
    <div className={modules.menu}>
      <img className={modules.logo} />
      <h2 className={modules.header}>FutureTech Minecraft</h2>
      <nav className={modules.navigation}>
        {pages.map((p) => (
          <Link key={p.text} to={p.url} className={`${modules.link} ${p.url === location.pathname ? modules.checked : ""}`}>{p.text}</Link>
        ))}
      </nav>
      {isLoggedIn && <button className={modules.logout} type="button" onClick={logoutSubmit}>Выйти</button>}
    </div>
  </>)
}

export default Menu;
