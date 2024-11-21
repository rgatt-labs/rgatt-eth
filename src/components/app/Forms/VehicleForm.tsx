import React, { useState, useEffect, useId, useRef } from "react";
import styles from "./FormContainer.module.css";
import axios from "axios";
import { VehiclesContract } from "../ContractSimulator/Contract/Contract";

const VehicleForm = ({
  setContractList,
  contractList,
}: {
  setContractList: React.Dispatch<React.SetStateAction<VehiclesContract[]>>;
  contractList: VehiclesContract[];
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  //   useEffect(() => {
  //     const fetchVehicles = async () => {
  //       setLoading(true);
  //       setError(null);
  //       try {
  //         const response = await axios.post(`/api/contract/vehicles/route`, {
  //           cover: coverType,
  //           type: typeVehicle,
  //           usage: useOfVehicle,
  //           country: country,
  //           city: city,
  //         });
  //         const vehicleType: VehiclesContract = response.data;
  //         console.log("vehicleType after fetch:", vehicleType);
  //         setAttributsContract(vehicleType);
  //       } catch (error) {
  //         setError(
  //           "Error occurred while fetching the amount for this configuration"
  //         );
  //       }
  //       setLoading(false);
  //     };

  //     fetchVehicles();
  //   }, [coverType, typeVehicle, useOfVehicle, country, city]);

  const fetchContractDetails = async (formData: any) => {
    // to change ANY
    setLoading(true);
    setError(null);

    try {
      const resContractDetails = await axios.post(
        `api/contract/vehicles/route`, // change to details
        {
          cover: formData?.coverType,
          type: formData?.typeVehicle,
          usage: formData?.useOfVehicle,
          country: formData?.country,
          city: formData?.city,
        }
      );
      const vehiclesData: VehiclesContract = resContractDetails.data;
      console.log("vehicle details:", vehiclesData); // debug purpose
      setAttributsContract(vehiclesData);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const prepareFetching = () => {
    // Retrieve values directly from refs
    const formData = {
      coverType: coverTypeRef.current?.value,
      typeVehicle: typeVehicleRef.current?.value,
      useOfVehicle: useOfVehicleRef.current?.value,
      country: countryRef.current?.value,
      city: cityRef.current?.value,
    };

    console.log("Form Data:", formData);
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
    console.log("contract list:", contractList);
  };
  const anonymous = () => {};

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
              <button className={styles.submitButton} onClick={prepareFetching}>
                Fetch Price
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

export default VehicleForm;
