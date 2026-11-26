import modules from "./DeleteModal.module.css";

function DeleteModal({ message, onDelete, onCancel }) {
  return <div className={modules.overlay} onClick={onCancel}>
    <div className={modules.modal} onClick={(event) => event.stopPropagation()}>
      <h2>Удалить?</h2>
      <p>{message}</p>
      <div className={modules.actions}>
        <button className={modules.cancel} type="button" onClick={onCancel}>Отмена</button>
        <button className={modules.confirm} type="button" onClick={onDelete}>Удалить</button>
      </div>
    </div>
  </div>
}

export default DeleteModal;
