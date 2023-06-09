import React, { useContext, useEffect } from "react";
import style from "../css/pages/login.module.css";
import { Button } from "@pankod/refine-mui";
import { TextField } from "@pankod/refine-mui";
import { Navigate, useNavigate } from "react-router-dom";
import { SiCodemagic } from "react-icons/si";
import { account } from "../appwrite/appwriteConfig";
import { toast } from "react-hot-toast";
import { ContextProvider } from "../config/Context";
import { v4 as uuidv4 } from "uuid";

const Auth = () => {
  const { userDetails } = useContext(ContextProvider);
  const [user, setuser] = userDetails;
  const token = localStorage.getItem("token");
  const url = import.meta.env.VITE_URL;

  if (token) {
    return <Navigate to="/app" replace />;
  }

  const signIn = (e) => {
    e.preventDefault();
    const uid = uuidv4();
    try {
      const res = account.createOAuth2Session(
        "google",
        `${url}/complete/${uid}`,
        `${url}/join`
      );
    } catch (e) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className={style.container}>
      <div className={style.left}>
        <header>
          <div className={style.logo_wrapper}>
            <SiCodemagic />
          </div>
          <h3>Welcome User</h3>
          <p>Please enter your details</p>
        </header>
        <form className={style.form_auth}>
          <TextField
            InputLabelProps={{
              style: { fontFamily: "Poppins", fontSize: "15px" },
            }}
            sx={{
              fontFamily: "Poppins",
            }}
            id="outlined-basic"
            label="Username"
            variant="outlined"
            disabled={true}
          />
          <TextField
            InputLabelProps={{
              style: { fontFamily: "Poppins", fontSize: "15px" },
            }}
            sx={{
              fontFamily: "Poppins",
            }}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            disabled={true}
          />
          <Button
            onClick={() => {
              alert("Please continue with google.");
            }}
            sx={{
              fontWeight: 500,
              color: "#fff",
              fontFamily: "Poppins",
              textTransform: "capitalize",
              padding: "7px 0",
            }}
            disableElevation
            className={style.login_btn}
            variant="contained"
            disabled={true}
          >
            Continue
          </Button>
          {/* // generate or divider with css */}
          <div className={style.divider}>
            <div className={style.line}></div>
            <p>or</p>
            <div className={style.line}></div>
          </div>

          <Button
            onClick={signIn}
            className={style.googleBth}
            sx={{
              color: "#CCCCCC",
              fontFamily: "Poppins",
              textTransform: "capitalize",
              border: "1px solid #344454",
              padding: "7px 0",
            }}
            disableElevation
            variant="outlined"
          >
            <img src="/assets/google-logo.svg" alt="" />
            Continue with google
          </Button>
        </form>
      </div>
      <div className={style.right}>
        <img src="./auth.svg" className={style.auth_img} />
      </div>
    </div>
  );
};

export default Auth;
