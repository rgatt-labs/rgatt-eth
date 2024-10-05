import React from "react";
import { useEffect, useState } from "react";
import styles from "./FormContainer.module.css";

const RealEstateForm = () => {
  const [objectId, setObjectId] = useState("");

  useEffect(() => {}, []);

  return (
    <div className={styles.formWrapper}>
      <h2>Real Estate Form</h2>
      <select
        name="realEstateType"
        id="realEstateType"
        onChange={(e) => setObjectId(e.target.value)}
      >
        <option value="buy">Buy</option>
        <option value="sell">Sell</option>
      </select>
      {objectId && <p>Object ID: {objectId}</p>}
    </div>
  );
};

export default RealEstateForm;
