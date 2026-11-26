import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { deleteSkin, getProfile, getSkin, updateProfile, updateSkin } from "../../api/profile.js";
import Menu from "../../components/Menu/Menu";
import { capes } from "../../data/profile.js";
import modules from "./ProfilePage.module.css";

function ProfilePage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const [formData, setFormData] = useState(null)
  const [skinPreview, setSkinPreview] = useState("")
  const [skinFile, setSkinFile] = useState(null)
  const [skinAction, setSkinAction] = useState(null)
  const [skinError, setSkinError] = useState("")
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState(false)
  const [isChanged, setIsChanged] = useState(false)

  useEffect(() => {
    getProfile()
      .then(async (response) => {
        setFormData(response.data)

        if (response.data.skinUrl) {
          const skinResponse = await getSkin()
          setSkinPreview(URL.createObjectURL(skinResponse.data))
        }
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

  useEffect(() => {
    return () => {
      if (skinPreview) URL.revokeObjectURL(skinPreview)
    }
  }, [skinPreview])

  const changeField = (event) => {
    const { name, value } = event.target
    setFormData((currentData) => ({ ...currentData, [name]: value }))
    setIsChanged(true)
    setSaved(false)
    setSaveError(false)
  }

  const saveProfile = async (event) => {
    event.preventDefault()
    setSaved(false)
    setSaveError(false)

    try {
      if (skinAction === "updated") {
        const skinData = new FormData()
        skinData.append("file", skinFile)
        await updateSkin(skinData)
      } else if (skinAction === "deleted") {
        await deleteSkin()
      }

      const response = await updateProfile({
        username: formData.username,
        displayName: formData.displayName,
        bio: formData.bio,
        selectedCapeId: formData.selectedCapeId,
      })
      setFormData(response.data)
      setSkinFile(null)
      setSkinAction(null)
      setIsChanged(false)
      setSaved(true)
    } catch {
      setSaveError(true)
    }
  }

  const selectSkin = (event) => {
    const file = event.target.files[0]

    if (!file) return

    if (file.type !== "image/png") {
      setSkinError("Выберите изображение в формате PNG")
      event.target.value = ""
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      setSkinError("Размер PNG-файла не должен превышать 2 МБ")
      event.target.value = ""
      return
    }

    setSkinError("")
    setSkinFile(file)
    setSkinAction("updated")
    setSkinPreview(URL.createObjectURL(file))
    setIsChanged(true)
    setSaved(false)
    setSaveError(false)
  }

  const removeSkin = () => {
    setSkinFile(null)
    setSkinAction(formData.skinUrl ? "deleted" : null)
    setSkinPreview("")
    setSkinError("")
    setIsChanged(true)
    setSaved(false)
    setSaveError(false)
  }

  if (isLoading) {
    return <div>
      <h1 className={modules.info}>Загрузка...</h1>
    </div>
  }

  if (error) {
    return <div>
      <h1 className={modules.info}>Возникла ошибка, попробуйте позже</h1>
    </div>
  }

  return <main className={modules.page}>
    <Menu />
    <h1 className={modules.title}>Личный кабинет</h1>
    <div className={modules.layout}>
      <aside className={modules["profile-card"]}>
        <div className={modules.avatar}>FP</div>
        <div className={modules.identity}>
          <h2>{formData.displayName}</h2>
          <p>@{formData.username}</p>
          <span className={modules.status}>{formData.online ? "ONLINE" : "OFFLINE"}</span>
        </div>
        <dl className={modules.details}>
          <div>
            <dt>Email</dt>
            <dd>{formData.email}</dd>
          </div>
          <div>
            <dt>Дата регистрации</dt>
            <dd>{new Date(formData.registeredAt).toLocaleDateString("ru-RU")}</dd>
          </div>
        </dl>
        <p className={modules.bio}>{formData.bio}</p>
      </aside>

      <div className={modules.content}>
        <section className={modules.section}>
          <h2>Данные профиля</h2>
          <form id="profile-form" className={modules.form} onSubmit={saveProfile}>
            <label>
              <span>Отображаемое имя</span>
              <input name="displayName" value={formData.displayName} onChange={changeField} required />
            </label>
            <label>
              <span>Minecraft-ник</span>
              <input name="username" value={formData.username} onChange={changeField} required />
            </label>
            <label className={modules["wide-field"]}>
              <span>Описание</span>
              <textarea name="bio" value={formData.bio} onChange={changeField} rows="4" required />
            </label>
          </form>
        </section>

        <section className={modules.section}>
          <h2>Скин</h2>
          <div className={modules["skin-layout"]}>
            <div className={modules["skin-preview"]}>
              {skinAction !== "deleted" && skinPreview
                ? <img src={skinPreview} alt="Предпросмотр выбранного скина" />
                : <span>Предпросмотр PNG</span>}
            </div>
            <div className={modules["skin-control"]}>
              <p>Выберите PNG-файл, чтобы увидеть его перед сохранением.</p>
              <label className={modules["file-button"]}>
                Выбрать скин
                <input type="file" accept="image/png" onChange={selectSkin} />
              </label>
              {(formData.skinUrl || skinFile) && skinAction !== "deleted" && <button className={modules["delete-skin"]} type="button" onClick={removeSkin}>Удалить скин</button>}
              {skinError && <p className={modules.error}>{skinError}</p>}
            </div>
          </div>
        </section>

        <section className={modules.section}>
          <h2>Плащ</h2>
          <div className={modules.capes}>
            {capes.map((cape) => (
              <label
                className={modules.cape}
                key={cape.id}
              >
                <input
                  className={modules["cape-radio"]}
                  type="radio"
                  name="cape"
                  value={cape.id}
                  checked={formData.selectedCapeId === cape.id}
                  onChange={() => {
                    setFormData((currentData) => ({
                      ...currentData,
                      selectedCapeId: cape.id,
                    }))
                    setIsChanged(true)
                    setSaved(false)
                    setSaveError(false)
                  }}
                />
                <span className={modules["cape-preview"]} />
                <span className={modules["cape-info"]}>
                  <strong>{cape.name}</strong>
                  <small>{cape.description}</small>
                </span>
              </label>
            ))}
          </div>
        </section>

        <div className={modules.actions}>
          {isChanged && <button type="submit" form="profile-form">Сохранить изменения</button>}
          {saved && <span>Изменения сохранены</span>}
          {saveError && <span className={modules["save-error"]}>Не удалось сохранить изменения</span>}
        </div>
      </div>
    </div>
  </main>
}

export default ProfilePage;
