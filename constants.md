# JPEG Pulse - Berachain Constants

## Berachain Network Information

| Key | Value |
|-----|-------|
| Network | Berachain |
| RPC URL | https://rpc.berachain.com/ |
| Chain ID | 80094 |
| Currency symbol | BERA |
| Block Explorer URL | https://berascan.com/ |

## Seaport Contract Addresses

| Contract | Address |
|----------|---------|
| Seaport 1.6 | 0x0000000000000068F116a894984e2DB1123eB395 |
| ConduitController | 0x00000000F9490004C11Cef243f5400493c00Ad63 |

## Status: ALL Berachain NFT Collections Are Being Indexed

The JPEG Pulse subgraph is now configured to index **ALL NFT collections** on Berachain that have been traded through Seaport.

Instead of hardcoding specific collections, the system dynamically:
1. Captures trades for any ERC721 or ERC1155 token
2. Resolves collection names via on-chain contract calls 
3. Builds statistics for all collections automatically

This approach ensures complete coverage of the Berachain NFT ecosystem, including new collections that launch in the future.
