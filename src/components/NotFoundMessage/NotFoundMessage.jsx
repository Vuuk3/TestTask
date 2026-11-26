import { Link } from "react-router";
import modules from "./NotFoundMessage.module.css";

function NotFoundMessage({ message, backLink, backLinkText }) {
  return <div className={modules.container}>
    <h1>{message}</h1>
    <Link className={modules.link} to={backLink}>{backLinkText}</Link>
  </div>
}

export default NotFoundMessage;
