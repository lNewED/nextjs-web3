import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function ButtonAppBar({
  IsActive, onClick ,onDisconnect, accounts
}) {
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static"  sx={{backgroundColor:"#cb997e"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            New Block
          </Typography>
          { IsActive ?
            <Stack direction="row" spacing={1}>
            <Chip label={accounts[0]} variant="outlined" />
            <Button  color="inherit" onClick={onDisconnect} value={'Disconnect'}>Disconnect</Button> </Stack>
            :
          <Button color="inherit" onClick={onClick} value={'Connect'}>Connect</Button>
          }
        
        </Toolbar>
      </AppBar>
    </Box>
  );
}