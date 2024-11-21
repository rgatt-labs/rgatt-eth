import React, { useEffect, useState } from "react";
import styles from "./Contract.module.css";
import ContractPopup from "../../ContractPopup/ContractPopup";
import VehicleForm from "../../Forms/VehicleForm";
import RealEstateForm from "../../Forms/RealEstateForm";
import HealthForm from "../../Forms/HealthForm";
import TokenSelect, { TokenData } from "./TokenSelect";
import { sendTransaction, getContract, prepareContractCall } from "thirdweb";
import { toEther, toTokens, toUnits, toWei } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { client } from "@/config/client";
import { TransactionButton } from "thirdweb/react";
import SummaryContract from "./SummaryContract";

const CONTRACT_ADDRESS = "0x952d73ecef9db9c869faec604de445efe0bb5976";
const VAULT_ADDRESS = "0x2A7eE92D92aCEaf3508B8b51481c11E46f79Dd94";

// const depositToVaultAbi = parseAbi([
//   "function depositToken(address token, uint256 amount) public",
// ]);

export interface VehiclesContract {
  _id: string;
  contractType: string;
  coverType: string;
  typeVehicle: string;
  useOfVehicle: string;
  country: string;
  city: string;
  amount: number;
}

const Contract = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState<any>(null);
  const [transactionToken, setTransactionToken] = useState<string>(
    TokenData.ETH_ADDRESS.address
  );

  const [error, setError] = useState<string>("");

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  const handleSelectContract = (contract: any) => {
    setSelectedContract(contract);
  };

  const [contractList, setContractList] = useState<VehiclesContract[]>([]);

  //debug purpose
  useEffect(() => {
    console.log("Contract list:", contractList);
  }, [contractList]);

  const smartContract = getContract({
    address: VAULT_ADDRESS,
    chain: sepolia,
    client: client,
  });

  const renderForm = () => {
    switch (selectedContract?.name) {
      case "Vehicle":
        return (
          <VehicleForm
            setContractList={setContractList}
            contractList={contractList}
          />
        );
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
      {contractList[0]?._id && (
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
            <TokenSelect onChange={(token) => setTransactionToken(token)} />
            {error && (
              <p className={styles.description} style={{ color: "red" }}>
                {error}
              </p>
            )}
            <SummaryContract contractList={contractList} />
          </div>
          <div className={styles.estimatedCostContainer}>
            <div className={styles.estimatedCost}>
              <span>ESTIMATED COST</span>
              {!contractList ? (
                <span>--/mo</span>
              ) : (
                <span>
                  {contractList.reduce(
                    (sum, current) => sum + current.amount,
                    0
                  )}
                  $/mo
                </span>
              )}
            </div>
            <div className={styles.buttonContainer}>
              <button className={styles.visualizeButton} disabled>
                Visualize
              </button>
              {/* <button className={styles.subscribeButton}>Subscribe</button> */}
              <TransactionButton
                transaction={() =>
                  prepareContractCall({
                    contract: smartContract,
                    method:
                      "function depositToken(address token, uint256 amount) public",
                    params: [
                      transactionToken,
                      toWei(
                        String(
                          contractList.reduce((acc, val) => acc + val.amount, 0)
                        )
                      ),
                    ],
                  })
                }
                onError={(error) => {
                  console.error(error.message);
                  setError(error.message);
                }}
                unstyled
                className={styles.subscribeButton}
              >
                Subscribe
              </TransactionButton>
            </div>
          </div>
        </div>
      )}
      <ContractPopup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onSelectContract={handleSelectContract}
      />
    </div>
  );
};

export default Contract;
