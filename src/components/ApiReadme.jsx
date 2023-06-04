import React from "react";
import styles from "../css/components/ApiReadme.module.css";
import { Chip, margin } from "@pankod/refine-mui";
import { toast } from "react-hot-toast";

const ApiReadme = () => {
  const apiurl = import.meta.env.VITE_API;
  const api = [
    {
      name: "Apiurl/:apikey/:username/getall",
      desc: "To get all your devits",
    },
    {
      name: "Apiurl/:apikey/:username/get/:id",
      desc: "To get specific devit",
    },
    {
      name: "Apiurl/:apikey/:username/delete/:id",
      desc: "To delete specific devit",
    },
    {
      name: "Apiurl/:apikey/:username/update/:id",
      desc: "To update specific devit",
    },
  ];
  return (
    <>
      <div className={styles.readme_con}>
        <span className={styles.title}>
          Documentation{" "}
          <Chip
            label={"Api Url"}
            sx={{
              color: "text.normal",
              fontSize: "14px",
              fontWeight: "400",
              borderRadius: "4px",
              margin: "5px 10px",
              fontFamily: "Poppins",
              letterSpacing: "0.8px",
              width: "fit-content",
              height: "26px",
            }}
            onClick={() => {
              navigator.clipboard.writeText(apiurl);
              toast.success("Copied to clipboard");
            }}
            clickable
          />
        </span>
        <div className={styles.api_list}>
          {api.map((item, index) => {
            return (
              <div className={styles.api} key={index}>
                <Chip
                  label={item.name}
                  sx={{
                    color: "text.normal",
                    fontSize: "14px",
                    fontWeight: "400",
                    borderRadius: "4px",
                    margin: "5px 0",
                    fontFamily: "Poppins",
                    letterSpacing: "0.8px",
                  }}
                />
                <div className={styles.desc}>{item.desc}</div>
              </div>
            );
          })}
          {/* <div className={styles.api}>
            <Chip
              label="Apiurl/:apikey/:username/getall"
              sx={{
                color: "text.normal",
                fontSize: "14px",
                fontWeight: "400",
                borderRadius: "4px",
                padding: "4px",
                margin: "5px 0",
                fontFamily: "Poppins",
                letterSpacing: "0.8px",
              }}
            />
            <div className={styles.desc}>To get your all the devit's</div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default ApiReadme;
