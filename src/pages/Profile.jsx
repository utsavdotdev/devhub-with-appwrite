import React, { useContext, useEffect } from "react";
import ProfileHeader from "../components/ProfileHeader";
import Post from "../components/Post";
import { ContextProvider } from "../config/Context";
import { database } from "../appwrite/appwriteConfig";
import { Query } from "appwrite";

const Profile = () => {
  const token = localStorage.getItem("token");
  const [mydevits, setMyDevits] = React.useState([]);
  const { userDetails } = useContext(ContextProvider);
  const [user, setuser] = userDetails;

  const db_id = import.meta.env.VITE_DATABASE_ID;
  const devit_id = import.meta.env.VITE_DEVIT_COLLECTION_ID;

  useEffect(() => {
    fetchMyDevits();
  }, []);

  const fetchMyDevits = async () => {
    try {
      const res = await database.listDocuments(
        db_id,
        devit_id,
        Query["userid" == user?.uid]
      );
      if (res?.documents?.length > 0) {
        setMyDevits(res?.documents);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <ProfileHeader />
      <div
        style={{
          marginTop: "-20px",
        }}
      >
        {mydevits?.map((data) => (
          <Post key={data._id} data={data} />
        ))}
      </div>
    </>
  );
};

export default Profile;
