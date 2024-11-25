import React, { useState, useEffect, useRef } from "react";
import styles from "./FormContainer.module.css";
import axios from "axios";
import { VehiclesContract } from "../ContractSimulator/Contract/Contract";

const HealthForm = ({
  setContractList,
  contractList,
}: {
  setContractList: React.Dispatch<React.SetStateAction<VehiclesContract[]>>;
  contractList: VehiclesContract[];
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [waitingFetchState, setWaitingFetchState] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);

  // State for form fields
  const [coverType, setCoverType] = useState("Comprehensive");
  const [typeVehicle, setTypeVehicle] = useState("Car");
  const [useOfVehicle, setUseOfVehicle] = useState("Personal");
  const [country, setCountry] = useState("France");
  const [city, setCity] = useState("Paris");
  const [attribContract, setAttributsContract] =
    useState<VehiclesContract | null>(null);

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

  const coverTypeRef = useRef<HTMLSelectElement>(null);
  const typeVehicleRef = useRef<HTMLSelectElement>(null);
  const useOfVehicleRef = useRef<HTMLSelectElement>(null);
  const countryRef = useRef<HTMLSelectElement>(null);
  const cityRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (waitingFetchState) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            setWaitingFetchState(false);
            return 10;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      setTimeLeft(10);
    }
    return () => clearInterval(timer);
  }, [waitingFetchState]);

  const fetchContractDetails = async (formData: any) => {
    setError(null);
    try {
      const resContractDetails = await axios.post(
        `api/contract/vehicles/route`,
        {
          cover: formData?.coverType,
          type: formData?.typeVehicle,
          usage: formData?.useOfVehicle,
          country: formData?.country,
          city: formData?.city,
        }
      );
      const vehiclesData: VehiclesContract = resContractDetails.data;
      setAttributsContract(vehiclesData);
    } catch (error) {
      console.log(error);
    }
  };

  const prepareFetching = () => {
    const formData = {
      coverType: coverTypeRef.current?.value,
      typeVehicle: typeVehicleRef.current?.value,
      useOfVehicle: useOfVehicleRef.current?.value,
      country: countryRef.current?.value,
      city: cityRef.current?.value,
    };

    setWaitingFetchState(true);
    fetchContractDetails(formData);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (attribContract) {
      const newContractList = [...contractList, attribContract];
      setContractList(() => {
        return newContractList.filter(
          (item, index) => newContractList.indexOf(item) === index
        );
      });
    }
  };

  return (
    <div className={styles.formWrapper}>
      <div className="w-fit rounded-lg">
        <h2>Vehicle Form</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Cover Type:</label>
              <select
                className={styles.select}
                value={coverType}
                ref={coverTypeRef}
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
                ref={typeVehicleRef}
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
                ref={useOfVehicleRef}
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
                ref={countryRef}
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
                ref={cityRef}
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

            <div className={styles.buttonWrapper}>
              <button
                className={`${styles.submitButton} ${
                  waitingFetchState ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={prepareFetching}
                disabled={waitingFetchState}
                type="button"
              >
                {waitingFetchState ? timeLeft : "Fetch Price"}
              </button>
              <button className={styles.submitButton} type="submit">
                Add to simulation
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default HealthForm;
