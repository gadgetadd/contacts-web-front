import { useSelector, useDispatch } from 'react-redux';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { selectIsDialogOpen } from '@/redux/selectors';
import { closeDialog, closeDrawer } from '@/redux/modalSlice';

export default function AlertDialog() {
  const isDrawerOpen = useSelector(selectIsDialogOpen);
  const dispatch = useDispatch();

  const closeAll = () => {
    dispatch(closeDialog());
    dispatch(closeDrawer());
  };

  return (
    <Dialog
      open={isDrawerOpen}
      onClose={() => dispatch(closeDialog())}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Сlosing the window will delete unsaved data
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(closeDialog())}>No</Button>
        <Button onClick={closeAll} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
