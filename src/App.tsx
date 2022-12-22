import { Global, css } from '@emotion/react';
import emotionReset from 'emotion-reset';
import { CreateTweet } from './pages/createTweet';
import { TweetArea } from './pages/tweetArea';
import { Chat } from './components/chat';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { websocketAtom } from './recoil/websocket';
import { useState } from 'react';
function App() {
  // ログイン機能を実装していないので、仮のユーザーIDを発行
  const [userId] = useState<string>(uuidv4());
  const socket = useRecoilValue(websocketAtom);
  return (
    <>
      <Global
        styles={css`
          ${emotionReset}
          *, *::after, *::before {
            box-sizing: border-box;
            -moz-osx-font-smoothing: grayscale;
            -webkit-font-smoothing: antialiased;
            font-smoothing: antialiased;
          }
        `}
      />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate replace to='/tweets' />} />
          <Route path='/tweets' element={<TweetArea socket={socket} />} />
          <Route
            path='/create'
            element={<CreateTweet socket={socket} userId={userId} />}
          />
          <Route
            path='/chat'
            element={<Chat socket={socket} userId={userId} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
