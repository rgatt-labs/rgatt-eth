import React from "react";
import { VehiclesContract } from "./Contract";
import styles from "./SummaryContract.module.css";

function upperF(up: string) {
  return up.charAt(0).toUpperCase() + up.slice(1);
}

const SummaryContract = ({
  contractList,
}: {
  contractList: VehiclesContract[];
}) => {
  return (
    <div className={styles.container}>
      {contractList.map((contract) => (
        <div key={contract._id} className={styles.contract}>
          <div className={styles.summary}>
            {upperF(contract.contractType)} - {contract.amount}$/mo
          </div>
          <div className={styles.details}>
            <p>Cover: {contract.coverType}</p>
            <p>Vehicle: {contract.typeVehicle}</p>
            <p>Use: {contract.useOfVehicle}</p>
            <p>
              Location: {contract.city}, {contract.country}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryContract;
