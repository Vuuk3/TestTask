import modules from "./ModificationCard.module.css";
import { Link } from "react-router";

function ModificationCard ({ data, extended = false }) {
  return <div className={modules.card}>
    <div className={modules["card-head"]}>
      <div className={modules["card-icon"]}>{data.name.slice(0, 2)}</div>
      <div className={modules["card-headers"]}>
        <h1 className={modules["card-headers-h1"]}>{data.name}</h1>
        <h2 className={modules["card-headers-h2"]}>{data.category}</h2>
      </div>
    </div>
    {extended && <p className={modules.author}>Автор: {data.author}</p>}
    {extended && <p className={modules.description}>{data.description}</p>}
    <div className={modules["card-info"]}>
      <li className={modules.version}>Версия {data.version}</li>
      <li className={modules["minecraft-version"]}>Minecraft {data.minecraft_version}</li>
      <li className={modules.downloads}>{data.downloads.toLocaleString("en-US", {notation: "compact", roundingMode: "trunc", maximumFractionDigits: 1})} загрузок</li>
      <Link className={modules.more} to={`/mods/${data.id}`}>Подробнее</Link>
    </div>
  </div>
}

export default ModificationCard;
