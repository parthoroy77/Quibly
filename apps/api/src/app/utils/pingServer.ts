import colors from "colors";
import config from "../config";
import logger from "../logger";

// Function to ping the server (using public domain)
const pingServer = async () => {
  try {
    // Ping your own server's public URL to prevent shutdown
    logger.info("Pinging Domain: " + config.api_domain_url);
    const response = await fetch(`${config.api_domain_url}/ping`);
    if (response.statusText === "OK") {
      logger.info(colors.blue.bold(`Ping Successful Server Up & Running`));
    }
  } catch (error) {
    logger.error(error);
  }
};

const randomMinutes = Math.floor(Math.random() * 3) + 12; // Random between 12 and 14
const randomInterval = randomMinutes * 60 * 1000; // Convert to milliseconds
setInterval(pingServer, randomInterval);

export default pingServer;
