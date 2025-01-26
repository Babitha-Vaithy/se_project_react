import React from "react";
import closeBtn from "../../assets/closeBtn.svg";
import "./DeleteItemsModal.css";

const DeleteItemsModal = ({ onClose, isOpen, onDelete, handleDeleteItem }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={`modal ${isOpen === true && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">
          Are you sure you want to delete this item? This action is
          irreversible.
        </h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeBtn} alt="Close Btn" className="modal__close_btn" />
        </button>

        <button onClick={onDelete} className="delete__deleteitem">
          Yes, delete item
        </button>
        <div className="delete__icon">
          <button onClick={handleDeleteItem} className="delete__cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteItemsModal;
