import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Connection, PublicKey, clusterApiUrl, Keypair } from "@solana/web3.js";
import { AnchorProvider } from "@project-serum/anchor";
import { createMint, TOKEN_PROGRAM_ID } from "@solana/spl-token"; // Correct import for SPL token
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
            console.log("aaaaa", address);
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
        console.log("providerconnect", provider);

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
    }
  };

  // Function to create SPL token
  const createToken = async () => {
    console.log("provider", provider);

    if (!provider || !walletAddress) {
      alert("Please connect your wallet first.");
      return;
    }

    try {
      const mintAuthority = new PublicKey(walletAddress);
      console.log("walletaddressinside", walletAddress.toString());
      const connection = provider.connection;
      const wallet = provider.wallet as any;
      console.log('wallet', provider)
      const keypair = Keypair.generate();
      const token = await createMint(
        connection,
        wallet, // Use the Keypair as the signer
        mintAuthority,
        null, // freezeAuthority, null if no freeze authority is set
        9, // Decimals for token (e.g., 9 is typical for tokens)
        // TOKEN_PROGRAM_ID
        keypair, // Keypair for the mint (created automatically)
      { commitment: "confirmed" }, // Confirm options (optional)
      TOKEN_PROGRAM_ID // Use the standard token program ID
      );

      console.log("Token created:", token.toString());
      alert(`Token created with address: ${token.toString()}`);
    } catch (error) {
      console.error("Error creating token:", error);
      alert("Failed to create token. See console for more details.");
    }
  };

  return (
    <header>
      <h1>Token Sale Platform</h1>
      {walletAddress ? (
        <div className="connected-info">
          <span onClick={() => setShowDisconnectModal(true)}>
            Connected: {walletAddress}
          </span>
          <button className="copy-button" onClick={handleCopyAddress}>
            Copy Address
          </button>
          <button onClick={createToken}>Create SPL Token</button>{" "}
          {/* Add button to create token */}
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
