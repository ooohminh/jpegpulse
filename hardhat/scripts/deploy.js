// Script to deploy the Seaport contract to Berachain testnet (bArtio)
const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying Seaport contract to Berachain bArtio testnet...");

  // Get the Seaport contract factory
  // Note: In a real deployment, you would have the actual Seaport.sol file
  // For now, we're creating a mock deployment since we don't have the actual contract
  const MockSeaport = await ethers.getContractFactory("MockSeaport");
  
  // Deploy the contract
  const seaport = await MockSeaport.deploy();
  
  // Wait for the contract to be deployed
  await seaport.waitForDeployment();
  
  // Get the deployed contract address
  const seaportAddress = await seaport.getAddress();
  
  console.log(`Seaport contract deployed to: ${seaportAddress}`);
  console.log("This is a mock deployment for demonstration purposes.");
  console.log("In a real project, you would deploy the actual Seaport contract from OpenSea.");
  
  return seaportAddress;
}

// Run the deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });