# Soroban NFT

Full tutorial: https://jamesbachini.com/soroban-nft/

A Stellar Soroban NFT based on ERC-721 and SEP-0039

## Setup

To use this repository, ensure you have the following installed:

1. **Rust**: Install Rust from [rust-lang.org](https://www.rust-lang.org/).
2. **Soroban CLI**: Install Soroban CLI using:
   ```bash
   cargo install --locked --version <latest-version> soroban-cli
   ```
3. **Stellar Wallet**: You'll need a wallet and some funds to deploy on mainnet

## Getting Started

Follow these steps to deploy and interact with the NFT contract:

### 1. Clone the Repository

```bash
git clone https://github.com/jamesbachini/Soroban-NFT.git
cd Soroban-NFT
```

### 2. Compile the Smart Contract

Run the following command to compile the contract to WebAssembly (WASM):

```bash
cargo build --target wasm32-unknown-unknown --release
```

The compiled `.wasm` file will be located in the `target/wasm32-unknown-unknown/release` directory.

### 3. Deploy the Contract

Use the Soroban CLI to deploy the contract to the Stellar testnet:

```bash
soroban deploy --wasm target/wasm32-unknown-unknown/release/soroban_nft.wasm --network testnet
```

The command will return a `contract-id`. Save this ID for future interactions.

### 4. Mint an NFT

Initialize an NFT with a unique ID and owner:

```bash
soroban invoke --contract <contract-id> --fn mint --args '["<owner>"]' --network testnet
```

Replace `<owner>` with the Stellar address of the new owner.

### 5. Transfer Ownership

Transfer the NFT to a new owner:

```bash
soroban invoke --contract <contract-id> --fn transfer --args '["<id>", "<from>", "<to>", "<tokenid>"]' --network testnet
```

### 6. Query Ownership

Retrieve the current owner of the NFT:

```bash
soroban invoke --contract <contract-id> --fn owner --args '["<tokenid>"]' --network testnet
```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to enhance or update the project.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Stellar](https://stellar.org) for creating the Soroban platform.
- The Rust and blockchain development communities for their support and resources.

## Contact

For questions or feedback, feel free to reach out via [Twitter](https://twitter.com/james_bachini)

---

## Links

- [Website](https://jamesbachini.com)
- [YouTube](https://www.youtube.com/c/JamesBachini?sub_confirmation=1)
- [Substack](https://bachini.substack.com)
- [Podcast](https://podcasters.spotify.com/pod/show/jamesbachini)
- [Spotify](https://open.spotify.com/show/2N0D9nvdxoe9rY3jxE4nOZ)
- [Twitter](https://twitter.com/james_bachini)
- [LinkedIn](https://www.linkedin.com/in/james-bachini/)
- [GitHub](https://github.com/jamesbachini)
