import React, { useContext, useState } from "react";
import styles from "../css/components/Devit.module.css";
import Codemirror from "codemirror";
import {
  Button,
  IconButton,
  InputBase,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  LoadingButton,
} from "@pankod/refine-mui";
import Picker from "emoji-picker-react";
import {
  BsImageFill,
  BsThreeDots,
  BsEmojiSmile,
  BsLink45Deg,
  BsCalendar2Event,
} from "react-icons/bs";
import { BiCodeBlock } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { CgPoll } from "react-icons/cg";
import Avatar, { genConfig } from "react-nice-avatar";

//import the theme
import { tags as t } from "@lezer/highlight";

// codemirror setup
import "codemirror/lib/codemirror.css";
// import "codemirror/theme/dracula.css";
import "codemirror/theme/material-palenight.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/closebrackets";
import { ContextProvider } from "../config/Context";
import { toast } from "react-hot-toast";
import moment from "moment";
import { storage, database } from "../appwrite/appwriteConfig";
import { v4 as uuidv4 } from "uuid";

function Devit() {
  const { userDetails } = useContext(ContextProvider);
  const [user, setuser] = userDetails;
  const [imgUrl, setimgUrl] = useState(null);

  //input state
  const [value, setValue] = React.useState({
    content: "",
    code: "",
    image: "",
  });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [emoji, setEmoji] = React.useState(false);
  const [code, setCode] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [img, setImg] = React.useState(null);

  //ID's
  const db_id = import.meta.env.VITE_DATABASE_ID;
  const devit_id = import.meta.env.VITE_DEVIT_COLLECTION_ID;
  const bucket_id = import.meta.env.VITE_BUCKET_ID;

  const config = genConfig(user?.avatar);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChange = (e) => {
    setValue({ ...value, content: e.target.value });
  };

  const handleEmoji = () => {
    setEmoji(!emoji);
  };

  const [file, setfile] = useState(null);
  const getImg = (e) => {
    const [file] = e.target.files;
    setImg(URL.createObjectURL(file));
    setfile(e.target.files[0]);
  };

  const handleDevit = async () => {
    if (value.content === "" && value.code === "") {
      toast.error("Please enter some content");
      return;
    }
    try {
        setLoading(true);
        let imageUrl = {};
        if (img !== null) {
          const imageUpload = await storage.createFile(
            bucket_id,
            uuidv4(),
            file
          );
          if (imageUpload?.$id !== null) {
            imageUrl = await storage.getFilePreview(bucket_id, imageUpload.$id);
          }
        }
        const devit = await database.createDocument(db_id, devit_id, uuidv4(), {
          userid: user?.uid,
          content: value.content,
          code: value.code,
          image: Object.keys(imageUrl).length === 0 ? imageUrl?.href : "",
          name:
            user?.firstname.charAt(0).toUpperCase() +
            user?.firstname.slice(1) +
            " " +
            user?.lastname.charAt(0).toUpperCase() +
            user?.lastname.slice(1),
          username: user?.username,
          avatar: user?.avatar,
          status: "new",
          verified: user?.verified,
          createdAt: moment().format("MMM Do YY"),
        });
        if (devit?.$id !== null) {
          setLoading(false);
          toast.success("Devit posted successfully");
          setValue({
            content: "",
            code: "",
            image: "",
          });
          setImg(null);
          return window.location.reload();
        }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // handle code mirror editor
  async function Editorinit() {
    codeRef.current = Codemirror.fromTextArea(
      document.getElementById("editor"),
      {
        mode: { name: "javascript", json: true },
        theme: "material-palenight",
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true,
        lineWrapping: true,
        // readOnly: true,
      }
    );
    codeRef.current.on("change", (ins, changes) => {
      const { origin } = changes;
      const code = ins.getValue();
      actualCodeRef.current = code;
      if (origin !== "setValue") {
        setValue({ ...value, code: actualCodeRef.current });
      }
    });
  }
  const codeRef = React.useRef(null);
  const actualCodeRef = React.useRef(null);

  React.useEffect(() => {
    Editorinit();
  }, [code]);

  return (
    <>
      <div className={styles.devit_container}>
        <div className={styles.left}>
          <Avatar style={{ width: "45px", height: "45px" }} {...config} />
        </div>
        <div className={styles.right}>
          <InputBase
            sx={{
              mt: -1,
              flex: 1,
              mx: 0.5,
              fontSize: "1.1rem",
              fontFamily: "Poppins",
              color: "text.normal",
              // style the placeholder
              "& .MuiInputBase-input::placeholder": {
                color: "text.light",
                opacity: 1,
                fontSize: "1.2rem",
                fontWeight: "500",
                fontFamily: "Poppins",
              },
            }}
            placeholder="What's happening?"
            inputProps={{ "aria-label": "search google maps" }}
            multiline
            value={value.content}
            onChange={handleChange}
          ></InputBase>

          {code && (
            <div className={styles.code_container}>
              <IconButton
                sx={{
                  width: "24px",
                  height: "24px",
                  position: "absolute",
                  top: "30px",
                  left: "-8px",
                  color: "text.normal",
                  backgroundColor: "primary.main",
                  borderRadius: "50%",
                  padding: "0px",
                  fontSize: "1.2rem",
                  zIndex: 999,
                  "&:hover": {
                    //dark green
                    backgroundColor: "#1b5e20",
                  },
                }}
                onClick={() => setCode(!code)}
              >
                <RxCross2 />
              </IconButton>
              <textarea id="editor" wrap="hard" />
            </div>
          )}

          {img && (
            <div className={styles.img_container}>
              <IconButton
                sx={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  color: "text.normal",
                  backgroundColor: "primary.main",
                  borderRadius: "50%",
                  width: "28px",
                  height: "28px",
                  fontSize: "1.3rem",
                  padding: "0px",
                  "&:hover": {
                    //light dark green
                    backgroundColor: "#2e7d32",
                  },
                }}
                onClick={() => setImg("")}
              >
                <RxCross2 />
              </IconButton>
              <img src={img} alt="img" />
            </div>
          )}
          <div className={styles.bottom_part}>
            <div className={styles.icon_con}>
              <Tooltip
                title="Add image"
                sx={{ width: "33px", height: "33px", color: "primary.main" }}
              >
                <IconButton
                  sx={{ width: "33px", height: "33px", color: "primary.main" }}
                  disabled={code}
                  aria-label="upload picture"
                  component="label"
                >
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={getImg}
                  />
                  <BsImageFill />
                </IconButton>
              </Tooltip>
              <Tooltip title="Code Block">
                <IconButton
                  sx={{ width: "35px", height: "35px", color: "primary.main" }}
                  onClick={() => setCode(!code)}
                  disabled={img}
                >
                  <BiCodeBlock />
                </IconButton>
              </Tooltip>
              <Tooltip title="Emojis">
                <IconButton
                  sx={{ width: "33px", height: "33px", color: "primary.main" }}
                  //press windows key + . to open emoji picker
                  onClick={handleEmoji}
                >
                  {emoji ? <RxCross2 /> : <BsEmojiSmile />}
                </IconButton>
              </Tooltip>
              <Tooltip title="More">
                <IconButton
                  sx={{ width: "35px", height: "35px", color: "primary.main" }}
                  onClick={handleClick}
                >
                  <BsThreeDots />
                </IconButton>
              </Tooltip>
              <Menu
                id="devit-menu"
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                //style the small menu with the theme color
                PaperProps={{
                  sx: {
                    backgroundColor: "background.default",
                    color: "text.primary",
                    width: "220px",
                    padding: "2px 0",
                    //remove top bottom padding
                    "& .MuiMenu-list": {
                      padding: "0px",
                    },
                  },
                }}
                //style the menu items
                MenuListProps={{
                  sx: {
                    "& .MuiMenuItem-root": {
                      padding: "6px 8px",
                      fontSize: "14px",
                      fontFamily: "Poppins",
                      "&:hover": {
                        backgroundColor: "rgba(29,161,242,0.1)",
                      },
                    },
                  },
                }}
              >
                <MenuItem onClick={handleClose}>
                  <ListItemIcon
                    style={{
                      minWidth: "0px",
                      marginRight: "6px",
                      fontSize: "18px",
                    }}
                  >
                    <BsLink45Deg />
                  </ListItemIcon>
                  Embed links(soon)
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon
                    style={{
                      minWidth: "0px",
                      marginRight: "6px",
                      fontSize: "16px",
                    }}
                  >
                    <CgPoll />
                  </ListItemIcon>
                  Create Poll(soon)
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon
                    style={{
                      minWidth: "0px",
                      marginRight: "6px",
                      fontSize: "15px",
                    }}
                  >
                    <BsCalendar2Event />
                  </ListItemIcon>{" "}
                  Schedule the post(soon)
                </MenuItem>
              </Menu>
            </div>
            <LoadingButton
              loading={loading}
              variant="contained"
              sx={{
                borderRadius: "100vw",
                color: "text.normal",
                fontFamily: "Poppins",
                textTransform: "none",
                fontSize: "15px",
              }}
              onClick={handleDevit}
            >
              Devit
            </LoadingButton>
          </div>
          <div className={styles.emoji_wrapper}>
            {emoji && (
              <Picker
                onEmojiClick={(e) => {
                  setValue({
                    ...value,
                    content: value.content + e.emoji,
                  });
                }}
                groupNames={{
                  smileys_people: "PEOPLE",
                  animals_nature: "NATURE",
                  food_drink: "FOOD",
                  travel_places: "PLACES",
                  activities: "ACTIVITIES",
                  objects: "OBJECTS",
                  symbols: "SYMBOLS",
                  flags: "FLAGS",
                }}
                native
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Devit;
