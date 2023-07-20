import { useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  CircularProgress,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AccountCircle, Logout } from '@mui/icons-material';

import { logOut } from '@/redux/authOperations';
import { useAuth } from '@/hooks/useAuth';

export default function UserMenu() {
  const dispatch = useDispatch();
  const { user, isAuth } = useAuth();
  const isMobile = useMediaQuery('(max-width:768px)');
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Typography>{`${isMobile ? '' : 'Welcome, '}${user.name}`}</Typography>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => dispatch(logOut())}>
          <ListItemIcon>
            {isAuth ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <Logout fontSize="small" />
            )}
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
