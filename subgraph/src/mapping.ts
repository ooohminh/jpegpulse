import { BigInt, BigDecimal, Address, Bytes } from '@graphprotocol/graph-ts';
import { OrderFulfilled } from '../generated/Seaport/Seaport';
import { Trade, Collection, Trader, DailyStat } from '../generated/schema';
import { ERC721 } from '../generated/Seaport/ERC721';

// Constants for item types in Seaport
const ITEM_TYPE_ERC721 = 2;
const ITEM_TYPE_ERC1155 = 3;
const ITEM_TYPE_NATIVE = 0;
const ITEM_TYPE_ERC20 = 1;

// Helper functions
function toBigDecimal(value: BigInt): BigDecimal {
  return value.toBigDecimal().div(BigDecimal.fromString('1000000000000000000'));
}

function getCollectionName(address: Address): string {
  const contract = ERC721.bind(address);
  const nameResult = contract.try_name();
  
  if (!nameResult.reverted) {
    return nameResult.value;
  }
  
  return address.toHexString();
}

function getDateId(timestamp: BigInt): string {
  const date = new Date(timestamp.toI64() * 1000);
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = date.getUTCDate().toString().padStart(2, '0');
  
  return year.toString() + '-' + month + '-' + day;
}

export function handleOrderFulfilled(event: OrderFulfilled): void {
  // Find NFT in the consideration array (what the buyer received)
  let nftToken: Address | null = null;
  let nftTokenId: BigInt | null = null;
  
  for (let i = 0; i < event.params.consideration.length; i++) {
    const item = event.params.consideration[i];
    if (item.itemType == ITEM_TYPE_ERC721 || item.itemType == ITEM_TYPE_ERC1155) {
      nftToken = item.token;
      nftTokenId = item.identifier;
      break;
    }
  }
  
  // Find the payment token in the offer array (what the seller received)
  let paymentAmount: BigInt = BigInt.fromI32(0);
  
  for (let i = 0; i < event.params.offer.length; i++) {
    const item = event.params.offer[i];
    if (item.itemType == ITEM_TYPE_NATIVE || item.itemType == ITEM_TYPE_ERC20) {
      paymentAmount = paymentAmount.plus(item.amount);
    }
  }
  
  // Only process if we found both an NFT and a payment
  if (nftToken && nftTokenId && paymentAmount.gt(BigInt.fromI32(0))) {
    const collectionAddress = nftToken.toHexString();
    const offererAddress = event.params.offerer.toHexString();
    const recipientAddress = event.params.recipient.toHexString();
    
    // Create or update Collection entity
    let collection = Collection.load(collectionAddress);
    if (!collection) {
      collection = new Collection(collectionAddress);
      collection.name = getCollectionName(nftToken);
      collection.totalVolume = BigDecimal.fromString('0');
      collection.totalTrades = BigInt.fromI32(0);
    }
    
    collection.totalVolume = collection.totalVolume.plus(toBigDecimal(paymentAmount));
    collection.totalTrades = collection.totalTrades.plus(BigInt.fromI32(1));
    collection.lastTradedAt = event.block.timestamp;
    collection.save();
    
    // Create or update Trader entities (both buyer and seller)
    let buyer = Trader.load(recipientAddress);
    if (!buyer) {
      buyer = new Trader(recipientAddress);
      buyer.totalVolume = BigDecimal.fromString('0');
      buyer.totalTrades = BigInt.fromI32(0);
    }
    
    buyer.totalVolume = buyer.totalVolume.plus(toBigDecimal(paymentAmount));
    buyer.totalTrades = buyer.totalTrades.plus(BigInt.fromI32(1));
    buyer.lastTradeAt = event.block.timestamp;
    buyer.save();
    
    let seller = Trader.load(offererAddress);
    if (!seller) {
      seller = new Trader(offererAddress);
      seller.totalVolume = BigDecimal.fromString('0');
      seller.totalTrades = BigInt.fromI32(0);
    }
    
    seller.totalVolume = seller.totalVolume.plus(toBigDecimal(paymentAmount));
    seller.totalTrades = seller.totalTrades.plus(BigInt.fromI32(1));
    seller.lastTradeAt = event.block.timestamp;
    seller.save();
    
    // Update daily stats
    const dateId = getDateId(event.block.timestamp);
    let dailyStat = DailyStat.load(dateId);
    
    if (!dailyStat) {
      dailyStat = new DailyStat(dateId);
      dailyStat.volume = BigDecimal.fromString('0');
      dailyStat.trades = BigInt.fromI32(0);
      dailyStat.uniqueTraders = BigInt.fromI32(0);
      // Note: calculating unique traders would require more complex logic in a real implementation
    }
    
    dailyStat.volume = dailyStat.volume.plus(toBigDecimal(paymentAmount));
    dailyStat.trades = dailyStat.trades.plus(BigInt.fromI32(1));
    dailyStat.save();
    
    // Create Trade entity
    const tradeId = event.transaction.hash.toHexString() + '-' + event.logIndex.toString();
    const trade = new Trade(tradeId);
    trade.collection = collectionAddress;
    trade.tokenId = nftTokenId;
    trade.price = toBigDecimal(paymentAmount);
    trade.offerer = event.params.offerer;
    trade.recipient = event.params.recipient;
    trade.timestamp = event.block.timestamp;
    trade.save();
  }
}