import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router";
import Menu from "../../components/Menu/Menu";
import servers from "../../data/servers.js";
import modules from "./ServerDetailsPage.module.css";

function ServerDetailsPage() {
  const { id } = useParams();
  const [ipCopied, setIpCopied] = useState(false);
  const copyTimer = useRef(null);

  const server = servers.find((server) => server.id === Number(id));

  useEffect(() => {
    return () => clearTimeout(copyTimer.current)
  }, [])

  const copyIp = async () => {
    try {
      await navigator.clipboard.writeText(server.ip)
      clearTimeout(copyTimer.current)
      setIpCopied(true)
      copyTimer.current = setTimeout(() => setIpCopied(false), 3000)
    } catch {
      setIpCopied(false)
    }
  }

  const hideCopyMessage = () => {
    clearTimeout(copyTimer.current)
    setIpCopied(false)
  }

  if (!server) {
    return <main className={modules.page}>
      <Menu />
      <section className={modules["not-found"]}>
        <h1>Сервер не найден</h1>
        <Link className={modules["back-link"]} to="/servers">Вернуться к серверам</Link>
      </section>
    </main>
  }

  return <main className={modules.page}>
    <Menu />
    <Link className={modules["back-link"]} to="/servers">Назад к серверам</Link>
    <article className={modules.details}>
      <h1 className={modules.title}>{server.name}</h1>
      <div className={modules["status-row"]}>
        <span className={`${modules.status} ${server.status ? modules.online : modules.offline}`}>{server.status ? "ONLINE" : "OFFLINE"}</span>
        <div className={modules["ip-block"]} onMouseLeave={hideCopyMessage}>
          <button className={modules.ip} type="button" onClick={copyIp}>{server.ip}</button>
          <span className={`${modules["copy-message"]} ${ipCopied ? modules["copy-message-visible"] : ""}`} aria-live="polite" aria-hidden={!ipCopied}>IP скопирован</span>
        </div>
      </div>
      <div className={modules.meta}>
        <div className={modules["meta-row"]}>
          <span>Версия Minecraft</span>
          <strong>{server.version}</strong>
        </div>
        <div className={modules["meta-row"]}>
          <span>Онлайн</span>
          <strong>{server.status ? server.players : 0} / {server.max_players}</strong>
        </div>
      </div>
      <section className={modules.section}>
        <h2>Описание</h2>
        <p>{server.description}</p>
      </section>
      <section className={modules.section}>
        <h2>Основные возможности</h2>
        <ul className={modules.capabilities}>
          {server.capabilities.map((capability) => (<li key={capability}>{capability}</li>))}
        </ul>
      </section>
    </article>
  </main>
}

export default ServerDetailsPage;
