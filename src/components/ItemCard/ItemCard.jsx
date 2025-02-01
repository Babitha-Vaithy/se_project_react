import "./ItemCard.css";
import likebtn from "../../assets/likebtn.svg";
import unlikebtn from "../../assets/unlike.svg";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext";
import { useContext } from "react";

function ItemCard({ item, onCardClick, onCardLike, handleDeleteItem }) {
  const contextUserData = useContext(CurrentUserContext);
  const currentUser = contextUserData !== null ? contextUserData : null;
  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = (item) => {
    onCardLike(item._id, item.likes.length > 0 ? true : false);
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
      {currentUser && (
        <img
          onClick={() => handleLike(item)}
          src={
            item.likes.some((id) => id === currentUser._id)
              ? likebtn
              : unlikebtn
          }
          alt="Like"
          className="card__likebtn"
        />
      )}
    </li>
  );
}

export default ItemCard;
