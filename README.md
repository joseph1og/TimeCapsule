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

### Example: Submitting a Capsule

```clarity
(contract-call? .blockchain-time-capsule submit-capsule "Hello, Future!" u100000 false none)
```

This creates a new capsule with the message "Hello, Future!" that unlocks at block height 100000.

### Example: Viewing a Capsule

```clarity
(contract-call? .blockchain-time-capsule view-capsule u1)
```

This attempts to view the contents of capsule with ID 1. It will only succeed if the current block height is greater than the capsule's unlock time.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgments

- Stacks blockchain community
- Clarity language developers

For more information on Stacks and Clarity, visit [Stacks documentation](https://docs.stacks.co).
