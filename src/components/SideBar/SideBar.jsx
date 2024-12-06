import avatar from "../../assets/headerAvatar.svg";
import "./SideBar.css";

function SideBar() {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="Default Avatar" />
      <p className="sidebar__username">Babitha Vaithy</p>
    </div>
  );
}

export default SideBar;
