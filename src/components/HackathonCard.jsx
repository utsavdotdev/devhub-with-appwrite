import React from "react";
import { Button, IconButton, Tooltip } from "@pankod/refine-mui";
import style from "../css/components/HackathonCard.module.css";
import { BsArrowDownLeft, BsBook, BsCalendar2Event } from "react-icons/bs";
import { SiJsonwebtokens } from "react-icons/si";
import { FiGlobe } from "react-icons/fi";

const HackathonCard = ({ hackathon }) => {
  console.log(hackathon);
  function removeAbout(text) {
    return text.replace(/^about /i, "");
  }

  function addDots(text) {
    return text.length > 30 ? text.substring(0, 20) + "..." : text;
  }
  function extractPrize(text) {
    return "$ " + text.replace(/[^0-9]/g, "");
  }

  function unUsual(text) {
    return text.includes("svg") ? "Unknown" : text;
  }

  return (
    <>
      <div className={style.hack_card}>
        <div className={style.wrapper}>
          <div className={style.hack_left}>
            <div className={style.img}>
              <img src={hackathon?.thumbnail_url} alt="hack_cover" />
            </div>
            <div className={style.hack_info}>
              <p className={style.tittle}>
                {addDots(hackathon?.analytics_identifier)}
              </p>
              <p className={style.days_left}>
                {removeAbout(hackathon?.time_left_to_submission)}
              </p>
              <p className={style.participents}>
                <span>{hackathon?.participants}</span>{" "}
                <span className={style.seperate}>
                  {" "}
                  {hackathon?.registrations_count} participents
                </span>
              </p>
            </div>
          </div>
          <div className={style.hack_right}>
            <div className={style.btn_hack}>
              <Button
                size="medium"
                variant="contained"
                sx={{
                  color: "var(--text)",
                  fontFamily: "Poppins",
                  textTransform: "none",
                  backgroundColor: "#344454",
                  fontSize: "14px",
                  // fontWeight: "bold",
                  padding: "7px 5px",
                  borderRadius: "50vw",
                  width: "100%",
                  // disable hover
                  "&:hover": {
                    backgroundColor: "#344454",
                  },
                }}
              >
                {extractPrize(hackathon?.prize_amount)}
              </Button>
              <Button
                size="medium"
                variant="contained"
                sx={{
                  color: "var(--text)",
                  fontFamily: "Poppins",
                  textTransform: "none",
                  backgroundColor: "var(--primary)",
                  fontSize: "14px",
                  padding: "7px 14px",
                  borderRadius: "50vw",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
                href={hackathon?.url}
                target="_blank"
              >
                Hack it{" "}
                <BsArrowDownLeft
                  style={{
                    transform: "rotate(180deg)",
                    fontWeight: "bold",
                  }}
                  size={"15"}
                />
              </Button>
            </div>
          </div>
        </div>

        <div className={style.bottom}>
          <div className={style.source}>
            <IconButton
              sx={{
                color: "var(--light-text)",
                fontSize: "15px",
              }}
            >
              <FiGlobe />
            </IconButton>
            <span>{unUsual(hackathon?.organization_name)}</span>
          </div>
          {hackathon?.submission_period_dates && (
            <div className={style.source}>
              <IconButton
                sx={{
                  color: "var(--light-text)",
                  fontSize: "15px",
                }}
              >
                <BsCalendar2Event />
              </IconButton>
              <span>{hackathon?.submission_period_dates}</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HackathonCard;
