import { Button } from "@pankod/refine-mui";
import React, { useContext } from "react";
import { ContextProvider } from "../config/Context";
import style from "../css/components/ProfileHeader.module.css";
import { account } from "../appwrite/appwriteConfig";
import Avatar, { genConfig } from "react-nice-avatar";
import { toast } from "react-hot-toast";

const ProfileHeader = () => {
  const { userDetails } = useContext(ContextProvider);
  const [user, setuser] = userDetails;
  const config = genConfig(user?.avatar);

  // generate name from firstname and lastname
  const name = user?.firstname + " " + user?.lastname;

  const logout = async () => {
    try {
      localStorage.removeItem("token");
      await account.deleteSession("current");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <header className={style.header_profile}>
        <img className={style.wave} src="/assets/wave.svg" alt="header img" />
        <div className={style.profile_details}>
          <Avatar style={{ width: "150px", height: "150px" }} {...config} />
          <h3>{name}</h3>
          <p className={style.username}>@{user?.username}</p>
          <p className={style.bio}>{user?.bio}</p>
          <div className={style.button_con}>
            <Button
              size="medium"
              variant="contained"
              sx={{
                color: "var(--text)",
                fontFamily: "Poppins",
                textTransform: "none",
                // fontSize: "16px",
                // padding: "10px 15px",
                backgroundColor: "#344454",
                "&:hover": {
                  backgroundColor: "#344454",
                },
              }}
              onClick={() => {
                toast.error("This feature is not available yet");
              }}
            >
              Edit Profile
            </Button>
            <Button
              onClick={() => {
                logout();
              }}
              size="small"
              variant="contained"
              sx={{
                color: "var(--text)",
                fontFamily: "Poppins",
                textTransform: "none",
                backgroundColor: "var(--primary)",
                fontSize: "16px",
                padding: "5px 15px",
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>
    </>
  );
};

export default ProfileHeader;
