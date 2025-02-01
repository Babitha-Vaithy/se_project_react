import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext";
import { useContext } from "react";

const RegisterModal = ({
  closeActiveModal,
  onSignUp,
  isOpen,
  handleLogInClick,
}) => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [link, setUrl] = useState("");
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignUp({ name, link, email, password });
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      isOpen={isOpen}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label">
        Email
        <input
          id="email"
          type="email"
          className="modal__input"
          placeholder="email"
          value={email}
          onChange={handleEmailChange}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password
        <input
          id="password"
          type="password"
          className="modal__input"
          placeholder="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
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
      <label htmlFor="avatarUrl" className="modal__label">
        {" "}
        Avatar URL
        <input
          id="avatarUrl"
          type="url"
          className="modal__input"
          placeholder="Avatar URL"
          value={link}
          onChange={handleUrlChange}
        />
      </label>
      <button
        type="button"
        onClick={handleLogInClick}
        className="signup__login"
      >
        or Log In
      </button>
    </ModalWithForm>
  );
};

export default RegisterModal;
