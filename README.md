# Pull Request: Blockchain Time Capsule Smart Contract

## Changes Introduced
This PR introduces a new smart contract for a blockchain-based time capsule system. The contract allows users to submit messages or NFTs that are locked for a specified period before becoming publicly viewable.

### Key Features:
- Submit text messages or NFT IDs as time capsules
- Set a future unlock time for each capsule
- View capsule contents only after the unlock time has passed
- Update capsule contents (owner only)
- Basic NFT support (placeholder implementation)

## Files Changed
- `contracts/blockchain-time-capsule.clar`: New Clarity smart contract
- `tests/blockchain-time-capsule.test.ts`: New test suite for the contract
- `README.md`: Updated with project details and usage instructions

## Testing
A comprehensive test suite has been added using Vitest. The tests cover:
- Submitting new capsules
- Attempting to view locked capsules
- Viewing unlocked capsules
- Updating capsules by the owner
- Attempting unauthorized updates

To run the tests:
```bash
npm run test
```

## Deployment
The contract is ready for deployment to the Stacks blockchain. Ensure you have the necessary credentials and blockchain connection set up before deploying.

---

# README.md

# Blockchain Time Capsule

A smart contract implementation of a time capsule system on the Stacks blockchain. Users can submit messages or NFTs that are locked for a specified time before becoming publicly viewable.

## Features

- Submit text messages as time capsules
- Lock NFTs for a future reveal (basic implementation)
- Set custom unlock times for each capsule
- View capsule contents after the unlock time
- Update capsule contents (owner only)

## Getting Started

### Prerequisites

- Node.js and npm installed
- Clarinet CLI tool for Clarity smart contract development

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/blockchain-time-capsule.git
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Running Tests

Execute the test suite:
```
npm run test
```

### Deployment

1. Ensure you have your Stacks wallet set up and funded.
2. Update the deployment settings in `Clarinet.toml` if necessary.
3. Deploy the contract:
   ```
   clarinet deploy
   ```

## Usage

Once deployed, interact with the contract using the Stacks API or a frontend application. Key functions include:

- `submit-capsule`: Create a new time capsule
- `view-capsule`: Attempt to view a capsule's contents
- `update-capsule`: Modify an existing capsule (owner only)
- `submit-nft-capsule`: Lock an NFT in the time capsule (basic implementation)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
