import { Header } from '../components/header';
import { TweetCard } from '../components/tweetCard';
import { Footer } from '../components/footer';
import { Grid } from '@mui/material';
import { OnTweetMessage } from '../hooks/onTweetMessage';
import * as WebSocket from 'websocket';
import { ProgressCircle } from '../components/progressCircle';
import { Typography } from '@mui/material';

type TweetAreaProps = {
  socket: WebSocket.w3cwebsocket;
};
export const TweetArea = ({ socket }: TweetAreaProps) => {
  const tweetData = OnTweetMessage(socket);
  // mock
  // const tweetData = TweetDatas;

  return (
    <>
      {tweetData.length !== 0 ? (
        <>
          <Grid container>
            <Grid item xs={12}>
              <Header />
            </Grid>
          </Grid>
          <Grid container style={{ marginTop: '60px' }}>
            <Grid item xs={12}>
              {tweetData.map((data) => (
                <TweetCard key={data.id} tweetData={data} />
              ))}
            </Grid>
          </Grid>
          <Grid container style={{ marginTop: '50px' }}>
            <Grid item xs={12}>
              <Footer />
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <Grid container justifyContent='center'>
            <Grid item>
              <ProgressCircle />
            </Grid>
          </Grid>
          <Grid container justifyContent='center'>
            <Grid item>
              <Typography
                variant='h5'
                noWrap
                sx={{
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'black',
                  textDecoration: 'none',
                }}
              >
                Now Loading...
              </Typography>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};
