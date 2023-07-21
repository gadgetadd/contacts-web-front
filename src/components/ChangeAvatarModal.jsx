import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import {
  Modal,
  Box,
  Card,
  CardMedia,
  CardActions,
  Button,
} from '@mui/material';

import avatar from '../images/default-avatar.jpg';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 350,
  bgcolor: 'background.paper',
  boxShadow: 24,
};

export default function ChangeAvatarModal({ open, onClose }) {
  const [image, setImage] = useState(null);
  const fileInput = useRef(null);

  const handlePickImage = e => {
    const selectedFile = e.target.files[0];
    if (
      selectedFile.type !== 'image/jpeg' &&
      selectedFile.type !== 'image/png'
    ) {
      enqueueSnackbar(
        'Please choose the correct image type. Only *.jpg and *.png formats are supported.',
        {
          variant: 'error',
        }
      );
      return;
    }
    setImage(selectedFile);
  };

  const handleCancelAvatar = () => {
    setImage(null);
    onClose();
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Card sx={{ maxWidth: 350, p: 2 }}>
          <CardMedia
            sx={{
              ml: 'auto',
              mr: 'auto',
              mb: 2,
              height: 150,
              width: 150,
            }}
            image={image ? URL.createObjectURL(image) : avatar}
            title="avatar"
            component="img"
          />
          <input
            style={{ display: 'none' }}
            type="file"
            onChange={handlePickImage}
            ref={fileInput}
          />
          <CardActions>
            <Button size="small" onClick={() => fileInput.current.click()}>
              Pick an image
            </Button>
            <Button size="small" disabled={!image}>
              Upload
            </Button>
            <Button size="small" onClick={handleCancelAvatar}>
              Cancel
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Modal>
  );
}

ChangeAvatarModal.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
