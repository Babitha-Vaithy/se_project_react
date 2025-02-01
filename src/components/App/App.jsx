import { useEffect, useState, useContext } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Profile from "../Profile/Profile";
import { Footer } from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import Main from "../Main/Main";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../Contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../Contexts/CurrentUserContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import {
  getItems,
  createItems,
  deleteItems,
  editProfile,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { signUp, logIn, getUser } from "../../utils/auth";
import DeleteItemsModal from "../DeleteItemsModal/DeleteItemsModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.name);
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleSignupClick = () => {
    setActiveModal("signUp");
  };

  const handleLogInClick = () => {
    setActiveModal("login");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleEditProfile = () => {
    setActiveModal("editprofile");
  };

  const handleDeleteItem = () => {
    closeActiveModal();
    setActiveModal("deleteitem");
  };

  const onAddItem = (values) => {
    values["weather"] = selectedOption;
    const jwt = localStorage.getItem("jwt");
    createItems(values, jwt)
      .then((data) => {
        setClothingItems((cards) => [data, ...cards]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const onDelete = () => {
    const jwt = localStorage.getItem("jwt");
    deleteItems(selectedCard._id, jwt)
      .then(() => {
        const updateItems = clothingItems.filter((item) => {
          return item._id != selectedCard._id;
        });
        setClothingItems(updateItems);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const onSignUp = ({ name, link, email, password }) => {
    signUp({ name, link, email, password })
      .then((data) => {
        onLogIn(data.email, password);
      })
      .catch(console.error);
  };

  const onLogIn = (email, password) => {
    logIn(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        checkToken(res.token);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const onEditProfile = ({ name, avatar }) => {
    const jwt = localStorage.getItem("jwt");
    editProfile({ name, avatar }, jwt)
      .then((data) => {
        closeActiveModal();
      })
      .catch(console.error);
  };

  const onSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const checkToken = (token) => {
    if (token) {
      getUser(token)
        .then((data) => {
          setCurrentUser(data);
          setIsLoggedIn(true);
        })
        .catch(console.error);
    }
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  const handleCardLike = (id, isLiked) => {
    const token = localStorage.getItem("jwt");
    !isLiked
      ? addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data, currentTemperatureUnit);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    checkToken(jwt);
  }, []);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <CurrentUserContext.Provider value={currentUser}>
          <div className="page__content">
            <Header
              handleLogInClick={handleLogInClick}
              handleSignupClick={handleSignupClick}
              handleAddClick={handleAddClick}
              weatherData={weatherData}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                    handleDeleteItem={handleDeleteItem}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      handleCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      handleEditProfile={handleEditProfile}
                      clothingItems={clothingItems}
                      onCardLike={handleCardLike}
                      onSignOut={onSignOut}
                      handleDeleteItem={handleDeleteItem}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
          </div>
          {activeModal === "add-garment" && (
            <AddItemModal
              closeActiveModal={closeActiveModal}
              isOpen={activeModal === "add-garment"}
              onAddItem={onAddItem}
              selectedOption={selectedOption}
              handleOptionChange={handleOptionChange}
            />
          )}
          {activeModal === "preview" && (
            <ItemModal
              isOpen={activeModal === "preview"}
              card={selectedCard}
              onClose={closeActiveModal}
              handleDeleteItem={handleDeleteItem}
            />
          )}
          {activeModal === "signUp" && (
            <RegisterModal
              closeActiveModal={closeActiveModal}
              isOpen={activeModal === "signUp"}
              onSignUp={onSignUp}
              handleLogInClick={handleLogInClick}
            />
          )}

          {activeModal === "login" && (
            <LoginModal
              closeActiveModal={closeActiveModal}
              isOpen={activeModal === "login"}
              onLogIn={onLogIn}
              handleSignupClick={handleSignupClick}
            />
          )}

          {activeModal === "editprofile" && (
            <EditProfileModal
              closeActiveModal={closeActiveModal}
              isOpen={activeModal === "editprofile"}
              onEditProfile={onEditProfile}
            />
          )}

          {activeModal === "deleteitem" && (
            <DeleteItemsModal
              closeActiveModal={closeActiveModal}
              isOpen={activeModal === "deleteitem"}
              onDelete={onDelete}
              onClose={closeActiveModal}
            />
          )}
        </CurrentUserContext.Provider>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
