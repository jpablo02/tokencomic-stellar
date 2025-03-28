const fetchNFTMetadata = async () => {
    if (!mintedTokenId || !publicKey) return;
  
    try {
      const response = await fetch("/api/owner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contractId: CONTRACT_ID,
          tokenId: mintedTokenId,
          walletAddress: publicKey,
        }),
      });
  
      const data = await response.json();
      if (data.metadataUrl) {
        console.log("Metadata del NFT:", data.metadataUrl);
        // Puedes actualizar el estado aquí para mostrar la metadata en el frontend
      } else {
        console.error("Error obteniendo metadata:", data.error);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };
  
  // Llamamos a `fetchNFTMetadata` después de mintear
  useEffect(() => {
    if (mintedTokenId) {
      fetchNFTMetadata();
    }
  }, [mintedTokenId]);
  