import * as WebSocket from 'websocket';
import { Grid } from '@mui/material';
import { Header } from '../components/header';
import { TextareaAutosize } from '@mui/material';
import { ChatBox } from './chatBox';
import { DateTime } from 'luxon';
import { OnChatMessage } from '../hooks/onChatMessage';
import React, { useCallback, useEffect, useState } from 'react';

type CreateTweetProps = {
  socket: WebSocket.w3cwebsocket;
  userId: string;
};

export const Chat = ({ socket, userId }: CreateTweetProps) => {
  const [message, setMessage] = useState<string>('');
  const chatMessages = OnChatMessage(socket);
  //openChat (初期表示)
  useEffect(() => {
    console.log('useEffect open chat');
    socket.send(
      JSON.stringify({
        action: 'chat',
        data: {
          OperationType: 'openChat',
        },
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // send message
  const handleSubmit = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      console.log(message);
      socket.send(
        JSON.stringify({
          action: 'chat',
          data: {
            OperationType: 'sendMessage',
            userId: userId,
            sortKey: DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'),
            message: message,
          },
        })
      );
      // チャット入力欄を空にする。
      setMessage('');
    },
    [message, socket, userId]
  );
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== 'Enter') return;
    // 文字の変換完了後にsubmit
    if (!e.nativeEvent.isComposing) {
      handleSubmit(e);
    }
  };
  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (e.target.value !== null) {
        setMessage(e.target.value);
      }
    },
    []
  );
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Header />
        </Grid>
      </Grid>
      <Grid
        container
        style={{ marginTop: '60px', maxHeight: '80vh', overflowY: 'scroll' }}
      >
        {chatMessages.map((msg) => (
          <ChatBox
            message={msg.message}
            userId={msg.userId}
            loginUserId={userId}
            key={`${msg.userId}&${msg.message}`}
          />
        ))}
      </Grid>
      <Grid container>
        <TextareaAutosize
          value={message}
          onKeyDown={handleKeyDown}
          onChange={handleOnChange}
          // maxRows={4}
          style={{
            wordWrap: 'break-word' /* 吹き出し内で自動で改行 */,
            whiteSpace: 'normal',
            width: '96%',
            margin: '0 2% 5px 2%',
            outline: 'none',
            border: '#f0f0f0 2px solid',
            fontSize: '15pt',
            position: 'absolute' /*←絶対位置*/,
            bottom: 0 /*下に固定*/,
          }}
        />
      </Grid>
    </>
  );
};
