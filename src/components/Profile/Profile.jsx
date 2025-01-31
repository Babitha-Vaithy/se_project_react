import React from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext";
import { useContext } from "react";

function Profile({
  handleCardClick,
  handleAddClick,
  clothingItems,
  handleEditProfile,
  onCardLike,
  onSignOut,
  handleDeleteItem,
}) {
  const contextUserData = useContext(CurrentUserContext);
  const currentUser = contextUserData !== null ? contextUserData : null;
  return (
    <div className="profile">
      {currentUser && (
        <section className="profile__sidebar">
          <SideBar
            handleEditProfile={handleEditProfile}
            onSignOut={onSignOut}
          />
        </section>
      )}
      <section className="profile__clothing-items">
        <ClothesSection
          handleCardClick={handleCardClick}
          handleAddClick={handleAddClick}
          clothingItems={clothingItems}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
