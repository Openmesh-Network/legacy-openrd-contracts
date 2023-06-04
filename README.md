# L3A-dao-backend
The smart contracts and deployment of the L3A DAO

## Setup
```
npm i
```
Copy .env.example to .env and fill in the PRIV_KEY with the private you want to use.

## Deployment
```
npx hardhat run ./scripts/deploy.ts --network mumbai
```
Different networks can be configured in hardhat.config.ts
Deployment settings can be changed in scripts/deploy.ts