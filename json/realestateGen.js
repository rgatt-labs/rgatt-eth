//scenario_realEstates.js

const fs = require("fs");

function generateRandomAmount(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateScenarios() {
  const contractType = "real_estate";
  const insuredObjects = [
    "Primary Residence",
    "Secondary Residence",
    "Rental Apartment",
  ];
  const propertyTypes = ["Apartment", "House"];
  const numberOfRooms = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const countries = ["France", "United Kingdom", "United States", "Australia"];
  const citiesByCountry = {
    France: ["Paris", "Lyon", "Marseille"],
    "United Kingdom": ["London", "Manchester", "Birmingham"],
    "United States": ["New York", "Los Angeles", "Chicago"],
    Australia: ["Sydney", "Melbourne", "Brisbane"],
  };
  // const cryptoCurrencies = ["ETH", "USDC", "USDT"];

  const scenarios = [];

  for (let insuredObject of insuredObjects) {
    for (let propertyType of propertyTypes) {
      for (let numberOfRoom of numberOfRooms) {
        for (let country of countries) {
          for (let city of citiesByCountry[country]) {
            scenarios.push({
              contractType: contractType,
              insuredObject: insuredObject,
              propertyType: propertyType,
              numberOfRooms: numberOfRoom,
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

saveScenariosToJsonFile("contract_scenarios.json");
