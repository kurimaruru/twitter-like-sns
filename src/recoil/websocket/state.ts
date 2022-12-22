import { atom, selector } from 'recoil';
import * as WebSocket from 'websocket';
import { recoilKeyHashSet } from '../recoilKeys';

const connect = (): Promise<WebSocket.w3cwebsocket> => {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket.w3cwebsocket(
      process.env.REACT_APP_ENDPOINT_URL!
    );
    socket.onopen = () => {
      console.log('connected');
      socket.send(
        JSON.stringify({
          action: 'crud',
          data: {
            OperationType: 'SCAN',
          },
        })
      );
      resolve(socket);
    };
    socket.onclose = () => {
      console.log('reconnecting...');
      connect();
    };
    socket.onerror = (err) => {
      console.log('connection error:', err);
      reject(err);
    };
  });
};

const connectWebsocketSelector = selector({
  key: 'connectWebsocket',
  get: async (): Promise<WebSocket.w3cwebsocket> => {
    return await connect();
  },
});

export const websocketAtom = atom<WebSocket.w3cwebsocket>({
  key: recoilKeyHashSet.websocket,
  default: connectWebsocketSelector,
});
