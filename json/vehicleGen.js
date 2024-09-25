// scenario_vehicle.js

const fs = require("fs");

function generateRandomAmount(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateScenarios() {
  const contractType = "vehicle";
  const coverTypes = ["Comprehensive", "Third-Party", "Collision"];
  const typeVehicles = ["Car", "Motorcycle", "Truck"];
  const countries = ["France", "United Kingdom", "United States", "Australia"];
  const useOfVehicles = ["Personal", "Commercial"];
  const citiesByCountry = {
    France: ["Paris", "Lyon", "Marseille"],
    "United Kingdom": ["London", "Manchester", "Birmingham"],
    "United States": ["New York", "Los Angeles", "Chicago"],
    Australia: ["Sydney", "Melbourne", "Brisbane"],
  };

  const scenarios = [];

  for (let coverType of coverTypes) {
    for (let typeVehicle of typeVehicles) {
      for (let useOfVehicle of useOfVehicles) {
        for (let country of countries) {
          for (let city of citiesByCountry[country]) {
            scenarios.push({
              contractType: contractType,
              coverType: coverType,
              typeVehicle: typeVehicle,
              useOfVehicle: useOfVehicle,
              country: country,
              city: city,
              amount: generateRandomAmount(100, 1000),
            });
          }
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

saveScenariosToJsonFile("contract_scenarios_vehicle.json");
