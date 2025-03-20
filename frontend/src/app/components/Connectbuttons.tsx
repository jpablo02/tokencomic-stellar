"use client";

import {
  StellarWalletsKit,
  WalletNetwork,
  allowAllModules,
  XBULL_ID,
  ISupportedWallet,
} from '@creit.tech/stellar-wallets-kit';
import { useState, useEffect } from 'react';

export default function ConnectButtons() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [kit, setKit] = useState<StellarWalletsKit | null>(null);
  const [isInitializing, setIsInitializing] = useState<boolean>(false);

  // Inicializa el kit una vez al montar el componente
  useEffect(() => {
    const initialize = async () => {
      setIsInitializing(true);
      try {
        const newKit = new StellarWalletsKit({
          network: WalletNetwork.TESTNET,
          selectedWalletId: XBULL_ID,
          modules: allowAllModules(),
        });
        setKit(newKit);
        console.log('Kit inicializado en useEffect:', newKit);
      } catch (error) {
        console.error('Error al inicializar el kit:', error);
        setError('Error al inicializar el kit');
      } finally {
        setIsInitializing(false);
      }
    };

    initialize();
  }, []); // <-- Se ejecuta solo una vez al inicio

  // Función para conectar la wallet
  const connectWallet = async () => {
    if (!kit) {
      setError('El kit no está inicializado');
      return;
    }

    try {
      console.log('Abriendo modal...');
      await kit.openModal({
        onWalletSelected: async (option: ISupportedWallet) => {
          kit.setWallet(option.id);
          const { address } = await kit.getAddress();
          setWalletAddress(address);
          setError(null);
        },
        onClosed: (err) => {
          if (err) setError('Error al cerrar el modal');
        },
        modalTitle: 'Selecciona tu wallet',
      });
    } catch (error) {
      console.error('Error al abrir el modal:', error);
      setError('Error al conectar la wallet');
    }
  };

  // Función para desconectar
  const disconnectWallet = () => {
    setWalletAddress(null);
    setError(null);
  };

  return (
    <div style={styles.container}>
      <h1>Stellar Wallets Kit - Next.js</h1>
      {error && <p style={styles.error}>{error}</p>}
      {walletAddress ? (
        <>
          <p style={styles.success}>Conectado: {walletAddress}</p>
          <button onClick={disconnectWallet} style={styles.button}>
            Desconectar
          </button>
        </>
      ) : (
        <>
          <p>Selecciona una wallet</p>
          <button
            onClick={connectWallet}
            style={styles.button}
            disabled={isInitializing}
          >
            {isInitializing ? 'Inicializando...' : 'Conectar Wallet'}
          </button>
        </>
      )}
    </div>
  );
}

// Estilos (igual que antes)
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  error: {
    color: 'red',
  },
  success: {
    color: 'green',
  },
  button: {
    marginTop: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
  },
};