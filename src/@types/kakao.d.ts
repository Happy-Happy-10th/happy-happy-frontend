declare global {
  interface Window {
    Kakao?: {
      VERSION: string;
      cleanup: () => void;
      init: (appKey: string) => void;
      isInitialized: () => void;
      Share: {
        sendDefault: (payload: any) => void;
      };
    };
  }
}

export {};
