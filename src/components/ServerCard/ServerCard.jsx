import modules from "./ServerCard.module.css";

function ServerCard({ data }) {
  const server = data || {
    "name": "Test",
    "status": false,
    "players": 66,
    "max_players": 100,
    "version": "1.20.1",
    "ip": "play.futuretech.example",
    "description": "test",
    "capabilities": "test"
  }

  return (<div className={modules.card}>
    <h1 className={modules["card-header"]}>{server.name}</h1>
    <p className={modules.description}>{server.description}</p>
    <div className={modules["card-info"]}>
      <li className={`${modules.status} ${server.status ? modules.online : modules.offline}`}>{server.status ? "ONLINE" : "OFFLINE"}</li>
      <li className={modules.players}>{server.status ? server.players: 0} / {server.max_players}</li>
      <li className={modules.version}>Minecraft {server.version}</li>
      <button className={modules.more}>Подробнее</button>
    </div>
  </div>)
}

export default ServerCard;
