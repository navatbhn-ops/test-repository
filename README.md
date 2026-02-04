# EOL Dependencies Test Application

This is a test application intentionally built with **outdated and End-of-Life (EOL) dependencies** to test dependency upgrade agents and tools.

## ⚠️ Warning

**DO NOT USE IN PRODUCTION!** This application contains:
- Deprecated packages
- Known security vulnerabilities
- EOL versions of popular libraries
- Outdated Node.js engine requirements

## Purpose

This project is designed to help test and validate tools that:
- Detect EOL dependencies
- Suggest version upgrades
- Identify security vulnerabilities
- Automate dependency updates

## Outdated Dependencies Included

### Production Dependencies
- **express** `3.21.2` - Major version behind (current: 4.x/5.x)
- **lodash** `3.10.1` - Major version behind (current: 4.x)
- **moment** `2.10.6` - Old version of now-deprecated library (recommended: date-fns or dayjs)
- **request** `2.88.0` - **DEPRECATED** (recommended: axios, node-fetch, or got)
- **body-parser** `1.15.2` - Old version (now built into Express 4.16+)
- **axios** `0.18.0` - Has known security vulnerabilities (current: 1.x)
- **mongoose** `4.13.20` - Major versions behind (current: 8.x)
- **jquery** `2.2.4` - Old version (current: 3.x)
- **bootstrap** `3.3.7` - Major versions behind (current: 5.x)
- **async** `1.5.2` - Old version (current: 3.x)

### Dev Dependencies
- **nodemon** `1.19.4` - Old version (current: 3.x)
- **jest** `24.9.0` - Multiple major versions behind (current: 29.x)

### Engine Requirements
- **Node.js** `10.x` - EOL since 2021-04-30 (current LTS: 20.x/22.x)
- **npm** `6.x` - Old version (current: 10.x)

## Installation

```bash
npm install
```

Note: You may need to use an older Node.js version (e.g., via nvm) for compatibility:
```bash
nvm install 10
nvm use 10
npm install
```

## Running the Application

```bash
npm start
```

Or with nodemon for development:
```bash
npm run dev
```

The server will start on `http://localhost:3000`

## Available Endpoints

- `GET /` - Welcome message
- `GET /api/users` - Get all users with formatted dates
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `GET /api/external-data` - Fetch data using deprecated 'request' library
- `GET /api/axios-data` - Fetch data using old axios version
- `GET /api/parallel-tasks` - Run parallel tasks using old async library

## Known Issues

All dependencies are intentionally outdated. Expected issues include:
- Security vulnerabilities
- Missing features from newer versions
- Potential compatibility issues with modern Node.js versions
- Deprecated APIs and patterns

## Testing Your Upgrade Agent

Your agent should be able to:
1. Identify all EOL and outdated dependencies
2. Suggest appropriate upgrade paths
3. Handle breaking changes between major versions
4. Recommend modern alternatives (e.g., replace 'request' with 'axios' or 'node-fetch')
5. Update Node.js engine requirements
6. Identify deprecated practices (e.g., body-parser is now built into Express)

## Expected Upgrades

### Critical
- Replace `request` with modern alternative (axios 1.x, node-fetch, or got)
- Update `axios` to latest (1.x) - security vulnerabilities in 0.18.0
- Update Node.js engine to current LTS (20.x or 22.x)

### Major Version Upgrades
- `express`: 3.x → 4.x or 5.x
- `lodash`: 3.x → 4.x
- `mongoose`: 4.x → 8.x
- `jest`: 24.x → 29.x
- `bootstrap`: 3.x → 5.x
- `jquery`: 2.x → 3.x
- `async`: 1.x → 3.x

### Recommended Replacements
- `moment` → `date-fns` or `dayjs` (moment is in maintenance mode)
- `body-parser` → Built-in Express middleware (Express 4.16+)

## License

MIT
