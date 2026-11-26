import modules from "./FriendCard.module.css";

function FriendCard({ data, onDelete }) {
  return <div className={modules.card}>
    <div className={modules.avatar}>{data.displayName.slice(0, 2).toUpperCase()}</div>
    <div className={modules.info}>
      <h3>{data.displayName}</h3>
      <p>@{data.username}</p>
      <span className={`${modules.status} ${data.status === "ONLINE" ? modules.online : modules.offline}`}>
        {data.status}
      </span>
    </div>
    <button className={modules.remove} type="button" onClick={() => onDelete(data)}>Удалить</button>
  </div>
}

export default FriendCard;
