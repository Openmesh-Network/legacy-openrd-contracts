# DAODEVT contracts
The smart contracts and deployment of daodevt.

## Setup
```
npm i
```
Copy .env.example to .env and fill in the PRIV_KEY with the private you want to use.

## Testing
```
npm t
```
Runs all the unit tests.

## Test coverage
```
npx hardhat coverage
```
Runs all the unit tests and calculates the test coverage.

## Deployment
```
npx hardhat deploy --network mumbai
```
Deploys the smart contracts to the chosen network. In case the contracts have not changed since last deploy, the will not be redeployed.   
Different networks can be configured in [./hardhat.config.ts](hardhat.config.ts)   
Deployment settings can be changed in [./deploy](deploy)   

## Verify
```
npx hardhat etherscan-verify --network mumbai
npx hardhat sourcify --network mumbai
```
Verifies the deployed contracts source code on etherscan and sourcify.   
Etherscan API key can be configured per network in [./hardhat.config.ts](hardhat.config.ts) combined with .env

## Export
```
npx hardhat export --export export.ts --network mumbai
```
Creates the export.ts file with the address and abi of all deployments. To be used in the frontend.

## Scripts
### Import Aragon deployment
```
npx hardhat run .\scripts\UpdateAragonDeploy.ts --network mumbai
```
Imports the latest deployment of Aragon OSx to hardhat-deploy. The active-contract.json can be acquired from their github: [https://github.com/aragon/osx/blob/develop/active_contracts.json](https://github.com/aragon/osx/blob/develop/active_contracts.json)