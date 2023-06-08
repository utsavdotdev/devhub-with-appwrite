import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
  Container,
  Card,
} from "@pankod/refine-mui";
import React, { useContext, useEffect, useRef } from "react";
import { FaRegCopy } from "react-icons/fa";
import styles from "../css/components/Post.module.css";
import { FiMoreHorizontal, FiEdit, FiX } from "react-icons/fi";
import { MdVerified, MdDelete } from "react-icons/md";
import { AiOutlineHeart, AiFillHeart, AiOutlineRetweet } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { ContextProvider } from "../config/Context";
import { toast } from "react-hot-toast";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Avatar, { genConfig } from "react-nice-avatar";
import { database } from "../appwrite/appwriteConfig";

const Post = ({ data }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openLightbox, setOpenLightbox] = React.useState(false);
  const open = Boolean(anchorEl);
  const token = localStorage.getItem("token");
  const [like, setLike] = React.useState(false);
  const [reDevit, setReDevit] = React.useState(false);

  const [likeCount, setLikeCount] = React.useState(data?.likes?.length);
  const [reDevitCount, setReDevitCount] = React.useState(
    data?.redevits?.length
  );
  const { userDetails } = useContext(ContextProvider);
  const [user, setUser] = userDetails;
  const config = genConfig(data?.avatar);

  const db_id = import.meta.env.VITE_DATABASE_ID;
  const devit_id = import.meta.env.VITE_DEVIT_COLLECTION_ID;

  useEffect(() => {
    //check if the token is equal to the array of likes object userid
    data?.likes?.map((like) => {
      if (like === token) {
        setLike(true);
      }
    });
  }, [data?.likes, token]);

  useEffect(() => {
    const redevits = data?.redevits;
    let parsed_array = [];
    redevits.map((redevit) => {
      parsed_array.push(JSON.parse(redevit));
    });
    parsed_array.map((reDevit) => {
      if (reDevit.userid === token) {
        setReDevit(true);
      }
    });
  }, [data?.reDevits, token]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const copyCode = () => {
    //copy the code to the clipboard
    navigator.clipboard.writeText(data?.code);
    toast.success("Copied to clipboard");
  };

  const parsedArray = (array) => {
    let parsed_array = [];
    array.map((redevit) => {
      parsed_array.push(JSON.parse(redevit));
    });
    return parsed_array;
  };

  const handleLike = async () => {
    try {
      if (!like) {
        let likes = data?.likes;
        if (likes.length === 0) {
          likes.push(`${user.uid}`);
        } else {
          data?.likes.map((like) => {
            if (like !== token) {
              likes.push(`${user.uid}`);
            }
          });
        }
        const res = await database.updateDocument(db_id, devit_id, data?.$id, {
          likes: likes,
        });
        if (res) {
          setLike(!like);
          setLikeCount(res.likes.length);
          toast.success("Liked");
        }
      } else {
        const likes = data?.likes;
        const filtered = likes.filter((like) => like !== token);
        const res = await database.updateDocument(db_id, devit_id, data?.$id, {
          likes: filtered,
        });
        if (res) {
          setLike(!like);
          setLikeCount(res.likes.length);
          toast.success("Unliked");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReDevit = async () => {
    try {
      if (!reDevit) {
        let redevits = data?.redevits;
        const devits = parsedArray(redevits);
        if (redevits.length === 0) {
          redevits.push(`{"userid":"${user.uid}","name":"${user.username}"}`);
        } else {
          devits.map((redevit) => {
            if (redevit.userid !== token) {
              redevits.push(
                `{"userid":"${user.uid}","name":"${user.username}"}`
              );
            }
          });
        }

        const res = await database.updateDocument(db_id, devit_id, data?.$id, {
          redevits: redevits,
        });
        if (res) {
          setReDevit(!reDevit);
          setReDevitCount(res.redevits.length);
          toast.success("Redevited");
        }
      } else {
        const redevits = data?.redevits;
        const parsed_array = parsedArray(redevits);
        const filtered = parsed_array.filter(
          (redevit) => redevit.userid !== token
        );
        const res = await database.updateDocument(db_id, devit_id, data?.$id, {
          redevits: filtered,
        });
        if (res) {
          setReDevit(!reDevit);
          setReDevitCount(res.redevits.length);
          toast.success("UnRedevited");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await database.deleteDocument(db_id, devit_id, data?.$id);
      if (res) {
        toast.success("Deleted");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const goLink = `/devit/${data?.$id}`;

  return (
    <>
      {
        //open the lightbox when the image is clicked
        openLightbox && data?.image !== "" && (
          <div className={styles.lightbox}>
            <div className={styles.lightbox_container}>
              <img src={data?.image} alt="post" />
              <div className={styles.lightbox_close}>
                <IconButton
                  sx={{
                    width: "35px",
                    height: "35px",
                    color: "text.light",
                    "&:hover": {
                      color: "primary.main",
                      backgroundColor: "rgba(29,161,242,0.1)",
                    },
                  }}
                  onClick={() => setOpenLightbox(false)}
                >
                  <FiX />
                </IconButton>
              </div>
            </div>
          </div>
        )
      }
      <div className={styles.post_container}>
        {reDevit && <span className={styles.devit}>You Redevited</span>}
        <div className={styles.wrapper}>
          <div className={styles.post_left}>
            <Avatar style={{ width: "45px", height: "45px" }} {...config} />
          </div>
          <div className={styles.post_right}>
            <div className={styles.info_top}>
              <div className={styles.info}>
                <span className={styles.info_name}>{data?.name}</span>
                {data?.verified && (
                  <span className={styles.green_tick}>
                    <MdVerified />
                  </span>
                )}
                <span className={styles.username}>@{data?.username}</span>
                <span className={styles.dot}></span>
                <span className={styles.time}>{data?.createdAt}</span>
              </div>
              {token === data?.userid && (
                <>
                  <IconButton
                    sx={{
                      width: "35px",
                      height: "35px",
                      color: "text.light",
                      //make the primary hover color
                      "&:hover": {
                        color: "primary.main",
                        //transparent green background
                        backgroundColor: "rgba(29,161,242,0.1)",
                      },
                    }}
                    onClick={handleClick}
                  >
                    <FiMoreHorizontal />
                  </IconButton>
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
                        width: "85px",
                        padding: "0px",
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
                    <MenuItem>
                      <ListItemIcon
                        style={{
                          minWidth: "0px",
                          marginRight: "6px",
                          fontSize: "16px",
                        }}
                      >
                        <FiEdit />
                      </ListItemIcon>
                      Edit
                    </MenuItem>
                    <MenuItem onClick={handleDelete}>
                      <ListItemIcon
                        style={{
                          minWidth: "0px",
                          marginRight: "6px",
                          fontSize: "16px",
                        }}
                      >
                        <MdDelete />
                      </ListItemIcon>
                      Delete
                    </MenuItem>
                  </Menu>
                </>
              )}
            </div>

            <div className={styles.content}>
              <NavLink to={goLink}>
                <Typography
                  varitant="p"
                  //style the text
                  sx={{
                    fontSize: "16px",
                    fontFamily: "Poppins",
                    color: "text.normal",
                    fontWeight: "400",
                    marginTop: "-5px",
                  }}
                  //highlight the #hashtags and @mentions
                  component="p"
                  dangerouslySetInnerHTML={{
                    //higlight #hashtag and @mentions with the theme color
                    __html: data?.content
                      ?.replace(
                        /#(\w+)/g,
                        '<span style="color: #00BA7C;">#$1</span>'
                      )
                      ?.replace(
                        /@(\w+)/g,
                        '<span style="color: #00BA7C;font-weight: 500;">@$1</span>'
                      ),
                  }}
                ></Typography>
                {data?.image !== null && (
                  <Card
                    //make the image responsive
                    sx={{
                      height: "250px",
                      width: "80%",
                      marginBlock: "10px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={data?.image}
                      alt="post"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      onClick={() => setOpenLightbox(true)}
                    />
                  </Card>
                )}
                {data?.code !== "" && (
                  <div class={styles.codeBlock}>
                    <IconButton
                      sx={{
                        zIndex: "1",
                        width: "30px",
                        height: "30px",
                        color: "text.adv",
                        "&:hover": {
                          color: "primary.main",
                          backgroundColor: "hover",
                        },
                        position: "absolute",
                        top: "5px",
                        right: "5px",
                      }}
                      onClick={copyCode}
                    >
                      <FaRegCopy />
                    </IconButton>
                    <SyntaxHighlighter
                      language="javascript"
                      style={atomOneDark}
                      wrapLines={true}
                      showLineNumbers={true}
                      customStyle={{
                        fontFamily: "Poppins",
                        fontWeight: "400",
                        borderRadius: "6px",
                        padding: "10px",
                      }}
                    >
                      {data?.code}
                    </SyntaxHighlighter>
                  </div>
                )}
              </NavLink>
            </div>
            <div className={styles.action_con}>
              <IconButton
                sx={{
                  width: "37px",
                  height: "37px",
                  color: like ? "#f91880" : "text.light",
                  "&:hover": {
                    color: "#f91880",
                    backgroundColor: "#32253a",
                  },
                }}
                className={styles.icon}
                onClick={handleLike}
              >
                {like ? <AiFillHeart /> : <AiOutlineHeart />}
              </IconButton>
              <span
                className={styles.like}
                style={{ color: like ? "#f91880" : "#5b6773" }}
              >
                {likeCount}
              </span>
              <IconButton
                sx={{
                  width: "37px",
                  height: "37px",
                  color: reDevit ? "primary.main" : "text.light",
                  fontSize: "40px",
                  "&:hover": {
                    color: "primary.main",
                    backgroundColor: "rgba(29,161,242,0.1)",
                  },
                }}
                className={styles.icon}
                onClick={handleReDevit}
              >
                <AiOutlineRetweet />
              </IconButton>
              <span
                className={styles.retweet}
                style={{ color: reDevit ? "#00ba7c" : "#5b6773" }}
              >
                {reDevitCount}
              </span>
              <NavLink to={goLink}>
                <IconButton
                  sx={{
                    width: "37px",
                    height: "37px",
                    color: "text.light",
                    fontSize: "19px",
                    "&:hover": {
                      color: "#1d9bf0",
                      backgroundColor: "#1c3345",
                    },
                  }}
                  className={styles.icon}
                >
                  <BiComment />
                </IconButton>
              </NavLink>
              <span className={styles.comment}>{data?.comments?.length}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
