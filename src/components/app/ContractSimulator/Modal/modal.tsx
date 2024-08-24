import React, { useState } from 'react';
import axios from 'axios';
import styles from './Modal.module.css';

const vaults = ['Real Estate', 'Vehicle', 'Health'];

const questionsByVault: { [key: string]: { question: string; options: (string | number)[] }[] } = {
  'Real Estate': [
    { question: 'What type of property are you insuring?', options: ['Primary Residence', 'Secondary Residence', 'Rental Apartment'] },
    { question: 'What type of property?', options: ['Apartment', 'House'] },
    { question: 'How many rooms?', options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
    { question: 'In which country is the property located?', options: ['France', 'United Kingdom', 'United States', 'Australia'] },
    { question: 'In which city is the property located?', options: ['Paris', 'Lyon', 'Marseille', 'London', 'Manchester', 'Birmingham', 'New York', 'Los Angeles', 'Chicago', 'Sydney', 'Melbourne', 'Brisbane'] }
  ],
  'Vehicle': [
    { question: 'What type of vehicle are you insuring?', options: ['Car', 'Motorcycle', 'Truck'] },
    { question: 'What is the vehicle’s use?', options: ['Personal', 'Commercial'] },
    { question: 'What is the vehicle’s registration country?', options: ['France', 'United Kingdom', 'United States', 'Australia'] },
    { question: 'In which city is the vehicle registered?', options: ['Paris', 'Lyon', 'Marseille', 'London', 'Manchester', 'Birmingham', 'New York', 'Los Angeles', 'Chicago', 'Sydney', 'Melbourne', 'Brisbane'] },
    { question: 'What is the type of coverage?', options: ['Comprehensive', 'Third-Party', 'Collision'] }
  ],
  'Health': [
    { question: 'What type of health insurance are you looking for?', options: ['Individual Health Insurance', 'Family Health Insurance', 'Group Health Insurance'] },
    { question: 'What level of coverage are you interested in?', options: ['Basic Coverage', 'Comprehensive Coverage', 'Premium Coverage'] },
    { question: 'Do you have any pre-existing conditions?', options: ['Yes', 'No'] },
    { question: 'Are you currently undergoing any ongoing treatments?', options: ['Yes', 'No'] },
    { question: 'Have you had any recent surgeries?', options: ['Yes', 'No'] },
    { question: 'Are you interested in additional coverage for?', options: ['Dental', 'Vision', 'Maternity', 'Mental Health', 'None'] }
  ]
};

const Modal: React.FC = () => {
  const [selectedVault, setSelectedVault] = useState('');
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [simulatedAmount, setSimulatedAmount] = useState<number | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleVaultSelect = (vault: string) => {
    setSelectedVault(vault);
    setQuestions(questionsByVault[vault] || []);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSimulatedAmount(null);
    setShowSummary(false);
  };

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handleSimulate = async () => {
    setIsSimulating(true);
    try {
      const response = await axios.post('/api/simulate', {
        vault: selectedVault,
        answers: answers
      });
      setSimulatedAmount(response.data.amount);
    } catch (error) {
      console.error('Error during simulation:', error);
      setSimulatedAmount(null);
    }
    setIsSimulating(false);
  };

  const renderSummary = () => {
    return (
      <div className={styles.summary}>
        <h2>Summary of Your Answers</h2>
        {questions.map((q, index) => (
          <div key={index} className={styles.summaryItem}>
            <p><strong>{q.question}</strong></p>
            <p>{answers[index]}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <h1 className={styles.title}>Simulator</h1>

        {!selectedVault && (
          <div className={styles.vaultSelector}>
            <select
              value={selectedVault}
              onChange={(e) => handleVaultSelect(e.target.value)}
              className={styles.select}
            >
              <option value="">Select a Vault</option>
              {vaults.map((vault, index) => (
                <option key={index} value={vault}>{vault}</option>
              ))}
            </select>
          </div>
        )}

        {selectedVault && !showSummary && (
          <div className={styles.questionContainer}>
            {currentQuestionIndex < questions.length ? (
              <>
                <p>{questions[currentQuestionIndex].question}</p>
                <div className={styles.options}>
                  {questions[currentQuestionIndex].options.map((option: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<React.AwaitedReactNode> | null | undefined, index: React.Key | null | undefined) => (
                    <button key={index} onClick={() => handleAnswerSelect(option as string)} className={styles.optionButton}>
                      {option}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <button className={styles.simulateButton} onClick={handleSimulate} disabled={isSimulating}>
                {isSimulating ? 'Simulating...' : 'Confirm and Simulate'}
              </button>
            )}
          </div>
        )}

        {showSummary && (
          <div className={styles.summaryContainer}>
            {renderSummary()}
            {!isSimulating && !simulatedAmount && (
              <button className={styles.simulateButton} onClick={handleSimulate} disabled={isSimulating}>
                {isSimulating ? 'Simulating...' : 'Confirm and Simulate'}
              </button>
            )}
          </div>
        )}

        {simulatedAmount !== null && (
          <div className={styles.simulationResult}>
            Estimated contract amount: ${simulatedAmount.toFixed(2)}
          </div>
        )}
      </div>

      <div className={styles.footer}>
        Powered by Rgatt
      </div>
    </div>
  );
};

export default Modal;
