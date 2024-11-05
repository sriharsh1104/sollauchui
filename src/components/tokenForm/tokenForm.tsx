// TokenForm.js

import React, { useState } from "react";

const TokenForm = () => {
  const [tokenName, setTokenName] = useState<string>("");
  const [symbol, setSymbol] = useState<string>("");
  const [totalSupply, setTotalSupply] = useState<string>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // You can add validation and handle the data here.
    console.log({ tokenName, symbol, totalSupply });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white shadow-md rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Create Token</h2>

        <div className="mb-4">
          <label
            htmlFor="tokenName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Token Name
          </label>
          <input
            type="text"
            id="tokenName"
            value={tokenName}
            onChange={(e) => setTokenName(e.target.value)}
            placeholder="Enter token name"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="symbol"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Symbol
          </label>
          <input
            type="text"
            id="symbol"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            placeholder="Enter symbol"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="totalSupply"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Total Supply
          </label>
          <input
            type="number"
            id="totalSupply"
            value={totalSupply}
            onChange={(e) => setTotalSupply(e.target.value)}
            placeholder="Enter total supply"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg focus:outline-none focus:shadow-outline"
        >
          Create Token
        </button>
      </form>
    </div>
  );
};

export default TokenForm;
