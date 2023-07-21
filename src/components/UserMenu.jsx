import { useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  CircularProgress,
  Avatar,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Logout, Face } from '@mui/icons-material';

import { logOut } from '@/redux/authOperations';
import { useAuth } from '@/hooks/useAuth';
import ChangeAvatarModal from './ChangeAvatarModal';

export default function UserMenu() {
  const dispatch = useDispatch();
  const { user, isAuth } = useAuth();
  const isMobile = useMediaQuery('(max-width:768px)');
  const isTiny = useMediaQuery('(max-width:380px)');
  const [anchorEl, setAnchorEl] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
    handleCloseMenu();
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      {!isTiny && (
        <Typography>{`${isMobile ? '' : 'Welcome, '}${user.name}`}</Typography>
      )}
      <Avatar
        alt="Remy Sharp"
        src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
        onClick={handleOpenMenu}
        sx={{ ml: 1 }}
      />
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
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleOpenModal}>
          <ListItemIcon>
            <Face fontSize="small" />
          </ListItemIcon>
          Change Avatar
        </MenuItem>
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
      <ChangeAvatarModal open={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}
