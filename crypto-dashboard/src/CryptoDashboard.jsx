import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const CryptoDashboard = () => {
  const [coin, setCoin] = useState('bitcoin');
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const [deviation, setDeviation] = useState(null);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/stats?coin=${coin}`);
      setStats(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
    }
  };

  const fetchDeviation = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/deviation?coin=${coin}`);
      setDeviation(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Cryptocurrency Stats</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <select 
            className="form-select mb-3" 
            onChange={(e) => setCoin(e.target.value)} 
            value={coin}
          >
            <option value="bitcoin">Bitcoin</option>
            <option value="ethereum">Ethereum</option>
            <option value="matic-network">Matic</option>
          </select>
          <div className="d-grid gap-2">
            <button className="btn btn-primary" onClick={fetchStats}>Get Stats</button>
            <button className="btn btn-secondary" onClick={fetchDeviation}>Get Deviation</button>
          </div>

          {error && <div className="alert alert-danger mt-3" role="alert">{error}</div>}

          {stats && (
            <div className="card mt-4">
              <div className="card-body">
                <h2 className="card-title">Latest Stats for {coin.charAt(0).toUpperCase() + coin.slice(1)}</h2>
                <p className="card-text">Price: ${stats.price}</p>
                <p className="card-text">Market Cap: ${stats.marketCap}</p>
                <p className="card-text">24h Change: {stats["24hChange"]}%</p>
              </div>
            </div>
          )}

          {deviation && (
            <div className="card mt-4">
              <div className="card-body">
                <h2 className="card-title">Standard Deviation for {coin.charAt(0).toUpperCase() + coin.slice(1)}</h2>
                <p className="card-text">Deviation: {deviation.deviation}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CryptoDashboard;