// utils.js

function compareWebsites(guessedWebsite, website1, website2) {
  console.log(`Guessed Website: ${guessedWebsite.name}`);
  console.log(`Website 1 CO2: ${website1.co2_kg_per_month}`);
  console.log(`Website 2 CO2: ${website2.co2_kg_per_month}`);

  const website1Co2 = Number(website1.co2_kg_per_month);
  const website2Co2 = Number(website2.co2_kg_per_month);

  if (website1Co2 > website2Co2 && guessedWebsite === website1) {
    return "correct";
  } else if (website1Co2 < website2Co2 && guessedWebsite === website2) {
    return "correct";
  } else {
    return "incorrect";
  }
}


function co2ToTrees(co2) {
  const treeCo2AbsorbPerYear = 0.0018;

  return Math.round(co2 / treeCo2AbsorbPerYear);
}

export { compareWebsites, co2ToTrees};

