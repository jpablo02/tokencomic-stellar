interface Window {
    xBullSDK: {
      connect: (options: { canRequestPublicKey: boolean; canRequestSign: boolean }) => Promise<{
        canRequestPublicKey: boolean;
        canRequestSign: boolean;
      }>;
      getPublicKey: () => Promise<string>;
      // Agrega otras funciones o propiedades que necesites aquí
    };
  }