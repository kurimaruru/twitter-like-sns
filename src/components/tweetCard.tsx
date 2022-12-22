import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box } from '@mui/system';
import { tweetDataType } from '../recoil/tweetState/types';
import MenuItem from '@mui/material/MenuItem';
import { StyledMenu } from './styledMenu';
import { useState } from 'react';

type TweetCardProps = {
  tweetData: tweetDataType;
};
export const TweetCard = ({ tweetData }: TweetCardProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500], objectFit: 'contain' }}
            aria-label='recipe'
            src='images/cat.jpg'
          />
        }
        action={
          <>
            <IconButton aria-label='settings' onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <StyledMenu
              id='demo-customized-menu'
              MenuListProps={{
                'aria-labelledby': 'demo-customized-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem style={{ color: 'red' }}>delete</MenuItem>
            </StyledMenu>
          </>
        }
        title={tweetData.header.user_name}
        subheader={tweetData.header.subheader}
      />
      <CardMedia
        component='img'
        height='200'
        image={`${tweetData.content.imgUrl}`}
        alt='image'
        style={{ objectFit: 'contain' }}
      />
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          {tweetData.content.message}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label='add to favorites'>
          <ThumbUpAltIcon />
        </IconButton>
        <Box>{tweetData.action.good}</Box>
        <IconButton aria-label='share'>
          <ThumbDownAltIcon />
        </IconButton>
        <Box>{tweetData.action.bad}</Box>
      </CardActions>
    </Card>
  );
};
