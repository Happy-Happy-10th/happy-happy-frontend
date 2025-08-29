declare global {
  interface Window {
    Kakao?: {
      VERSION: string;
      cleanup: () => void;
      init: (appKey: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendDefault: (payload: any) => void;
      };
    };
  }
}

export {};
