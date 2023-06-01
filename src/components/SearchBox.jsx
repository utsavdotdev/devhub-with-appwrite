import {
  fontFamily,
  IconButton,
  InputBase,
  positions,
  TextField,
} from "@pankod/refine-mui";
import React from "react";
import { BsSearch } from "react-icons/bs";
import styles from "../css/components/Search.module.css";

const SearchBox = ({ handleSearch, search, setSearch }) => {
  return (
    <>
      <div className={styles.search_container}>
        <InputBase
          variant="filled"
          fullWidth
          id="search"
          placeholder="Search DevHub"
          name="search"
          autoComplete="search"
          size="medium"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            backgroundColor: "hover",
            color: "white",
            borderRadius: "100vw",
            fontSize: "1.1rem",
            fontFamily: "Poppins",
            padding: "0.5rem 1.5rem",
            //style the placeholder
            "& .MuiFilledInput-input::placeholder": {
              color: "text.light",
              opacity: 1,
              fontSize: "1.1rem",
              fontFamily: "Poppins",
            },
          }}
        />
        <IconButton
          sx={{
            backgroundColor: "hover",
            color: "text.light",
            width: "45px",
            height: "45px",
            fontSize: "1.5rem",
            position: "absolute",
            right: "5px",
          }}
          onClick={() => handleSearch()}
        >
          <BsSearch />
        </IconButton>
      </div>
    </>
  );
};

export default SearchBox;
