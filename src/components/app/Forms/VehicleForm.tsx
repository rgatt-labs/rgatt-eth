import React, { useState, useEffect } from "react";
import styles from "./FormContainer.module.css";
import axios from "axios";

interface MedicalNeeds {
  preExistingConditions: boolean;
  ongoingTreatments: boolean;
  surgeries: boolean;
}

interface AdditionalCoverage {
  dental: boolean;
  vision: boolean;
  maternity: boolean;
  mentalHealth: boolean;
}

interface VehiclesContract {
  _id: string;
  contractType: string;
  healthInsuranceType: string;
  coverageDetail: string;
  medicalNeeds: MedicalNeeds;
  additionalCoverage: AdditionalCoverage;
  dependents: string;
  coverageStartDate: string;
  coverageEndDate: string;
  amount: number;
}

const VehicleForm = ({ setAmount }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contractData, setContractData] = useState<VehiclesContract[] | null>(
    null
  );

  const [coverType, setCoverType] = useState("Comprehensive");
  const [typeVehicle, setTypeVehicle] = useState("Car");
  const [useOfVehicle, setUseOfVehicle] = useState("Personal");
  const [country, setCountry] = useState("France");
  const [city, setCity] = useState("Lyon");

  useEffect(() => {
    const fetchContract = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/api/contract/vehicles`);
        const data: VehiclesContract[] = response.data;
        setContractData(data);
      } catch (error) {
        setError("An error occurred while fetching the contract data.");
      } finally {
        setLoading(false);
      }
    };

    fetchContract();
  }, []);

  const fetchAmount = async () => {
    try {
      console.log("contract data:", contractData);
      const response = await axios.get(
        `/api/contract/id/` + contractData
      );
    } catch (error) {
      setError(
        "Error occurred while fetching the amount for this configuration"
      );
    }
  };

  return (
    <div className={styles.formWrapper}>
      <div
        style={{
          width: "fit-content",
          borderRadius: "8px",
          //   boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2>Vehicle Form</h2>
        {error && (
          <p style={{ color: "#e53e3e", marginBottom: "1rem" }}>{error}</p>
        )}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <form className={styles.form}>
            {contractData && contractData.length > 0 && (
              <div className={styles.formGroup}>
                <label className={styles.label}>Contract ID:</label>
                <select className={styles.select}>
                  {contractData.map((contract) => (
                    <option key={contract._id} value={contract._id}>
                      {contract._id}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className={styles.formGroup}>
              <label className={styles.label}>Cover Type:</label>
              <select
                className={styles.select}
                value={coverType}
                onChange={(e) => setCoverType(e.target.value)}
              >
                <option value="Comprehensive">Comprehensive</option>
                <option value="Third Party">Third Party</option>
                <option value="Third Party Fire and Theft">
                  Third Party Fire and Theft
                </option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Type of Vehicle:</label>
              <select
                className={styles.select}
                value={typeVehicle}
                onChange={(e) => setTypeVehicle(e.target.value)}
              >
                <option value="Car">Car</option>
                <option value="Motorcycle">Motorcycle</option>
                <option value="Truck">Truck</option>
                <option value="Van">Van</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Use of Vehicle:</label>
              <select
                className={styles.select}
                value={useOfVehicle}
                onChange={(e) => setUseOfVehicle(e.target.value)}
              >
                <option value="Personal">Personal</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Country:</label>
              <select
                className={styles.select}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="France">France</option>
                <option value="Germany">Germany</option>
                <option value="Italy">Italy</option>
                <option value="Spain">Spain</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>City:</label>
              <select
                className={styles.select}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="Lyon">Lyon</option>
                <option value="Paris">Paris</option>
                <option value="Marseille">Marseille</option>
                <option value="Bordeaux">Bordeaux</option>
              </select>
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              onClick={fetchAmount}
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default VehicleForm;
