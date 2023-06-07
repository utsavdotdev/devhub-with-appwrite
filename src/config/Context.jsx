import React, { createContext, useEffect, useState } from "react";
import { account, database } from "../appwrite/appwriteConfig";

export const ContextProvider = createContext();
const Context = ({ children }) => {
  const [theme, setTheme] = useState("dark");
  const [alldevits, setAllDevits] = useState([]);
  const [user, setUser] = useState();
  const id = localStorage.getItem("token");
  const db_id = import.meta.env.VITE_DATABASE_ID;
  const user_id = import.meta.env.VITE_USER_COLLECTION_ID;
  const devit_id = import.meta.env.VITE_DEVIT_COLLECTION_ID;

  useEffect(() => {
    fetchUserDetails();
  }, [account]);

  useEffect(() => {
    fetchAllDevits();
  }, []);

  const fetchAllDevits = async () => {
    try {
      const res = await database.listDocuments(db_id, devit_id);
      setAllDevits(res.documents);
    } catch (e) {
      console.log(e);
    }
  }
  
  const fetchUserDetails = async () => {
    try {
      //fetch user details using id from user collection
      const res = await database.listDocuments(db_id, user_id);
      res.documents.map((doc) => {
        if (doc.uid === id) {
          setUser(doc);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };
  console.log(user);

  return (
    <>
      <ContextProvider.Provider
        value={{
          t: [theme, setTheme],
          userDetails: [user, setUser],
          devits: [alldevits, setAllDevits],
        }}
      >
        {children}
      </ContextProvider.Provider>
    </>
  );
};

export default Context;
