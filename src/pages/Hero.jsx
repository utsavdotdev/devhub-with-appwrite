import React from "react";
import styles from "../css/pages/Hero.module.css";
import { Button } from "@pankod/refine-mui";
import { BsArrowRight, BsMicFill, BsFillBookFill } from "react-icons/bs";
import { FaPencilAlt, FaUserAstronaut, FaLightbulb } from "react-icons/fa";
import { BiGlobe } from "react-icons/bi";
import { RiOpenSourceFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const Hero = () => {
  const features = [
    {
      icon: <FaPencilAlt />,
      title: "Post Devit(Dev Post)",
      desc: "You can post your devit(Dev Post),code snippets,imagesetc.",
    },
    {
      icon: <BiGlobe />,
      title: "Discover Hackathon",
      desc: "You can view and join popular hackathons.",
    },
    {
      icon: <FaLightbulb />,
      title: "Share ideas",
      desc: "You can share idea with other developers througs post,comments etc",
    },
    {
      icon: <BsFillBookFill />,
      title: "Get Popular blogs post",
      desc: "You can get popular blogs post from dev.to and hashnode",
    },
    {
      icon: <FaUserAstronaut />,
      title: "User friendly UI",
      desc: "Devhub has a user friendly UI which is easy to use.",
    },
    {
      icon: <RiOpenSourceFill />,
      title: "Open Source",
      desc: "Devhub is an open source project and you can contribute to it.",
    },
  ];
  return (
    <>
      <div className={styles.hero_container}>
        <div className={styles.center_con}>
          <span className={styles.top_text}>OPEN SOURCE, FREE DEV SPEECH</span>
          <div className={styles.center_text}>
            A Common space where{" "}
            <span className={styles.gradient}>developers</span> Connect,
            Collaborate and Grow.
          </div>
          <div className={styles.bottom_text}>
            A Platform for Developers to{" "}
            <span className={styles.glow}>`Share Insights’</span>, Stay
            Up-to-Date on <span className={styles.glow}>`Tech News`</span>,
            Discover <span className={styles.glow}>`Hackathons`</span>, Connect
            in <span className={styles.glow}>`Voice Channels`</span>, and Much
            More.
          </div>
          <NavLink to="/join">
            <Button
              size="medium"
              variant="contained"
              sx={{
                color: "var(--text)",
                fontFamily: "Poppins",
                fontWeight: "500",
                textTransform: "none",
                backgroundColor: "var(--primary)",
                fontSize: "18px",
                padding: "12px 25px",
                mt: "3rem",
                // "&:hover": {
                //   backgroundColor: "var(--light-primary)",
                // },
              }}
              endIcon={<BsArrowRight size={"28"} />}
            >
              Let's Connect
            </Button>
          </NavLink>
        </div>
      </div>
      <div className={styles.mid_con}>
        <div className={styles.box}>
          <div className={styles.img_con}>
            <img src="/assets/hero.png" alt="image__" srcset="" />
          </div>
        </div>
      </div>
      <div className={styles.bottom_con}>
        <div className={styles.text_con}>
          <span className={styles.heading}>
            The features <br />
            packed with <span className={styles.gradient}>DevHub</span>
          </span>
          <span className={styles.label}>
            DevHub has all the legit features that helps the developer to
            unleash their potential.
          </span>
        </div>
        <div className={styles.features_wrapper}>
          {features.map((feature) => (
            <div className={styles.feature_box}>
              <span className={styles.feature_icon}>{feature.icon}</span>
              <span className={styles.feature_title}>{feature.title}</span>
              <span className={styles.feature_desc}>{feature.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.footer_con}>
        <p>
          devhubs.tech <span>&#169; All right reserved</span>
        </p>
        <p className={styles.to}>
          Thanks to{" "}
          <a
            href="https://appwrite.io"
            target="_blank"
            className={styles.to_link}
          >
            Appwrite
          </a>{" "}
          and{" "}
          <a
            href="https://hashnode.com"
            target="_blank"
            className={styles.to_link}
          >
            Hashnode
          </a>
        </p>
        <p>
          Made with 💖
        </p>
      </div>
    </>
  );
};

export default Hero;
