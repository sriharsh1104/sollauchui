// components/Header/Header.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleWalletConnect = () => {
    // Add wallet connect logic here
    console.log("Wallet Connect button clicked");
    // Navigate to any other page if needed
    // navigate("/some-route");
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 20px",
        background: "#f0f0f0",
      }}
    >
      <h1>Trading Platform</h1>
      <button
        onClick={handleWalletConnect}
        style={{ padding: "10px 20px", cursor: "pointer" }}
      >
        Wallet Connect
      </button>
    </header>
  );
};

export default Header;
