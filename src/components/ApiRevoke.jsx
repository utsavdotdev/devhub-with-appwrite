import React, { useContext, useEffect } from "react";
import { IconButton, LoadingButton, TextField } from "@pankod/refine-mui";
import style from "../css/components/Apirevoke.module.css";
import { toast } from "react-hot-toast";
import { ContextProvider } from "../config/Context";
import { database } from "../appwrite/appwriteConfig";
import { Query } from "appwrite";
const ApiRevoke = () => {
  const { userDetails } = useContext(ContextProvider);
  const [user, setUser] = userDetails;
  const [username, setUsername] = React.useState(user?.username);
  const [loading, setLoading] = React.useState(false);
  const token = localStorage.getItem("token");

  const db_id = import.meta.env.VITE_DATABASE_ID;
  const user_id = import.meta.env.VITE_USER_COLLECTION_ID;

  const changeUsername = async () => {
    if (!username) return toast.error("Please enter username");
    setLoading(true);
    try {
      const check = await database.listDocuments(db_id, user_id, [
        Query.equal("username", username),
      ]);
      if (check.documents.length > 0) {
        setLoading(false);
        return toast.error("Username already exists");
      }
      const res = await database.updateDocument(db_id, user_id, user.$id, {
        username: username,
      });
      if (res) {
        setUser(res);
        setLoading(false);
        toast.success("Username changed successfully");
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className={style.header_api}>
      <p className={style.info}>You can use change your username.</p>
      <div className={style.input_con}>
        <TextField
          value={username}
          inputProps={{
            style: {
              height: "15px",
              fontSize: "14px",
              fontFamily: "Poppins",
              width: "350px",
            },
          }}
          InputLabelProps={{
            style: { fontFamily: "Poppins", fontSize: "15px" },
          }}
          sx={{
            fontFamily: "Poppins",
          }}
          id="outlined-basic"
          variant="outlined"
          label="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        {/* <IconButton
          onClick={() => copyToClipboard()}
          aria-label="logo"
          sx={{
            width: "30px",
            height: "30px",
            fontSize: "15px",
            marginLeft: "-40px",
            // mt: "5px",
          }}
        >
          <FaRegCopy />
        </IconButton> */}
      </div>
      <LoadingButton
        onClick={() => changeUsername()}
        size="medium"
        variant="contained"
        sx={{
          color: "var(--text)",
          fontFamily: "Poppins",
          //   fontWeight: "500",
          textTransform: "none",
          backgroundColor: "var(--primary)",
          fontSize: "14px",
          padding: "7px 20px",
          borderRadius: "50vw",
        }}
        loading={loading}
        // endIcon={<BsArrowRight size={"28"} />}
      >
        Change
      </LoadingButton>
    </div>
  );
};

export default ApiRevoke;
