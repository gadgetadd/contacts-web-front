import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  ListItem,
  IconButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemButton,
  Box,
  CircularProgress,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@mui/material';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import useMediaQuery from '@mui/material/useMediaQuery';

import { openFormEdit } from '@/redux/modalSlice';
import {
  useDeleteContactMutation,
  useToggleFavoriteMutation,
} from '@/redux/contactsApi';

import Warning from '@/components/Warning';
import { enqueueSnackbar } from 'notistack';

export default function ContactItem({ name, number, _id: id, favorite }) {
  const [isWarning, setWarning] = useState(false);
  const [deleteContact, { isLoading }] = useDeleteContactMutation();
  const [toggleFavorite, { isLoading: isToggling }] =
    useToggleFavoriteMutation();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery('(max-width:420px)');
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDeleteContact = () => {
    deleteContact(id)
      .then(({ data }) => {
        enqueueSnackbar(`Contact ${data.name} deleted`, {
          variant: 'info',
        });
      })
      .catch(() =>
        enqueueSnackbar('Something went wrong', {
          variant: 'error',
        })
      );
  };

  return (
    <>
      <ListItem
        sx={{ pr: '200px', pl: 0 }}
        secondaryAction={
          isMobile ? (
            <>
              <IconButton aria-label="more" edge="end" onClick={handleOpenMenu}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="menu-item"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              >
                <MenuItem
                  aria-label="favorite"
                  disabled={isToggling}
                  onClick={() => toggleFavorite([id, { favorite: !favorite }])}
                >
                  <ListItemIcon>
                    {isToggling ? (
                      <CircularProgress size={24} />
                    ) : favorite ? (
                      <FavoriteIcon color="error" />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </ListItemIcon>
                  {favorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </MenuItem>
                <MenuItem
                  aria-label="edit"
                  onClick={() => {
                    dispatch(openFormEdit(id));
                    handleCloseMenu();
                  }}
                >
                  <ListItemIcon>
                    <EditIcon />
                  </ListItemIcon>
                  Edit contact
                </MenuItem>
                <MenuItem
                  aria-label="delete"
                  disabled={isLoading}
                  onClick={handleDeleteContact}
                >
                  <ListItemIcon>
                    {isLoading ? (
                      <CircularProgress size={24} />
                    ) : (
                      <DeleteIcon />
                    )}
                  </ListItemIcon>
                  Delete contact
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Tooltip
                title={favorite ? 'Remove from Favorites' : 'Add to Favorites'}
              >
                <IconButton
                  aria-label="favorite"
                  disabled={isToggling}
                  onClick={() => toggleFavorite([id, { favorite: !favorite }])}
                >
                  {isToggling ? (
                    <CircularProgress size={24} />
                  ) : favorite ? (
                    <FavoriteIcon color="error" />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit">
                <IconButton
                  aria-label="edit"
                  onClick={() => dispatch(openFormEdit(id))}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  edge="end"
                  aria-label="delete"
                  disabled={isLoading}
                  onClick={() => setWarning(true)}
                >
                  {isLoading ? <CircularProgress size={24} /> : <DeleteIcon />}
                </IconButton>
              </Tooltip>
            </Box>
          )
        }
      >
        <ListItemButton href={`tel:${number}`} sx={{ p: 0 }}>
          <ListItemAvatar>
            <Avatar>
              <ContactPhoneIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={`${name}`} secondary={`${number}`} />
        </ListItemButton>
      </ListItem>
      <Warning
        action={() => deleteContact(id)}
        isActive={isWarning}
        onClose={() => setWarning(false)}
        variant="delete"
      />
    </>
  );
}

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  favorite: PropTypes.bool.isRequired,
};
