import { useWallet } from "../../app/WalletProvider";

export const ConnectButtons = () => {
  const { walletAddress, connectWallet, disconnectWallet } = useWallet();

  return (
    <div className="relative flex flex-col items-center space-y-2 p-4 bg-gray-800 rounded-lg shadow-md text-white">
      {walletAddress ? (
        <>
          <p className="text-green-400">Conectado: {walletAddress}</p>
          <button
            onClick={disconnectWallet}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-4 rounded-lg"
          >
            Disconnect
          </button>
        </>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-4 rounded-lg"
        >
          Connect
        </button>
      )}
    </div>
  );
};
