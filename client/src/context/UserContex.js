import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState("");
  const [userAddres, setUserAddress] = useState("");

  const updateUser = (data) => {
    setUser(data);
  };

  const updateAddress = (data) => {
    setUserAddress(data)
  }

  return (
    <UserContext.Provider value={{ user, userAddres, updateUser, updateAddress }}>
      {props.children}
    </UserContext.Provider>
  );
};
