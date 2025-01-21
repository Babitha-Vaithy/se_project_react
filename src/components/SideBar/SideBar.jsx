import avatar from "../../assets/headerAvatar.svg";
import "./SideBar.css";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext";
import { useContext } from "react";

function SideBar({ handleEditProfile }) {
  const contextUserData = useContext(CurrentUserContext);
  const currentUser = contextUserData !== null ? contextUserData : null;
  return (
    <div className="sidebar">
      <img
        className="sidebar__avatar"
        src={
          currentUser.avatar != null
            ? currentUser.avatar
            : currentUser.name.charAt(0)
        }
        alt="Default Avatar"
      />
      <p className="sidebar__username">{currentUser.name}</p>
      <div className="sidebar__profile">
        <button
          onClick={handleEditProfile}
          type="button"
          className="sidebar__editprofile"
        >
          Change profile data
        </button>
        <button
          // onClick={handleEditProfile}
          type="button"
          className="sidebar__logout"
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
