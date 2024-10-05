import React, { useState } from "react";
import styles from "./Contract.module.css";
import ContractPopup from "../../ContractPopup/ContractPopup";
import VehicleForm from "../../Forms/VehicleForm";
import RealEstateForm from "../../Forms/RealEstateForm";
import HealthForm from "../../Forms/HealthForm";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  usePublicClient,
} from "wagmi";
import { parseAbi, parseEther } from "viem";

const CONTRACT_ADDRESS = "0x952d73ecef9db9c869faec604de445efe0bb5976";
const VAULT_ADDRESS = "0x2A7eE92D92aCEaf3508B8b51481c11E46f79Dd94";
const ETH_ADDRESS = "0x0000000000000000000000000000000000000000";

const depositToVaultAbi = parseAbi([
  "function depositToken(address token, uint256 amount) public",
]);

const Contract = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState<any>(null);
  const [amount, setAmount] = useState<number>(NaN);

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  const handleSelectContract = (contract: any) => {
    setSelectedContract(contract);
  };

  const [ethAmount, amountToSendToVault] = useState<string>("");
  const { address, chainId } = useAccount();

  const {
    writeContract,
    data: hash,
    error: writeError,
    isPending: writePending,
  } = useWriteContract();

  const handleSendTransaction = async () => {
    if (!ethAmount) {
      alert("Please enter an amount");
      return;
    }

    const value = parseEther(ethAmount);
    console.log("value", value);

    try {
      await writeContract({
        abi: depositToVaultAbi,
        address: VAULT_ADDRESS,
        functionName: "depositToken",
        args: [ETH_ADDRESS, value],
      });
    } catch (e) {
      console.error(e);
    }
  };

  const renderForm = () => {
    switch (selectedContract?.name) {
      case "Vehicle":
        return <VehicleForm setAmount={setAmount} />;
      case "Real Estate":
        return <RealEstateForm />;
      case "Health":
        return <HealthForm />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.leftContent}>
        {selectedContract ? (
          <div className={styles.formContainer}>{renderForm()}</div>
        ) : (
          <>
            <h1 className={styles.mainTitle}>Welcome to a new era</h1>
            <h2 className={styles.subTitle}>
              Protect yourself more easily
              <br />
              than ever before with the only
              <br />
              Digital Assurance Protocol
            </h2>
            <p className={styles.getStarted}>Get started with our simulator</p>
            <button
              className={styles.createContractButton}
              onClick={handleOpenPopup}
            >
              + Create your contract
            </button>
          </>
        )}
      </div>
      <div className={styles.modalContainer}>
        <div className={styles.modalContent}>
          <h1 className={styles.title}>Simulation Details</h1>
          <button className={styles.button} onClick={handleOpenPopup}>
            + Create your contract
          </button>
          <p className={styles.description}>
            Details of contract added to your estimate are displayed in this
            panel
          </p>
          {hash && (
            <p
              style={{
                width: "100%",
                wordWrap: "break-word",
                wordBreak: "break-all",
              }}
            >
              Transaction Hash: {hash}
            </p>
          )}
          {writeError && <p>Error: {writeError.message}</p>}
        </div>
        <div className={styles.estimatedCostContainer}>
          <div className={styles.estimatedCost}>
            <span>ESTIMATED COST</span>
            {isNaN(amount) ? <span>--/mo</span> : <span>{amount}$/mo</span>}
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.visualizeButton} disabled>
              Visualize
            </button>
            <button
              className={styles.subscribeButton}
              onClick={handleSendTransaction}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <ContractPopup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onSelectContract={handleSelectContract}
      />
    </div>
  );
};

export default Contract;
