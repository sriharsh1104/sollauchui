// components/Header/Header.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { AnchorProvider } from "@project-serum/anchor";
import "./header.css";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = React.useState<string | null>(null);
  const [showDisconnectModal, setShowDisconnectModal] = React.useState(false);
  const [provider, setProvider] = React.useState<AnchorProvider | null>(null);

  useEffect(() => {
    const connectWalletOnLoad = async () => {
      if ("solana" in window) {
        const provider = (window as any).solana;

        if (provider.isPhantom) {
          const { publicKey } = await provider.connect({
            onlyIfTrusted: true,
          });
          if (publicKey) {
            const address = publicKey.toString();
            console.log("aaaaa",address)
            setWalletAddress(address);

            // Set up the Anchor provider
            const connection = new Connection(
              clusterApiUrl("devnet"),
              "confirmed"
            );
            const anchorProvider = new AnchorProvider(connection, provider, {
              commitment: "confirmed",
            });
            setProvider(anchorProvider);
          }
        }
      }
    };

    // Check if wallet is already connected on load
    connectWalletOnLoad();
  }, []);

  const handleWalletConnect = async () => {
    try {
      if ("solana" in window) {
        const provider = (window as any).solana;

        if (provider.isPhantom) {
          const response = await provider.connect();
          const address = response.publicKey.toString();
          setWalletAddress(address);
          console.log("Connected to wallet:", address);

          // Set up the Anchor provider
          const connection = new Connection(
            clusterApiUrl("devnet"),
            "confirmed"
          );
          const anchorProvider = new AnchorProvider(connection, provider, {
            commitment: "confirmed",
          });
          setProvider(anchorProvider);
        } else {
          alert("Phantom Wallet not found. Please install it first.");
        }
      } else {
        alert("Solana object not found in window. Install Phantom Wallet.");
      }
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };

  const handleWalletDisconnect = async () => {
    if ("solana" in window) {
      const provider = (window as any).solana;

      if (provider.isPhantom) {
        try {
          await provider.disconnect();
          console.log("Wallet disconnected");
          setWalletAddress(null); // Clear wallet address immediately
          setProvider(null); // Clear provider
        } catch (error) {
          console.error("Error during wallet disconnect:", error);
        }
      }
    }

    setShowDisconnectModal(false); // Close disconnect modal
  };

  const handleCopyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      // alert("Wallet address copied to clipboard!");
    }
  };

  return (
    <header>
      <h1>Trading Platform</h1>
      {walletAddress ? (
        <div className="connected-info">
          <span onClick={() => setShowDisconnectModal(true)}>
            Connected: {walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}
          </span>
          <button className="copy-button" onClick={handleCopyAddress}>
            Copy Address
          </button>
        </div>
      ) : (
        <button onClick={handleWalletConnect}>Wallet Connect</button>
      )}

      {showDisconnectModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Are you sure you want to disconnect your wallet?</p>
            <button
              className="disconnect-button"
              onClick={handleWalletDisconnect}
            >
              Disconnect
            </button>
            <button
              className="cancel-button"
              onClick={() => setShowDisconnectModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
