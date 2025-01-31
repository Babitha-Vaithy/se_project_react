import React, { useEffect } from "react";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const ProfileWrapper = ({ isLoggedIn, children }) => {
  const contextUserData = useContext(CurrentUserContext);
  const currentUser = contextUserData !== null ? contextUserData : null;
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser || !isLoggedIn) {
      navigate("/");
    }
  }, [currentUser, isLoggedIn]);

  return <div className="card">{children}</div>;
};

export default ProfileWrapper;
