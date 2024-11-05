// TokenForm.js

import React, { useState } from "react";
import './tokenForm.css';

const TokenForm = () => {
  const [tokenName, setTokenName] = useState<string>("");
  const [symbol, setSymbol] = useState<string>("");
  const [totalSupply, setTotalSupply] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can add validation and handle the data here.
    console.log({ tokenName, symbol, totalSupply });
  };

  return (
    <div className="token-form-container">
      <h1 className="token-sale-title">Launched Token Sale</h1>
      <form onSubmit={handleSubmit} className="token-form">
        <h2 className="form-title">Create Token</h2>

        <div className="form-group">
          <label htmlFor="tokenName" className="form-label">Token Name</label>
          <input
            type="text"
            id="tokenName"
            value={tokenName}
            onChange={(e) => setTokenName(e.target.value)}
            placeholder="Enter token name"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="symbol" className="form-label">Symbol</label>
          <input
            type="text"
            id="symbol"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            placeholder="Enter symbol"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="totalSupply" className="form-label">Total Supply</label>
          <input
            type="number"
            id="totalSupply"
            value={totalSupply}
            onChange={(e) => setTotalSupply(e.target.value)}
            placeholder="Enter total supply"
            className="form-input"
          />
        </div>

        <button type="submit" className="form-submit-button">
          Create Token
        </button>
      </form>
    </div>
  );
};

export default TokenForm;
