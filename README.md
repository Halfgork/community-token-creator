# Community Token Creator

A comprehensive decentralized platform for creating and managing token-powered communities on the Stellar blockchain. Build governance systems, manage treasuries, and facilitate democratic decision-making with custom token economies.

![Community Token Creator](https://img.shields.io/badge/Stellar-Blockchain-blue) ![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![Rust](https://img.shields.io/badge/Rust-Soroban-orange)

## 🌟 Features

### 🪙 Custom Token Creation
- **Stellar-based Tokens**: Deploy custom tokens on Stellar blockchain using Soroban smart contracts
- **Flexible Configuration**: Customize token name, symbol, supply, decimals, and distribution
- **Multi-wallet Distribution**: Automatically distribute tokens to treasury, founder, and community wallets
- **Admin Controls**: Built-in admin functions for token management and security

### 🗳️ Governance System
- **Democratic Voting**: Create and vote on community proposals
- **Configurable Parameters**: Set voting periods, quorum requirements, and proposal thresholds
- **Token-based Voting Power**: Voting weight based on token holdings
- **Proposal Management**: Track proposal status and execution

### 👥 Community Management
- **Member Organization**: Manage community members with role-based access
- **Membership Controls**: Configure public/private communities and approval processes
- **Activity Tracking**: Monitor community engagement and participation
- **Multi-signature Support**: Enhanced security for treasury and governance actions

### 💰 Treasury Analytics
- **Financial Oversight**: Track community funds and token distribution
- **Real-time Analytics**: Monitor token holder metrics and proposal activity
- **Transparent Reporting**: Public visibility of treasury operations
- **Multi-wallet Architecture**: Separate wallets for different allocation purposes

### 🔐 Security & Compliance
- **Stellar Security**: Built on Stellar's proven blockchain infrastructure
- **Smart Contract Auditing**: Comprehensive Soroban contract implementation
- **Wallet Integration**: Support for Freighter, Albedo, and other Stellar wallets
- **Admin Safeguards**: Freeze mechanisms and administrative controls

## 🏗️ Architecture

### Frontend (Next.js)
```
src/
├── app/                    # Next.js 15 App Router
│   ├── page.tsx           # Landing page
│   ├── dashboard/         # User dashboard
│   ├── create-community/  # Community creation wizard
│   ├── community/[id]/    # Individual community pages
│   └── profile/           # User profile management
├── components/            # Reusable UI components
│   ├── shared/           # Common components
│   └── community/        # Community-specific components
├── lib/                  # Core business logic
│   ├── contractAPI.ts    # Backend API integration
│   ├── stellar.ts        # Stellar SDK utilities
│   ├── tokenOperations.ts # Token management logic
│   └── contractDeployment.ts # Contract deployment
├── stores/               # State management (Zustand)
│   └── walletStore.ts    # Wallet connection state
└── types/                # TypeScript type definitions
```

### Smart Contracts (Rust/Soroban)
```
contracts/soroban-token-contract/
├── src/
│   ├── lib.rs            # Contract entry point
│   ├── contract.rs       # Main contract logic
│   ├── admin.rs          # Administrative functions
│   ├── balance.rs        # Token balance management
│   ├── allowance.rs      # Token allowance system
│   ├── metadata.rs       # Token metadata
│   ├── storage_types.rs  # Storage definitions
│   └── test.rs           # Unit tests
├── Cargo.toml            # Rust dependencies
└── .stellar/             # Stellar configuration
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18.0 or later
- **Rust** 1.70+ with Cargo
- **Stellar CLI** for contract deployment
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Halfgork/community-token-creator.git
   cd community-token-creator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure the following variables:
   ```env
   NEXT_PUBLIC_STELLAR_NETWORK=testnet
   NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
   STELLAR_SECRET_KEY=your_stellar_secret_key
   ```

4. **Build and deploy Soroban contracts** (Optional - for custom deployment)
   ```bash
   cd contracts/soroban-token-contract
   stellar contract build
   stellar contract deploy --wasm target/wasm32-unknown-unknown/release/soroban_token_contract.wasm
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 📚 Usage Guide

### Creating Your First Community

1. **Connect Your Wallet**
   - Click "Connect Wallet" in the header
   - Select your preferred Stellar wallet (Freighter, Albedo, etc.)
   - Authorize the connection

2. **Community Setup Wizard**
   - **Basic Info**: Enter community name and description
   - **Token Settings**: Configure token name, symbol, and initial supply
   - **Governance**: Set voting periods, quorum requirements, and proposal thresholds
   - **Distribution**: Allocate tokens between treasury, founder, and community pools
   - **Wallet Configuration**: Specify destination addresses for token distribution

3. **Deploy and Launch**
   - Review all settings in the final step
   - Click "Deploy Community" to create your token contract
   - Wait for blockchain confirmation
   - Access your new community dashboard

### Managing Your Community

#### Dashboard Overview
- View all your communities and their key metrics
- Monitor total members, active proposals, and treasury balances
- Access quick actions for community management

#### Community Administration
- **Members**: Invite new members and manage roles
- **Treasury**: Monitor funds and approve spending proposals
- **Governance**: Create proposals and facilitate voting
- **Analytics**: Track community growth and engagement

#### Token Operations
- **Transfer Tokens**: Send tokens between community members
- **Mint Additional Tokens**: Create new tokens (admin only)
- **Burn Tokens**: Remove tokens from circulation (admin only)
- **Freeze/Unfreeze**: Emergency controls for token operations

## 🛠️ Development

### Technology Stack

**Frontend**
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe JavaScript development
- **Tailwind CSS 4**: Modern utility-first CSS framework
- **Zustand**: Lightweight state management
- **Lucide React**: Beautiful icon library
- **TanStack Query**: Data fetching and caching

**Blockchain Integration**
- **Stellar SDK**: Stellar blockchain interaction
- **Stellar Wallets Kit**: Multi-wallet support
- **Soroban**: Stellar smart contracts platform

**Smart Contracts**
- **Rust**: Systems programming language
- **Soroban SDK**: Stellar smart contract development kit
- **Soroban Token SDK**: Standard token implementation

### Project Structure

#### Frontend Architecture
- **App Router**: Next.js 15 app directory structure
- **Component Composition**: Reusable and composable UI components
- **State Management**: Zustand for wallet and application state
- **API Layer**: Abstracted contract interactions through API clients
- **Type Safety**: Comprehensive TypeScript coverage

#### Smart Contract Design
- **Modular Architecture**: Separated concerns for admin, balance, allowance management
- **Security First**: Built-in admin controls and freeze mechanisms
- **Gas Optimization**: Efficient storage and computation patterns
- **Extensibility**: Designed for future feature additions

### Local Development Setup

1. **Environment Configuration**
   ```bash
   # Development environment
   NEXT_PUBLIC_STELLAR_NETWORK=testnet
   NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
   
   # For contract deployment
   STELLAR_SECRET_KEY=your_testnet_secret_key
   ```

2. **Running the Development Server**
   ```bash
   # Start frontend development server
   npm run dev
   
   # Build for production
   npm run build
   
   # Start production server
   npm start
   ```

3. **Contract Development**
   ```bash
   cd contracts/soroban-token-contract
   
   # Build contract
   stellar contract build
   
   # Run tests
   cargo test
   
   # Deploy to testnet
   stellar contract deploy --wasm target/wasm32-unknown-unknown/release/soroban_token_contract.wasm --network testnet
   ```

## 🧪 Testing

### Frontend Testing
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Smart Contract Testing
```bash
cd contracts/soroban-token-contract

# Run unit tests
cargo test

# Run tests with coverage
cargo test --coverage

# Run integration tests
cargo test --test integration
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write comprehensive tests for new features
- Document public APIs and complex logic

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Stellar Development Foundation** for the Stellar blockchain and Soroban platform
- **Stellar Community** for tools and libraries
- **Open Source Contributors** who made this project possible

## 📞 Support

- **GitHub Issues**: Report bugs and request features
- **Discord**: Join our community for discussions
- **Email**: contact@community-token-creator.com

---

**Built with ❤️ on Stellar blockchain**
