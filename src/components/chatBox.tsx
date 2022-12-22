import { styled } from '@mui/material/styles';
import { Grid, Typography, Box, Avatar } from '@mui/material';

const StyledChatBox = styled(Box)({
  marginTop: '5px',
  padding:
    '0 14px' /*吹き出しがタイムラインの側面にひっつかない様に隙間を開ける*/,
  wordWrap: 'break-word' /* 吹き出し内で自動で改行 */,
  whiteSpace: 'normal' /*指定widthに合わせて、文字を自動的に改行*/,
  background: '#e5ffff',
  // lineHeight: '1.3em',
  border: '2px solid white',
});
const StyledChatBoxLeft = styled(StyledChatBox)({
  float: 'left',
  borderRadius: '30px 30px 30px 0px' /*右下だけ尖らせて吹き出し感を出す*/,
  marginRight: '50px' /*右側の発言だとわかる様に、吹き出し左側に隙間を入れる*/,
});
const StyledChatBoxRight = styled(StyledChatBox)({
  float: 'right',
  borderRadius: '30px 30px 0px 30px' /*右下だけ尖らせて吹き出し感を出す*/,
  marginLeft: '50px' /*右側の発言だとわかる様に、吹き出し左側に隙間を入れる*/,
});
type chatBoxType = {
  message: string;
  userId: string;
  loginUserId: string;
};
export const ChatBox = ({ message, userId, loginUserId }: chatBoxType) => {
  return (
    <>
      {userId !== loginUserId ? (
        <Grid item xs={12} style={{ display: 'flex' }}>
          <Avatar
            aria-label='recipe'
            src='images/cat2.jpg'
            style={{ objectFit: 'contain' }}
          />
          <StyledChatBoxLeft>
            <Typography
              variant='h6'
              sx={{
                ml: 2,
                fontFamily: 'monospace',
                fontWeight: 300,
                textDecoration: 'none',
              }}
            >
              {message}
            </Typography>
          </StyledChatBoxLeft>
        </Grid>
      ) : (
        <Grid item xs={12}>
          <StyledChatBoxRight>
            <Typography
              variant='h6'
              sx={{
                ml: 2,
                fontFamily: 'monospace',
                fontWeight: 300,
                textDecoration: 'none',
              }}
            >
              {message}
            </Typography>
          </StyledChatBoxRight>
        </Grid>
      )}
    </>
  );
};
