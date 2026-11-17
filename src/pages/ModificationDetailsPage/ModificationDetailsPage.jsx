import { useState } from "react";
import { Link, useParams } from "react-router";
import Menu from "../../components/Menu/Menu";
import modifications from "../../data/modifications.js";
import modules from "./ModificationDetailsPage.module.css";

function ModificationDetailsPage() {
  const { id } = useParams();
  const modification = modifications.find((item) => item.id === Number(id));
  const [isAdded, setIsAdded] = useState(false);

  const addToLibrary = () => {
    if (isAdded) return;

    setIsAdded(true);
  }

  if (!modification) {
    return <main className={modules.page}>
      <Menu />
      <section className={modules["not-found"]}>
        <h1>Модификация не найдена</h1>
        <Link className={modules["back-link"]} to="/mods">Вернуться к модификациям</Link>
      </section>
    </main>
  }

  return <main className={modules.page}>
    <Menu />
    <Link className={modules["back-link"]} to="/mods">Назад к модификациям</Link>
    <article className={modules.details}>
      <div className={modules.heading}>
        <div>
          <h1 className={modules.title}>{modification.name}</h1>
          <p className={modules.category}>{modification.category}</p>
        </div>
        <button className={modules.button} type="button" onClick={addToLibrary} disabled={isAdded}>
          {isAdded ? "В библиотеке" : "Добавить в библиотеку"}
        </button>
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
