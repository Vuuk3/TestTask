import Menu from "../../components/Menu/Menu";
import NotFoundMessage from "../../components/NotFoundMessage/NotFoundMessage.jsx";
import modules from "./NotFoundPage.module.css";

function NotFoundPage() {
  return <main className={modules.page}>
    <Menu />
    <NotFoundMessage
      message="Такой страницы не существует"
      backLink="/"
      backLinkText="Вернуться на главную страницу"
    />
  </main>
}

export default NotFoundPage;
