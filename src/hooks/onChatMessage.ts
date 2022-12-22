import { useRecoilCallback, useRecoilValue } from 'recoil';
import { ChatAtom } from '../recoil/chat';
import { ChatAtomType } from '../recoil/chat/types';
import * as WebSocket from 'websocket';

export const OnChatMessage = (socket: WebSocket.w3cwebsocket) => {
  // ここは専用のhooks作って良いかも
  const chatList = useRecoilValue(ChatAtom);

  const updateChatList = useRecoilCallback(
    ({ set }) =>
      (chat: ChatAtomType[], key) => {
        if (key === 'chatOpenRes') {
          set(ChatAtom, [...chat]);
        } else {
          set(ChatAtom, [...chatList, ...chat]);
        }
      }
  );

  socket.onmessage = (msg: any) => {
    const content = JSON.parse(msg.data);
    if (content.key === 'chatOpenRes') {
      updateChatList(content.data, content.key);
    }
    if (content.key === 'sendRes') {
      updateChatList(content.data, content.key);
    }
  };
  return chatList;
};
