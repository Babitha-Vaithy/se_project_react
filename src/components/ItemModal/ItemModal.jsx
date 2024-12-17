import "./ItemModal.css";
import closeBtn from "../../assets/closeBtn.svg";

function ItemModal({ isOpen, onClose, card, onDelete }) {
  return (
    <div className={`modal ${isOpen === true && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeBtn} alt="Close Btn" className="modal__close_btn" />
        </button>
        <img src={card.imageUrl} alt="Card Link" className="modal__image" />
        <div className="modal__footer_card">
          <div className="modal__footer">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <button onClick={onDelete} className="delete__items">
            Delete items
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
