import modules from "./ServerCard.module.css";

function ServerCard() {
  const data = {
    "name": "Test",
    "status": false,
    "players": 66,
    "max_players": 100,
    "version": "1.20.1",
    "description": "test",
    "capabilities": "test"
  }

  return (<div className={modules.card}>
    <h1 className={modules["card-header"]}>{data.name}</h1>
    <div className={modules["card-info"]}>
      <li className={`${modules.status} ${data.status ? modules.online : modules.offline}`}>{data.status ? "ONLINE" : "OFFLINE"}</li>
      <li className={modules.players}>{data.status ? data.players: 0} / {data.max_players}</li>
      <li className={modules.version}>Minecraft {data.version}</li>
      <button className={modules.more}>Подробнее</button>
    </div>
  </div>)
}

export default ServerCard;
