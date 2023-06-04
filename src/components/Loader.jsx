import { CircularProgress } from "@pankod/refine-mui";
import React from "react";
import styles from "../css/components/Loader.module.css";

const Loader = ({ height, size }) => {
  return (
    <>
      <div className={styles.loading_container} style={{ minHeight: height }}>
        <CircularProgress color="primary" 
        //set size to small
        size={size}
        />
      </div>
    </>
  );
};

export default Loader;
