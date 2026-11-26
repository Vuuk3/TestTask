import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import Menu from "../../components/Menu/Menu";
import { getModById } from "../../api/mods.js";
import modules from "./ModificationDetailsPage.module.css";

function ModificationDetailsPage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [modification, setModification] = useState(null);

  useEffect(() => {
    getModById(id)
      .then((response) => {
        setModification(response.data)
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
        <h1>Модификация не найдена</h1>
        <Link className={modules["back-link"]} to="/mods">Вернуться к модификациям</Link>
      </section>
    </main>
  }

  return <main className={modules.page}>
    <Menu setError={setError} />
    <Link className={modules["back-link"]} to="/mods">Назад к модификациям</Link>
    <article className={modules.details}>
      <div className={modules.heading}>
        <h1 className={modules.title}>{modification.name}</h1>
        <p className={modules.category}>{modification.category}</p>
      </div>
      <dl className={modules.meta}>
        <div><dt>Автор</dt><dd>{modification.author}</dd></div>
        <div><dt>Версия модификации</dt><dd>{modification.version}</dd></div>
        <div><dt>Версия Minecraft</dt><dd>{modification.minecraft_version}</dd></div>
        <div><dt>Загрузки</dt><dd>{modification.downloads.toLocaleString("ru-RU")}</dd></div>
      </dl>
      <section className={modules.section}>
        <h2>Описание</h2>
        <p>{modification.description}</p>
      </section>
    </article>
  </main>
}

export default ModificationDetailsPage;
