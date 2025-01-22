import "./ItemCard.css";
import likebtn from "../../assets/likebtn.svg";
import unlikebtn from "../../assets/unlike.svg";

function ItemCard({ item, onCardClick, onCardLike }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = (item) => {
    console.log(item);
    // get id from item_.id
    // if item.items.length is greater than 0 , do dislike/delete item else do like/put item
    // onCardLike(item._id, isLiked);
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
      <img
        onClick={handleLike(item)}
        //item.likes!=null ? likebtn : unlikebtn
        src={item.likes.length > 0 ? likebtn : unlikebtn}
        alt="Like"
        className="card__likebtn"
      />
    </li>
  );
}

export default ItemCard;
