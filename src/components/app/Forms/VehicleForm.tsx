import React, { useState, useEffect } from "react";
import styles from "./FormContainer.module.css";
import axios from "axios";

interface VehiclesContract {
  _id: string;
  contractType: string;
  coverType: string;
  typeVehicle: string;
  useOfVehicle: string;
  country: string;
  city: string;
  amount: number;
}

const VehicleForm = ({
  setAmount,
}: {
  setAmount: (amount: string) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State for form fields
  const [coverType, setCoverType] = useState("Comprehensive");
  const [typeVehicle, setTypeVehicle] = useState("Car");
  const [useOfVehicle, setUseOfVehicle] = useState("Personal");
  const [country, setCountry] = useState("France");
  const [city, setCity] = useState("Paris");

  // Options for form fields
  const coverTypeOptions = ["Comprehensive", "Third-Party", "Collision"];
  const typeVehicleOptions = ["Car", "Motorcycle", "Truck"];
  const useOfVehicleOptions = ["Personal", "Commercial"];
  const countryOptions = [
    "France",
    "United Kingdom",
    "United States",
    "Australia",
  ];
  const cityOptions = {
    France: ["Paris", "Lyon", "Marseille"],
    "United Kingdom": ["London", "Manchester", "Birmingham"],
    "United States": ["New York", "Los Angeles", "Chicago"],
    Australia: ["Sydney", "Melbourne", "Brisbane"],
  };

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post(`/api/contract/vehicles/route`, {
          cover: coverType,
          type: typeVehicle,
          usage: useOfVehicle,
          country: country,
          city: city,
        });
        setAmount(response.data.amount.toString());
      } catch (error) {
        setError(
          "Error occurred while fetching the amount for this configuration"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [coverType, typeVehicle, useOfVehicle, country, city, setAmount]);

  return (
    <div className={styles.formWrapper}>
      <div style={{ width: "fit-content", borderRadius: "8px" }}>
        <h2>Vehicle Form</h2>
        {error && (
          <p style={{ color: "#e53e3e", marginBottom: "1rem" }}>{error}</p>
        )}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <form className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Cover Type:</label>
              <select
                className={styles.select}
                value={coverType}
                onChange={(e) => setCoverType(e.target.value)}
              >
                {coverTypeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Type of Vehicle:</label>
              <select
                className={styles.select}
                value={typeVehicle}
                onChange={(e) => setTypeVehicle(e.target.value)}
              >
                {typeVehicleOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Use of Vehicle:</label>
              <select
                className={styles.select}
                value={useOfVehicle}
                onChange={(e) => setUseOfVehicle(e.target.value)}
              >
                {useOfVehicleOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Country:</label>
              <select
                className={styles.select}
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  setCity(
                    cityOptions[e.target.value as keyof typeof cityOptions][0]
                  );
                }}
              >
                {countryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>City:</label>
              <select
                className={styles.select}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                {cityOptions[country as keyof typeof cityOptions].map(
                  (option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  )
                )}
              </select>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default VehicleForm;
