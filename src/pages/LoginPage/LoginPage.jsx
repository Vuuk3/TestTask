import { useState } from "react";
import { useNavigate } from "react-router";
import { login } from "../../api/auth";
import Menu from "../../components/Menu/Menu";
import modules from "./LoginPage.module.css";

function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const loginSubmit = async () => {
    try {
      await login();
      navigate("/");
    } catch {
      setError(true);
    }
  }

  return <main className={modules.page}>
    <Menu setError={setError} />
    <section className={modules.auth}>
      <h1>Вход</h1>
      <p className={modules.description}>Используйте тестовый аккаунт FutureTech Minecraft</p>
      <button className={modules["login-button"]} type="button" onClick={loginSubmit}>Войти как FuturePlayer</button>
      {error && <p className={modules.error} aria-live="polite">Возникла непредвиденная ошибка. Попробуйте позже</p>}
    </section>
  </main>
}

export default LoginPage;
