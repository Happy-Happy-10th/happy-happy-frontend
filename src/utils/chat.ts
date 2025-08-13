import { APIMessage, Message } from '@/@types';
import dayjs from 'dayjs';

type Props = {
  message: APIMessage;
  timeStamp: string;
};
const convertChatMessage = ({ message, timeStamp }: Props): Message => {
  return {
    from: 'AI',
    date: new Date(timeStamp),
    value: `사용자 제공 데이터의 답변입니다.\n
제목 : ${message.title}
${`날짜 : ${message.startDate.length ? dayjs(message.startDate).format('YYYY.MM.DD') : '정보없음'} ~ ${
  message.endDate.length ? dayjs(message.endDate).format('YYYY.MM.DD') : '정보없음'
}`}
${`장소 : ${message.location.length ? message.location : '정보없음'}`}
${`URL : ${message.homepageUrl.length ? message.homepageUrl : '정보없음'}\n`}
일정요약 :\n${message.memo}`,
  };
};
export { convertChatMessage };
