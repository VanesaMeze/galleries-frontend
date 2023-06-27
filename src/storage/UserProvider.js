import { useState } from "react";
import UserContext from "./UserContext";

const UserProvider = ({ children }) => {
  const [userState, setUserState] = useState({});
  const [isUserSignedIn, setIsUsersignedIn] = useState(false);

  const signInUser = (user, token) => {
    setUserState(user);
    setIsUsersignedIn(true);
    localStorage.setItem("access_token", token);
  };

  const signOutUser = () => {
    setUserState({});
    setIsUsersignedIn(false);
  };

  const userContext = {
    user: userState,
    signedIn: isUserSignedIn,
    signInUser,
    signOutUser,
  };
  return (
    <UserContext.Provider value={userContext}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
