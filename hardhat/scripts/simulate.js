// Script to simulate Seaport trades for testing the subgraph
const { ethers } = require("hardhat");

// Mock NFT collection addresses - we'll use the real Berachain NFT addresses from constants.md
const MOCK_NFT_COLLECTIONS = [
  "0x141De07E5D4C4759EC9301DA106115D4841f66cD", // Bong Bears
  "0xA0CF472E6132F6B822a944f6F31aA7b261c7c375", // Bond Bears
  "0xf49ec5db255854C4a567de5AB3826c9AAbaFc7cF", // Boo Bears
  "0xDDeAf391c4be2d01ca52aBb8C159a06820ef078C", // Baby Bears
  "0x7711B2Eb2451259dbF211e30157ceB7CFeb79a19"  // Band Bears
];

// Mock token IDs for each collection
const MOCK_TOKEN_IDS = {
  "0x141De07E5D4C4759EC9301DA106115D4841f66cD": [1, 2, 3, 4, 5],
  "0xA0CF472E6132F6B822a944f6F31aA7b261c7c375": [10, 20, 30, 40, 50],
  "0xf49ec5db255854C4a567de5AB3826c9AAbaFc7cF": [100, 200, 300, 400, 500],
  "0xDDeAf391c4be2d01ca52aBb8C159a06820ef078C": [1000, 2000, 3000, 4000, 5000],
  "0x7711B2Eb2451259dbF211e30157ceB7CFeb79a19": [10000, 20000, 30000, 40000, 50000]
};

// Mock wallet addresses (traders)
const MOCK_WALLETS = [
  "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
  "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
  "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
  "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc"
];

// Function to generate a random price between 50 and 200 BERA
function randomPrice() {
  return ethers.parseEther((Math.random() * 150 + 50).toFixed(2).toString());
}

// Function to simulate a random trade
function generateRandomTrade() {
  const collectionIndex = Math.floor(Math.random() * MOCK_NFT_COLLECTIONS.length);
  const collectionAddress = MOCK_NFT_COLLECTIONS[collectionIndex];
  
  const tokenIdIndex = Math.floor(Math.random() * MOCK_TOKEN_IDS[collectionAddress].length);
  const tokenId = MOCK_TOKEN_IDS[collectionAddress][tokenIdIndex];
  
  const sellerIndex = Math.floor(Math.random() * MOCK_WALLETS.length);
  let buyerIndex;
  
  // Make sure buyer and seller are different
  do {
    buyerIndex = Math.floor(Math.random() * MOCK_WALLETS.length);
  } while (buyerIndex === sellerIndex);
  
  const seller = MOCK_WALLETS[sellerIndex];
  const buyer = MOCK_WALLETS[buyerIndex];
  const price = randomPrice();
  
  return {
    collectionAddress,
    tokenId,
    seller,
    buyer,
    price
  };
}

async function main() {
  console.log("Simulating Seaport trades on Berachain testnet...");
  
  // Get the Seaport contract address from constants (we'll use Seaport 1.6)
  const SEAPORT_ADDRESS = "0x0000000000000068F116a894984e2DB1123eB395";
  
  console.log(`Using Seaport contract at address: ${SEAPORT_ADDRESS}`);
  
  // Note: In a real implementation, we would make actual calls to Seaport contract
  // For this demo, we're just simulating what trades would look like
  
  // Simulate 5 random trades
  const trades = [];
  for (let i = 0; i < 5; i++) {
    const trade = generateRandomTrade();
    trades.push(trade);
    
    console.log(`Trade ${i + 1}:`);
    console.log(`  Collection: ${trade.collectionAddress}`);
    console.log(`  Token ID: ${trade.tokenId}`);
    console.log(`  Seller: ${trade.seller}`);
    console.log(`  Buyer: ${trade.buyer}`);
    console.log(`  Price: ${ethers.formatEther(trade.price)} BERA`);
    console.log("");
  }
  
  console.log("Trade simulation completed.");
  console.log("In a real implementation, these trades would trigger OrderFulfilled events on the Seaport contract,");
  console.log("which would then be indexed by the subgraph.");
  
  return trades;
}

// Execute the script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });