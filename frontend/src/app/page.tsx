"use client";

// Importamos las funciones y clases necesarias desde el kit
import {
  StellarWalletsKit,
  WalletNetwork,
  allowAllModules,
  XBULL_ID,
  ISupportedWallet,
} from '@creit.tech/stellar-wallets-kit';
import { useEffect, useState } from 'react';

export default function Home() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Función principal para manejar la selección de wallets
  const initializeWalletKit = async () => {
    try {
      console.log('Inicializando StellarWalletsKit...');

      // 1. Inicializamos el kit
      const kit = new StellarWalletsKit({
        network: WalletNetwork.TESTNET, // Usamos la red de prueba
        selectedWalletId: XBULL_ID, // Seleccionamos XBULL como wallet predeterminada
        modules: allowAllModules(), // Permitimos todos los módulos de wallets
      });

      console.log('Kit inicializado:', kit);

      // 2. Abrimos el modal para que el usuario seleccione una wallet
      console.log('Abriendo modal de selección de wallet...');
      await kit.openModal({
        onWalletSelected: async (option: ISupportedWallet) => {
          console.log('Wallet seleccionada:', option);

          // 3. Configuramos la wallet seleccionada en el kit
          kit.setWallet(option.id);
          console.log('Wallet configurada en el kit:', option.id);

          // 4. Obtenemos la dirección de la wallet
          const { address } = await kit.getAddress();
          console.log('Dirección de la wallet obtenida:', address);

          // Actualizamos el estado con la dirección de la wallet
          setWalletAddress(address);
          setError(null);
        },
        onClosed: (err) => {
          if (err) {
            console.error('El modal se cerró con un error:', err);
            setError('Error al cerrar el modal');
          } else {
            console.log('El modal se cerró sin errores.');
          }
        },
        modalTitle: 'Selecciona tu wallet', // Título personalizado para el modal
        notAvailableText: 'Wallet no disponible', // Texto personalizado para wallets no disponibles
      });
    } catch (error) {
      console.error('Error al inicializar el kit:', error);
      setError('Error al inicializar el kit');
    }
  };

  // Ejecutamos la función al cargar la página
  useEffect(() => {
    initializeWalletKit();
  }, []);

  return (
    <div style={styles.container}>
      <h1>Stellar Wallets Kit - Next.js</h1>
      {error && <p style={styles.error}>Error: {error}</p>}
      {walletAddress ? (
        <p style={styles.success}>Wallet conectada: {walletAddress}</p>
      ) : (
        <p>Selecciona una wallet en el modal...</p>
      )}
    </div>
  );
}

// Estilos básicos
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
};