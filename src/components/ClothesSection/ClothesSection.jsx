import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext";
import { useContext } from "react";

function ClothesSection({
  handleCardClick,
  handleAddClick,
  clothingItems,
  onCardLike,
}) {
  const contextUserData = useContext(CurrentUserContext);
  const currentUser = contextUserData !== null ? contextUserData : null;
  const userClothingItems =
    clothingItems &&
    clothingItems.filter((item) => {
      if (currentUser) return item.owner === currentUser._id;
    });
  userClothingItems &&
    userClothingItems.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

  return (
    <div className="clothes-section">
      <div className="clothes__containter">
        <p className="clothes__items">Your items</p>
        <button onClick={handleAddClick} className="clothes__btn">
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {userClothingItems &&
          userClothingItems.map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
                onCardLike={onCardLike}
              />
            );
          })}
      </ul>
    </div>
  );
}

export default ClothesSection;
