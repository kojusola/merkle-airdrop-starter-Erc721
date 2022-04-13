import fs from "fs"; // Filesystem
import path from "path"; // Path routing
import Generator from "./generator"; // Generator
import { logger } from "./utils/logger"; // Logging

// Config file path for erc20 token
// const configPath: string = path.join(__dirname, "../config.json");

// Config file path for erc721 token
const configPath: string = path.join(__dirname, "../configNft.json");

/**
 * Throws error and exists process
 * @param {string} erorr to log
 */
function throwErrorAndExit(error: string): void {
  logger.error(error);
  process.exit(1);
}

(async () => {
  // Check if config exists
  if (!fs.existsSync(configPath)) {
    throwErrorAndExit("Missing config.json. Please add.");
  }

  // Read config
  const configFile: Buffer = await fs.readFileSync(configPath);
  const configData = JSON.parse(configFile.toString());

  // Check if config contains airdrop key
  if (configData["airdrop"] === undefined) {
    throwErrorAndExit("Missing airdrop param in config. Please add.");
  }

  // Collect config
  // const decimals: number = configData.decimals ?? 18;
  console.log(configData.airdrop);
  const airdrop: string[] = configData.airdrop;

  // Initialize and call generator
  const generator = new Generator(airdrop);
  await generator.process();
})();
