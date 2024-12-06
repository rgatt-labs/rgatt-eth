import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styles from "./FormContainer.module.css";

// Generic type for form data
type TemplateData = {
	[key: string]: string[] | number[];
};

// Generic contract type
type Contract = {
	[key: string]: string | number;
};

const DynamicContractForm = () => {
	// State for template and form management
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [templateData, setTemplateData] = useState<TemplateData | null>(null);
	const [contractType, setContractType] = useState<string>("");
	const [formFields, setFormFields] = useState<{
		[key: string]: string | number;
	}>({});
	const [fetchedContract, setFetchedContract] = useState<Contract | null>(null);
	const [waitingFetchState, setWaitingFetchState] = useState(false);
	const [timeLeft, setTimeLeft] = useState(10);

	// Refs for dynamic form fields
	const formRefs = useRef<{
		[key: string]: React.RefObject<HTMLSelectElement>;
	}>({});

	// Timer effect for waiting state
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

	// Fetch template data on component mount
	useEffect(() => {
		const fetchTemplateData = async () => {
			try {
				const response = await axios.post("/api/contract/template/vehicle");
				setTemplateData(response.data);

				// Set initial contract type and form fields
				if (
					response.data.contractType &&
					response.data.contractType.length > 0
				) {
					const initialContractType = response.data.contractType[0];
					setContractType(initialContractType);

					// Initialize form fields with first options
					const initialFields: { [key: string]: string | number } = {};
					Object.keys(response.data)
						.filter((key) => key !== "contractType")
						.forEach((key) => {
							// Use first option for each field
							initialFields[key] = response.data[key][0];

							// Create ref for each field
							formRefs.current[key] = React.createRef<HTMLSelectElement>();
						});

					setFormFields(initialFields);
				}

				setLoading(false);
			} catch (err) {
				setError("Failed to load template data");
				setLoading(false);
			}
		};

		fetchTemplateData();
	}, []);

	// Fetch contract details
	const fetchContractDetails = async () => {
		setError(null);
		setWaitingFetchState(true);
		try {
			const resContractDetails = await axios.post(
				`/api/contract/${contractType}/route`,
				formFields
			);
			setFetchedContract(resContractDetails.data);
		} catch (error) {
			console.log(error);
			setError("Failed to fetch contract details");
		} finally {
			setWaitingFetchState(false);
		}
	};

	// Handle form field changes
	const handleFieldChange = (field: string, value: string | number) => {
		const updatedFields = { ...formFields, [field]: value };

		// Special handling for country-city dynamic update
		if (field === "country" && templateData) {
			// Filter cities for the selected country
			const citiesForCountry = templateData.city.filter((city) =>
				city.toLowerCase().includes(value.toString().toLowerCase())
			);

			// Update city to first available city in the country
			if (citiesForCountry.length > 0) {
				updatedFields["city"] = citiesForCountry[0];
			}
		}

		setFormFields(updatedFields);
	};

	// Render dynamic form fields
	const renderFormFields = () => {
		if (!templateData) return null;

		return Object.keys(templateData)
			.filter((key) => key !== "contractType")
			.map((key) => (
				<div key={key} className={styles.formGroup}>
					<label className={styles.label}>
						{key
							.replace(/([A-Z])/g, " $1")
							.replace(/^./, (str) => str.toUpperCase())}
					</label>
					<select
						ref={formRefs.current[key]}
						value={formFields[key] || ""}
						onChange={(e) => handleFieldChange(key, e.target.value)}
						className={styles.select}
					>
						{(templateData[key] as string[]).map((option) => (
							<option key={option} value={option}>
								{option}
							</option>
						))}
					</select>
				</div>
			));
	};

	// Handle form submission
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		fetchContractDetails();
	};

	if (loading)
		return (
			<div className={`${styles.formWrapper} ${styles.loading}`}>
				<div className={styles.loadingSpinner}></div>
				Loading...
			</div>
		);

	return (
		<div className={styles.formWrapper}>
			<form className={styles.form} onSubmit={handleSubmit}>
				<h2 className={styles.formTitle}>Vehicle Insurance Contract</h2>

				{error && <div className={styles.error}>{error}</div>}

				{renderFormFields()}

				<div className={styles.buttonsContainer}>
					<button
						type="button"
						className={styles.submitButton}
						onClick={fetchContractDetails}
						disabled={waitingFetchState}
					>
						{waitingFetchState ? timeLeft : "Fetch Price"}
					</button>
					<button type="submit" className={styles.submitButton}>
						Add to Simulation
					</button>
				</div>
			</form>

			{fetchedContract && (
				<div className="mt-4 p-4 bg-gray-800 rounded">
					<h3 className="font-bold mb-2 text-white">
						Fetched Contract Details:
					</h3>
					<pre className="text-gray-300">
						{JSON.stringify(fetchedContract, null, 2)}
					</pre>
				</div>
			)}
		</div>
	);
};

export default DynamicContractForm;
