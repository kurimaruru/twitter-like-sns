import { useRecoilCallback, useRecoilValue } from 'recoil';
import { TweetListAtom } from '../recoil/tweetState';
import { tweetDataType } from '../recoil/tweetState/types';
import * as WebSocket from 'websocket';

export const OnTweetMessage = (socket: WebSocket.w3cwebsocket) => {
  // ここは専用のhooks作って良いかも
  const tweetList = useRecoilValue(TweetListAtom);

  const updateTweetList = useRecoilCallback(
    ({ set }) =>
      (message: tweetDataType[]) => {
        console.log(message);
        set(TweetListAtom, [...message]);
      }
  );

  socket.onmessage = (msg: any) => {
    console.log('msg = ', msg);
    const content = JSON.parse(msg.data);
    if (content.key === 'tweet') {
      const messages: tweetDataType[] = content.data;
      updateTweetList(messages);
    }
  };
  return tweetList;
};
