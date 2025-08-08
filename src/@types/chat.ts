type APIMessage = {
  title: string;
  start_date: string;
  end_date: string;
  homepage_url: string;
  detail_page_url: string;
  memo: string[];
  location: 'string';
  confidence: number;
};

type usePostAIMessagePayload = {
  parameters: {
    eventType: string;
    title: string;
    address: string;
  };
};

type usePostAIMessageResponse = {
  status: number;
  message: string;
  data: {
    list: APIMessage[];
  };
  code?: string;
  timeStamp: string;
};

export type { usePostAIMessageResponse, usePostAIMessagePayload };
