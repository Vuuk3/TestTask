const servers = [
  {
    id: 1,
    name: "FutureTech Survival",
    ip: "play.futuretech.example",
    version: "1.20.1",
    status: true,
    players: 128,
    max_players: 200,
    description: "Классический survival с экономикой, городами и сезонными событиями.",
    capabilities: ["Экономика", "Города", "Кланы", "События"]
  },
  {
    id: 2,
    name: "FutureTech Industrial",
    ip: "industrial.futuretech.example",
    version: "1.20.1",
    status: true,
    players: 84,
    max_players: 150,
    description: "Технологический сервер с производством, автоматизацией и инженерными цепочками.",
    capabilities: ["Технологии", "Заводы", "Логистика", "Исследования"]
  },
  {
    id: 3,
    name: "FutureTech Adventures",
    ip: "adventure.futuretech.example",
    version: "1.20.1",
    status: true,
    players: 61,
    max_players: 120,
    description: "Приключенческий сервер с заданиями, подземельями и исследованием мира.",
    capabilities: ["Квесты", "Боссы", "Подземелья", "Экспедиции"]
  },
  {
    id: 4,
    name: "FutureTech Creative",
    ip: "creative.futuretech.example",
    version: "1.20.1",
    status: false,
    players: 0,
    max_players: 80,
    description: "Творческий сервер для строительства, тестирования идей и командной работы.",
    capabilities: ["Creative", "WorldEdit", "Участки", "Совместное строительство"]
  },
  {
    id: 5,
    name: "FutureTech Classic",
    ip: "classic.futuretech.example",
    version: "1.19.4",
    status: true,
    players: 54,
    max_players: 100,
    description: "Спокойный сервер с минимальным количеством изменений ванильного Minecraft.",
    capabilities: ["Vanilla+", "Торговля", "Приваты", "События"]
  },
  {
    id: 6,
    name: "FutureTech Labs",
    ip: "labs.futuretech.example",
    version: "1.20.1",
    status: false,
    players: 0,
    max_players: 40,
    description: "Экспериментальный стенд для тестирования новых модификаций и механик.",
    capabilities: ["Эксперименты", "Тесты", "Новые механики", "Ограниченный доступ"]
  }
]

export default servers;
