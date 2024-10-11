# Cryptocurrency Data Fetching and Analysis System

This project implements a system for fetching, storing, and analyzing cryptocurrency data for Bitcoin, Matic, and Ethereum. It consists of a background job for data collection and two API endpoints for data retrieval and statistical analysis.

## Deployment

- Backend: https://coin-geko-eight.vercel.app/
- Frontend: https://koinx-geko.vercel.app/

## Features

1. Background Job:
   - Fetches current price (USD), market cap (USD), and 24-hour change for Bitcoin, Matic, and Ethereum.
   - Uses the CoinGecko API for data retrieval.
   - Runs every 2 hours and stores data in a database.

2. API Endpoints:
   - `/stats`: Returns the latest data for a specified cryptocurrency.
   - `/deviation`: Calculates and returns the standard deviation of the price for the last 100 records of a specified cryptocurrency.

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/Nithinkumar-05/CoinGeko.git
   cd COINGEKO
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up the database (instructions may vary based on your chosen database system).

4. Configure environment variables:
   - Create a `.env` file in the root directory.
   - Add necessary variables (e.g., database connection string, API keys if required).

5. Start the application:
   ```
   npm start
   ```

## Usage

### Live Application

You can interact with the live application using the following URLs:
- Backend API: https://coin-geko-eight.vercel.app/
- Frontend Interface: https://koinx-geko.vercel.app/

### Background Job

The background job runs automatically every 2 hours. Ensure that the application is running for the job to execute.

### API Endpoints

1. `/stats` endpoint:
   - Method: GET
   - Query Parameters: `coin` (options: `bitcoin`, `matic-network`, `ethereum`)
   - Example: `GET https://coin-geko-eight.vercel.app/stats?coin=bitcoin`
   - Sample Response:
     ```json
     {
       "price": 40000,
       "marketCap": 800000000,
       "24hChange": 3.4
     }
     ```

2. `/deviation` endpoint:
   - Method: GET
   - Query Parameters: `coin` (options: `bitcoin`, `matic-network`, `ethereum`)
   - Example: `GET https://coin-geko-eight.vercel.app/deviation?coin=bitcoin`
   - Sample Response:
     ```json
     {
       "deviation": 4082.48
     }
     ```

## Technical Details

- The project uses the CoinGecko API for cryptocurrency data. API documentation: https://docs.coingecko.com/v3.0.1/reference/introduction
- CoinGecko IDs for the cryptocurrencies:
  - Bitcoin: `bitcoin`
  - Matic: `matic-network`
  - Ethereum: `ethereum`
- The standard deviation calculation in the `/deviation` endpoint uses the last 100 records stored in the database for the specified cryptocurrency.

