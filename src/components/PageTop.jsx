import React from "react";
import styles from "../css/components/PageTop.module.css";

const PageTop = ({ label }) => {
  return (
    <>
      <div className={styles.page_top_con}>
        <span className={styles.label}>{label}</span>
      </div>
    </>
  );
};

export default PageTop;
