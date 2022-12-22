import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -60,
  left: '85%',
  right: 0,
});

export const Footer = () => {
  return (
    <>
      <CssBaseline />
      <AppBar position='fixed' color='primary' sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <Grid container>
            <Grid item xs={3} style={{ paddingLeft: '6%' }}>
              <Link to={'/'}>
                <IconButton
                  color='inherit'
                  aria-label='open drawer'
                  style={{ color: 'white' }}
                >
                  <HomeIcon />
                </IconButton>
              </Link>
            </Grid>
            <Grid item xs={3} style={{ paddingLeft: '6%' }}>
              <IconButton color='inherit'>
                <SearchIcon />
              </IconButton>
            </Grid>
            <Grid item xs={3} style={{ paddingLeft: '6%' }}>
              <IconButton color='inherit'>
                <NotificationsActiveIcon />
              </IconButton>
            </Grid>
            <Grid item xs={3} style={{ paddingLeft: '6%' }}>
              <Link to={'/chat'}>
                <IconButton color='inherit' style={{ color: 'white' }}>
                  <ModeCommentIcon />
                </IconButton>
              </Link>
            </Grid>
          </Grid>
        </Toolbar>
        <Link to={'/create'}>
          <StyledFab color='primary' aria-label='add'>
            <AddIcon />
          </StyledFab>
        </Link>
      </AppBar>
    </>
  );
};
