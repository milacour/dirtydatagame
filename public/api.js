const API_URL = "https://dirtydata.onrender.com";

let website1, website2;

const fetchedWebsites = [];

async function fetchRandomWebsiteData() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    if (fetchedWebsites.length === data.length) {
      fetchedWebsites.length = 0;
    }

    while (!website1 || !website2 || website1 === website2 || fetchedWebsites.includes(website1) || fetchedWebsites.includes(website2)) {
      const randomIndex1 = Math.floor(Math.random() * data.length);
      const randomIndex2 = Math.floor(Math.random() * data.length);

      website1 = data[randomIndex1];
      website2 = data[randomIndex2];
    }

    fetchedWebsites.push(website1, website2);

    return [website1, website2];
  } catch (error) {
    console.error("Fejl ved hentning af tilfældige websitedata:", error);
    throw error;
  }
}

export { fetchRandomWebsiteData };