import React, { useContext, useEffect } from "react";
import { IconButton, LoadingButton, TextField } from "@pankod/refine-mui";
import { Button } from "@pankod/refine-mui";

import style from "../css/components/Apirevoke.module.css";
import { FaRegCopy } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { ContextProvider } from "../config/Context";
const ApiRevoke = () => {
  const { userDetails } = useContext(ContextProvider);
  const [user, setUser] = userDetails;
  const [key, setKey] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const token = localStorage.getItem("token");
  const copyToClipboard = () => {
    navigator.clipboard.writeText(key);
  };

  useEffect(() => {
    setKey(user?.apiKey);
  }, []);

  const revokeKey = async () => {
    setKey("");
    setLoading(true);
    
  };

  return (
    <div className={style.header_api}>
      <p className={style.info}>
        You can use this API key to fetch your devit in your website.
      </p>
      <div className={style.input_con}>
        <TextField
          value={key}
          disabled
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
        />
        <IconButton
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
        </IconButton>
      </div>
      <LoadingButton
        onClick={() => revokeKey()}
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
        Revoke key
      </LoadingButton>
    </div>
  );
};

export default ApiRevoke;
