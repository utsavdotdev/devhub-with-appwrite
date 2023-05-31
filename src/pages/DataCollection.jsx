import React, { useEffect, useState } from "react";
import style from "../css/pages/Datacollection.module.css";
import { BsArrowRight, BsMicFill, BsFillBookFill } from "react-icons/bs";
import { Button } from "@pankod/refine-mui";
import { TextField } from "@pankod/refine-mui";
import { useParams, useLocation, NavLink } from "react-router-dom";
const DataCollection = () => {
  // let token = localStorage.getItem("token");
  // useEffect(() => {
  //   if (token) {
  //     window.location.href = "/app";
  //   }
  // }, [token]);
  // uselocation
  // const { state } = useLocation();
  // const { res } = state;
  // const { id } = useParams();
  // handle local state
  const [details, setdetails] = useState({
    // firstname: res.givenName,
    // lastname: res.familyName,
    // bio: "I am full stack developer.",
    // username: "",
    // email: res.email,
    firstname: "",
    lastname: "",
    bio: "",
    username: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setdetails({ ...details, [name]: value });
  };

  // generare unique username based on firstname and lastname
  // useEffect(() => {
  //   const username =
  //     details.firstname.toLowerCase() + "_" + details.lastname.toLowerCase();
  //   setdetails({ ...details, username });
  // }, [details.firstname, details.lastname]);

  const handleSubmit = async (e) => {
    try {
    } catch (error) {}
  };

  return (
    <>
      <nav>
        <div className={style.logo}>
          <NavLink to={"/"}>DevHub</NavLink>
        </div>
      </nav>
      <div className={style.container}>
        <header>
          <span>Complete your profile!</span>
          <img
            className={style.complete_profile_img}
            src={"/pic.jpg"}
            alt="profile"
          />
        </header>
        <form className={style.from_data_collection}>
          {/* username feild */}
          <TextField
            name={"username"}
            onChange={handleChange}
            value={details.username}
            className={style.common}
            defaultValue={"rajeshkhadka200"}
            InputLabelProps={{
              style: {
                fontFamily: "Poppins",
                fontSize: "15px",
                lineHeight: "15px",
              },
            }}
            inputProps={{
              style: {
                // height: "15px",
                fontSize: "14px",
                fontFamily: "Poppins",
                width: "100%",
              },
            }}
            id="outlined-basic"
            label="Username"
            variant="outlined"
          />

          <div className={style.row_send}>
            {/* first name field */}
            <TextField
              name={"firstname"}
              value={details.firstname}
              onChange={handleChange}
              InputLabelProps={{
                style: {
                  fontFamily: "Poppins",
                  fontSize: "15px",
                  lineHeight: "15px",
                },
              }}
              inputProps={{
                style: {
                  // height: "15px",
                  fontSize: "14px",
                  fontFamily: "Poppins",
                },
              }}
              sx={{
                width: "100%",
              }}
              id="outlined-basic"
              label="First Name"
              variant="outlined"
            />

            {/* last name field */}
            <TextField
              name={"lastname"}
              onChange={handleChange}
              value={details.lastname}
              InputLabelProps={{
                style: {
                  fontFamily: "Poppins",
                  fontSize: "15px",
                  lineHeight: "15px",
                },
              }}
              inputProps={{
                style: {
                  // height: "15px",
                  fontSize: "14px",
                  fontFamily: "Poppins",
                  width: "100%",
                },
              }}
              sx={{
                width: "100%",
              }}
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
            />
          </div>
          <TextField
            name={"email"}
            onChange={handleChange}
            // value={res.email}
            value={details.email}
            disabled
            className={style.common}
            InputLabelProps={{
              style: {
                fontFamily: "Poppins",
                fontSize: "15px",
                lineHeight: "15px",
              },
            }}
            inputProps={{
              style: {
                // height: "15px",
                fontSize: "14px",
                fontFamily: "Poppins",
                width: "100%",
              },
            }}
            id="outlined-basic"
            label="Email"
            variant="outlined"
          />
          <TextField
            name={"bio"}
            onChange={handleChange}
            value={details.bio}
            multiline
            InputLabelProps={{
              style: {
                fontFamily: "Poppins",
                fontSize: "15px",
                lineHeight: "15px",
              },
            }}
            inputProps={{
              style: {
                height: "150px",
                fontSize: "14px",
                fontFamily: "Poppins",
                width: "100%",
              },
            }}
            id="outlined-basic"
            label="Description"
            variant="outlined"
          />
        </form>
        <div className={style.register_btn_con}>
          <Button
            onClick={handleSubmit}
            size="medium"
            variant="contained"
            sx={{
              color: "var(--text)",
              fontFamily: "Poppins",
              fontWeight: "500",
              textTransform: "none",
              backgroundColor: "var(--primary)",
              fontSize: "16px",
              padding: "7px 15px",
            }}
            endIcon={<BsArrowRight size={"28"} />}
          >
            Register
          </Button>
        </div>
      </div>
    </>
  );
};

export default DataCollection;
