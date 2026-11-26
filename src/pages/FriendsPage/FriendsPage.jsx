import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { addFriend, deleteFriend, getFriends } from "../../api/friends.js";
import DeleteModal from "../../components/DeleteModal/DeleteModal.jsx";
import FriendCard from "../../components/FriendCard/FriendCard.jsx";
import Menu from "../../components/Menu/Menu";
import modules from "./FriendsPage.module.css";

function FriendsPage() {
  const navigate = useNavigate()
  const [friendsList, setFriendsList] = useState([])
  const [username, setUsername] = useState("")
  const [formError, setFormError] = useState("")
  const [deleteError, setDeleteError] = useState("")
  const [friendToDelete, setFriendToDelete] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    getFriends()
      .then((response) => {
        setFriendsList(response.data)
      })
      .catch((requestError) => {
        if (requestError.response?.status === 401) {
          navigate("/login")
        } else {
          setError(true)
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [navigate])

  const addFriendSubmit = async (event) => {
    event.preventDefault()
    const normalizedUsername = username.trim()
    setFormError("")

    if (!normalizedUsername) {
      setFormError("Введите ник друга")
      return
    }

    if (!/^[A-Za-z0-9_]+$/.test(normalizedUsername)) {
      setFormError("Ник может содержать только латинские буквы, цифры и знак подчёркивания")
      return
    }

    if (friendsList.some((friend) => friend.username.toLowerCase() === normalizedUsername.toLowerCase())) {
      setFormError("Этот пользователь уже добавлен в друзья")
      return
    }

    try {
      const response = await addFriend({ username: normalizedUsername })
      setFriendsList((currentFriends) => [...currentFriends, response.data])
      setUsername("")
    } catch (requestError) {
      if (requestError.response.status === 422) {
        setFormError("Некорректно введён ник")
      } else if (requestError.response.status === 409) {
        setFormError("Нельзя добавить себя")
      } else {
        setFormError("Возникла ошибка, попробуйте позже")
      }
    }
  }

  const removeFriend = async () => {
    setDeleteError("")

    try {
      await deleteFriend(friendToDelete.id)
      setFriendsList((currentFriends) => currentFriends.filter((friend) => friend.id !== friendToDelete.id))
    } catch {
      setDeleteError("Возникла ошибка, попробуйте позже")
    } finally {
      setFriendToDelete(null)
    }
  }

  const changeUsername = (event) => {
    setUsername(event.target.value)
    setFormError("")
  }

  if (isLoading) {
    return <h1 className={modules["page-info"]}>Загрузка...</h1>
  }

  if (error) {
    return <h1 className={modules["page-info"]}>Возникла ошибка, попробуйте позже</h1>
  }

  return <main className={modules.page}>
    <Menu />

    <section className={modules.section}>
      <h2>Добавить друга</h2>
      <form className={modules.form} onSubmit={addFriendSubmit}>
        <label>
          <span>Ник пользователя</span>
          <input value={username} onChange={changeUsername} placeholder="Minecraft-ник" />
        </label>
        <button type="submit">Добавить</button>
      </form>
      {formError && <p className={modules.error}>{formError}</p>}
    </section>

    <section className={modules.section}>
      <div className={modules["friends-heading"]}>
        <h2>Список друзей</h2>
        <span>{friendsList.length}</span>
      </div>
      {deleteError && <p className={modules.error}>{deleteError}</p>}

      {friendsList.length > 0
        ? <div className={modules.grid}>
          {friendsList.map((friend) => (
            <FriendCard key={friend.id} data={friend} onDelete={setFriendToDelete} />
          ))}
        </div>
        : <p className={modules.empty}>Список друзей пока пуст</p>}
    </section>

    {friendToDelete && <DeleteModal
      message={`Пользователь @${friendToDelete.username} будет удалён из списка друзей.`}
      onDelete={removeFriend}
      onCancel={() => setFriendToDelete(null)}
    />}
  </main>
}

export default FriendsPage;
