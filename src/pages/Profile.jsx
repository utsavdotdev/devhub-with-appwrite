import React, { useContext, useEffect } from "react";
import ProfileHeader from "../components/ProfileHeader";
import Post from "../components/Post";
import { ContextProvider } from "../config/Context";


const Profile = () => {
  const token = localStorage.getItem("token");
  const [mydevits, setMyDevits] = React.useState([]);

  useEffect(() => {
    fetchMyDevits();
  }, []);

  const fetchMyDevits = async () => {
   
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
