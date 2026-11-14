import { Link } from "react-router";
import modules from "./ServerCard.module.css";

function ServerCard({ data, extended = false }) {
  return (<div className={modules.card}>
    <h1 className={modules["card-header"]}>{data.name}</h1>
    {extended && <p className={modules.description}>{data.description}</p>}
    <div className={modules["card-info"]}>
      <li className={`${modules.status} ${data.status ? modules.online : modules.offline}`}>{data.status ? "ONLINE" : "OFFLINE"}</li>
      <li className={modules.players}>{data.status ? data.players: 0} / {data.max_players}</li>
      <li className={modules.version}>Minecraft {data.version}</li>
      {extended && <li className={modules.ip}>{data.ip}</li>}
      <Link className={modules.more} to={`/servers/${data.id}`}>Подробнее</Link>
    </div>
  </div>)
}

export default ServerCard;
