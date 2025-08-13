type Message = {
  from: 'AI' | 'USER';
  value?: string;
  render?: React.ReactNode;
  date?: Date;
};

type APIMessage = {
  title: string;
  startDate: string;
  endDate: string;
  homepageUrl: string;
  detailPageUrl: string;
  memo: string;
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

type usePostAIEventPayload = {
  calendarId: number;
  title: string;
  startDate: string;
  endDate: string;
  memo: string;
  location: string;
  homepageUrl: string;
  detailPageUrl: string;
  confidence: number;
};

type usePostAIEventResponse = {
  status: number;
  message: string;
  data: string;
  timeStamp: string;
};

export type {
  usePostAIMessageResponse,
  usePostAIMessagePayload,
  usePostAIEventPayload,
  usePostAIEventResponse,
  APIMessage,
  Message,
};
