import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router";
import Menu from "../../components/Menu/Menu";
import { getServerById } from "../../api/server.js";
import modules from "./ServerDetailsPage.module.css";

function ServerDetailsPage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [server, setServer] = useState(null);
  const [ipCopied, setIpCopied] = useState(false);
  const copyTimer = useRef(null);

  useEffect(() => {
    getServerById(id)
      .then((response) => {
        setServer(response.data)
      })
      .catch((error) => {
        if (error.status === 404) {
          setNotFound(true)
        } else {
          setError(true)
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [id])

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

  if (isLoading) {
    return <div>
      <h1 className={modules.info}>Загрузка...</h1>
    </div>
  }

  if (error) {
    return <div>
      <h1 className={modules.info}>Ошибка: не удалось загрузить данные</h1>
    </div>
  }

  if (notFound) {
    return <main className={modules.page}>
      <Menu setError={setError} />
      <section className={modules["not-found"]}>
        <h1>Сервер не найден</h1>
        <Link className={modules["back-link"]} to="/servers">Вернуться к серверам</Link>
      </section>
    </main>
  }

  return <main className={modules.page}>
    <Menu setError={setError} />
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
          <span>Версия Minecraft: <strong>{server.version}</strong></span>
        </div>
        <div className={modules["meta-row"]}>
          <span>Онлайн: <strong>{server.status ? server.players : 0} / {server.max_players}</strong></span>
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
