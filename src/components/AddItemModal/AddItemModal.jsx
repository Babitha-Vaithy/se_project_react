import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({
  closeActiveModal,
  onAddItem,
  isOpen,
  selectedOption,
  handleOptionChange,
}) => {
  const [name, setName] = useState();
  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  const [link, setUrl] = useState();
  const handleUrlChange = (e) => {
    console.log(e.target.value);
    setUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, link });
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        {" "}
        Name
        <input
          id="name"
          type="text"
          className="modal__input"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        {" "}
        Image
        <input
          id="imageUrl"
          type="url"
          className="modal__input"
          placeholder="image URL"
          value={link}
          onChange={handleUrlChange}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            name="hot"
            className="modal__radio-input"
            id="hot"
            checked={selectedOption === "hot"}
            onChange={handleOptionChange}
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            name="warm"
            className="modal__radio-input"
            id="warm"
            checked={selectedOption === "warm"}
            onChange={handleOptionChange}
          />{" "}
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            name="cold"
            className="modal__radio-input"
            id="cold"
            checked={selectedOption === "cold"}
            onChange={handleOptionChange}
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
