import React, { useEffect, useState } from "react";
import style from "../css/pages/Datacollection.module.css";
import { BsArrowRight, BsMicFill, BsFillBookFill } from "react-icons/bs";
import { FaCaretRight, FaCaretLeft } from "react-icons/fa";
import { Button } from "@pankod/refine-mui";
import { TextField } from "@pankod/refine-mui";
import { useParams, useLocation, NavLink, useNavigate } from "react-router-dom";
import { account, database } from "../appwrite/appwriteConfig";
import Avatar, { genConfig } from "react-nice-avatar";
import { v4 as uuidv4 } from "uuid";
import { pics } from "../config/data";
import { toast } from "react-hot-toast";
import moment from "moment";

const DataCollection = () => {
  let token = localStorage.getItem("token");
  // useEffect(() => {
  //   if (token) {
  //     window.location.href = "/app";
  //   }
  // }, [token]);
  // uselocation
  const { id } = useParams();
  const [details, setdetails] = useState({
    firstname: "",
    lastname: "",
    bio: "",
    username: "",
    email: "",
    avatar: "",
  });
  const db_id = import.meta.env.VITE_DATABASE_ID;
  const user_id = import.meta.env.VITE_USER_COLLECTION_ID;
  const [config, setconfig] = useState({});

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const resp = await account.get();
      setdetails({
        ...details,
        email: resp.email,
      });
      const getUser = database.listDocuments(db_id, user_id);
      getUser.then((res) => {
        console.log(resp?.email);
        res.documents.map((doc) => {
          if (doc.email === resp?.email) {
            localStorage.setItem("token", doc.uid);
            return (window.location.href = "/app");
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();
  const swapAvatar = () => {
    const randomWord = Math.random().toString(36).substring(7);
    setconfig(genConfig(randomWord));
    setdetails({ ...details, avatar: randomWord });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setdetails({ ...details, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      if (
        details.firstname === "" ||
        details.lastname === "" ||
        details.bio === "" ||
        details.username === "" ||
        details.email === ""
      ) {
        return toast.error("Please fill all the fields");
      }
      const res = await database.createDocument(db_id, user_id, uuidv4(), {
        uid: id,
        firstname: details.firstname,
        lastname: details.lastname,
        bio: details.bio,
        username: details.username,
        email: details.email,
        avatar: details.avatar,
        verified: false,
        createdAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
      });
      if (res.$id) {
        toast.success("User created successfully!");
        localStorage.setItem("token", id);
        navigate("/app", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
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
          <div className={style.avatar_wrapper}>
            <FaCaretLeft className={style.left_arrow} onClick={swapAvatar} />
            <Avatar style={{ width: "160px", height: "160px" }} {...config} />
            <FaCaretRight className={style.right_arrow} onClick={swapAvatar} />
          </div>
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
