import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { warningVariant } from '../constants/constants';

export default function Warning({ action, isActive, onClose, variant }) {
  const isEdit = variant === warningVariant.edit;

  const handleAction = () => {
    action();
    onClose();
  };

  return (
    <Dialog
      open={isActive}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {isEdit
            ? 'Сlosing the window will delete unsaved data'
            : 'Contact will be deleted permanently.'}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>No</Button>
        <Button onClick={handleAction} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

Warning.propTypes = {
  action: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  variant: PropTypes.string.isRequired,
};
