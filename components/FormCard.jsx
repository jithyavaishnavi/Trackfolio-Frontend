"use client";
import React from "react";

const FormCard = ({ title, children }) => {
  return (
    <div style={styles.card}>
      {title && <h2 style={styles.title}>{title}</h2>}
      <div>{children}</div>
    </div>
  );
};

const styles = {};

export default FormCard;
