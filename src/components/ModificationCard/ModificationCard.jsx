import modules from "./ModificationCard.module.css";

function ModificationCard () {
  const data = {
    "name": "Test",
    "author": "test",
    "category": "test",
    "version": "1.0.1",
    "minecraft_version": "1.20.1",
    "downloads": 14800,
    "description": "test"
  }

  return <div className={modules.card}>
    <div className={modules["card-head"]}>
      <img className={modules["card-icon"]}/>
      <div className={modules["card-headers"]}>
        <h1 className={modules["card-headers-h1"]}>{data.name}</h1>
        <h2 className={modules["card-headers-h2"]}>{data.category}</h2>
      </div>
    </div>
    <div className={modules["card-info"]}>
      <li className={modules.version}>{data.minecraft_version}</li>
      <li className={modules.downloads}>{data.downloads.toLocaleString("en-US", {notation: "compact", roundingMode: "trunc", maximumFractionDigits: 1})} загрузок</li>
      <button className={modules.more}>Подробнее</button>
    </div>
  </div>
}

export default ModificationCard;
