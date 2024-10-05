// scenario_health.js

const fs = require("fs");

function generateRandomAmount(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateScenarios() {
  const contractType = "health";
  const healthInsuranceTypes = [
    "Individual Health Insurance",
    "Family Health Insurance",
    "Group Health Insurance",
  ];
  const coverageDetails = [
    "Basic Coverage",
    "Comprehensive Coverage",
    "Premium Coverage",
  ];
  const medicalNeeds = [
    { preExistingConditions: true, ongoingTreatments: true, surgeries: true },
    { preExistingConditions: true, ongoingTreatments: true, surgeries: false },
    { preExistingConditions: true, ongoingTreatments: false, surgeries: true },
    { preExistingConditions: true, ongoingTreatments: false, surgeries: false },
    { preExistingConditions: false, ongoingTreatments: true, surgeries: true },
    { preExistingConditions: false, ongoingTreatments: true, surgeries: false },
    { preExistingConditions: false, ongoingTreatments: false, surgeries: true },
    {
      preExistingConditions: false,
      ongoingTreatments: false,
      surgeries: false,
    },
  ];
  const additionalCoverage = [
    { dental: true, vision: true, maternity: true, mentalHealth: true },
    { dental: true, vision: true, maternity: true, mentalHealth: false },
    { dental: true, vision: true, maternity: false, mentalHealth: true },
    { dental: true, vision: true, maternity: false, mentalHealth: false },
    { dental: true, vision: false, maternity: true, mentalHealth: true },
    { dental: true, vision: false, maternity: true, mentalHealth: false },
    { dental: true, vision: false, maternity: false, mentalHealth: true },
    { dental: true, vision: false, maternity: false, mentalHealth: false },
    { dental: false, vision: true, maternity: true, mentalHealth: true },
    { dental: false, vision: true, maternity: true, mentalHealth: false },
    { dental: false, vision: true, maternity: false, mentalHealth: true },
    { dental: false, vision: true, maternity: false, mentalHealth: false },
    { dental: false, vision: false, maternity: true, mentalHealth: true },
    { dental: false, vision: false, maternity: true, mentalHealth: false },
    { dental: false, vision: false, maternity: false, mentalHealth: true },
    { dental: false, vision: false, maternity: false, mentalHealth: false },
  ];
  const scenarios = [];

  for (let healthInsuranceType of healthInsuranceTypes) {
    for (let coverageDetail of coverageDetails) {
      for (let medicalNeed of medicalNeeds) {
        for (let additionalNeed of additionalCoverage) {
          scenarios.push({
            contractType: contractType,
            healthInsuranceType: healthInsuranceType,
            coverageDetail: coverageDetail,
            medicalNeeds: medicalNeed,
            additionalCoverage: additionalNeed,
            dependents: null, // Peut être ajouté manuellement selon le besoin
            coverageStartDate: null, // À remplir lors de l'usage réel
            coverageEndDate: null, // À remplir lors de l'usage réel
            amount: generateRandomAmount(100, 1000),
          });
        }
      }
    }
  }

  return scenarios;
}

function saveScenariosToJsonFile(filename) {
  const scenarios = generateScenarios();
  fs.writeFileSync(filename, JSON.stringify(scenarios, null, 2));
  console.log(`Scénarios sauvegardés dans ${filename}`);
}

saveScenariosToJsonFile("contract_scenarios_health.json");
