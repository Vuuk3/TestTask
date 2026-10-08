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
    <div className="card-headers">
      <h1 className="card-headers-h1">{data.name}</h1>
      <h2 className="card-headers-h2">{data.category}</h2>
    </div>
    <div className={modules["card-info"]}>
      <li className="version">{data.minecraft_version}</li>
      <li className="downloads">{data.downloads} загрузок</li>
      <button className="more">Подробнее</button>
    </div>
  </div>
}

export default ModificationCard;
