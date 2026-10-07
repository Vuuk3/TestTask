function ServerCard() {
    const data = {
        "name": "Test",
        "status": "Oneline",
        "players": 66,
        "max_players": 100,
        "version": "1.20.1",
        "description": "test",
        "capabilities": "test"
    }

    return (<div className="card">
        <h1 className="card-header">{data.name}</h1>
        <div className="card-info">
            <li className="status">{data.status}</li>
            <li className="players">{data.players}/{data.max_players}</li>
            <li className="version">Minecraft {data.version}</li>
            <button className="more">Подробнее</button>
        </div>
    </div>)
}

export default ServerCard;