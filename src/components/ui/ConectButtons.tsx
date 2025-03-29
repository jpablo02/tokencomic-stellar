import { useWallet } from "../../app/WalletProvider";

export const ConnectButtons = () => {
  const { walletAddress, connectWallet, disconnectWallet } = useWallet();

  return (
    <div className="relative flex flex-col items-center space-y-2 p-4 bg-gray-800 rounded-lg shadow-md text-white">
      {walletAddress ? (
        <>
          <p className="text-yellow-400 text-sm">Connected: {walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}</p>
          <button
            onClick={disconnectWallet}
            className="bg-gray-700 hover:bg-orange-600 text-white font-semibold py-1 px-4 rounded-lg text-sm"
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
