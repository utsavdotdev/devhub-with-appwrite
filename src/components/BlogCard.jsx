import React from "react";
import style from "../css/components/BlogCard.module.css";
import { BsBook } from "react-icons/bs";
import { SiJsonwebtokens } from "react-icons/si";
import { Tooltip } from "@pankod/refine-mui";
const BlogCard = ({ blog }) => {
  return (
    <>
      <a target={"_blank"} href={blog?.url}>
        <div className={style.blog_card}>
          <div className={style.card_header}>
            <div className={style.profile_img_left}>
              <img src={blog?.user_image} alt="profile" />
            </div>
            <div className={style.right_details}>
              <p className={style.name}>{blog?.user_name}</p>
              <p className={style.date}>{blog?.date}</p>
            </div>
          </div>
          <div className={style.card_body}>
            <div className={style.left}>
              <p className={style.tittle}>{blog?.title}</p>
              <div className={style.footer_desc}>
                <Tooltip
                  title="Read time"
                  sx={{
                    width: "33px",
                    height: "33px",
                    color: "primary.main",
                    marginTop: "-100px",
                  }}
                >
                  <span>
                    <BsBook /> {blog?.read_time} min
                  </span>
                </Tooltip>

                <Tooltip
                  title="Published on"
                  sx={{
                    width: "33px",
                    height: "33px",
                    color: "primary.main",
                    marginTop: "-100px",
                  }}
                >
                  <span>
                    <SiJsonwebtokens />
                    {blog?.source || "hashnode"}
                  </span>
                </Tooltip>
              </div>
            </div>

            <div className={style.right}>
              <img src={blog?.image} alt="blog_cover_img" />
            </div>
          </div>
        </div>
      </a>
    </>
  );
};

export default BlogCard;
