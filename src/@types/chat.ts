type usePostAIMessagePayload = {
  parameters: {
    eventType: string;
    title: string;
    address: string;
  };
};

type usePostAIMessageResponse = any;

export type { usePostAIMessageResponse, usePostAIMessagePayload };
